import { searchUrl } from './helpers.js';
import { IsHistory } from './search_history.js';

export class Search {
    constructor(el){
        this.$el = el;
        this.$input = this.$el.querySelector('#search');
        this.$songs = this.$el.querySelector('.song-list');
        this.$cancel = this.$el.querySelector('.cancel-btn');
        this.$complete = this.$el.querySelector('.load-complete');
        this.$loading = this.$el.querySelector('.loading');
        this.$searchHistory = this.$el.querySelector('#search-history');
        this.$historyItem = this.$searchHistory.querySelector('.history-item');
        this.$historyItem.addEventListener('click', this.historySearch.bind(this));
        this.page = 1;
        this.keyword = '';
        /*设置每一页显示的个数*/
        this.perpage = 20;
        this.test();
        /*防止反复加载*/
        this.fetching = false;
        /*得到最后一条数据*/
        this.nomore = false;
        this.onscroll = this.onScroll.bind(this);
        window.addEventListener('scroll', this.onScroll.bind(this));
        this.historyLs = new IsHistory(document.querySelector('#search-history'), 7);
    }

    historySearch(event){
        let self = event.target;
        let keyword = self.innerText;
        if(self.matches('.history-name')){
            this.reset();
            this.search(keyword);
            this.hideHistory();
            this.$input.value = keyword;
        }
    }

    onScroll(event){
        if(this.$input.value == '')return
        /*数据加载完成后会出现message: "no results"*/
        if(this.nomore){
            this.$complete.style.display = 'block';
            window.removeEventListener('scroll', this.onscroll);
            this.$loading.style.display = 'none';
            return
         };
        if(this.$songs.length == 0){
            this.$complete.style.display = 'none';
        }
        /*加载下一页*/
        if(document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 50){
            this.search(this.keyword, this.page + 1);
        }
    }

    showHistory(){
        if(this.$historyItem.children.length > 0 && this.$songs.children.length == 0){
            this.$searchHistory.style.display = 'block';
        }
    }

    hideHistory(){
        this.$searchHistory.style.display = 'none';
    }

    test(){
        this.$input.addEventListener('keyup', this.onKeyUp.bind(this));
        this.$input.addEventListener('focus', this.focus.bind(this) );
        this.$cancel.addEventListener('click', this.cancel.bind(this));
    }

    focus(){
        this.$cancel.style.display = 'block';
        this.showHistory();
    };

    onKeyUp(event){
        /*防止提交刷新页面*/
        event.preventDefault();
        /*获取输入关键字*/
        var keyword = event.target.value.trim();
        if(!keyword){ return this.reset()}
        if(event.keyCode == '13'){
            this.$songs.innerHTML = '';
            this.search(keyword);
            this.hideHistory();
            this.historyLs.recordHistory(keyword);
        }
        if(event.keyCode !== '13'){return}
    }

    /*输入框为空的时候初始化, 这种方式实现性能不是太好*/
    reset(){
        this.page = 1;
        this.keyword = '';
        this.songs = [];
        this.$songs.innerHTML = '';
        this.$complete.style.display = 'none';
        this.$loading.style.display = 'none';
    }

    cancel(){
        this.page = 1;
        this.keyword = '';
        this.songs = [];
        this.$songs.innerHTML = '';
        this.$cancel.style.display = 'none';
        this.$input.value = '';
        this.$complete.style.display = 'none';
        this.$loading.style.display = 'none';
        this.hideHistory();
    }

    /*查找数据*/
    search(keyword, page){
        /*如果是true不会再次加载*/
        if (this.fetching) return
        this.loading();
        this.fetching = true;
        this.keyword = keyword;
        /*如果传入page就使用page， 如果没有就使用this.page*/
        fetch(searchUrl(this.keyword, page || this.page))
        .then(res => {
            this.loading();
            return res.json();
        })
        .then(json => {
            /*this.songs.push(...json.data.song.list)*/
            this.songs.push.apply(this.songs, json.data.song.list);
            this.page = json.data.song.curpage;
            /*最后的数据*/
            this.nomore = (json.message === 'no results');
            if(this.nomore){
                this.$complete.style.display = 'block';
                window.removeEventListener('scroll', this.onscroll);
                this.$loading.style.display = 'none';
                return
            };
            /*歌手信息*/
            this.singer = json.data.zhida;
            return json.data.song.list;
        })
        .then(songs => this.append(songs))
        .then(() => this.fetching = false)
        .catch( () => this.fetching = false)
    }

    loading(){
        this.$loading.style.display = 'block';
    }

    append(songs){
        let html = songs.map(song =>`<li class="song-item">
                <a class="song-item-box" href="#player?artist=${song.singer.map(s => s.name).join(' / ')}&songid=${song.songid}&songname=${song.songname}&albummid=${song.albummid}&duration=${song.interval}">
                    <i class="icon icon-music"></i>
                    <div class="song-name ellipsis">${song.songname}</div>
                    <div class="song-artist ellipsis">${song.singer.map(s => s.name).join(' / ')}</div>
                    <div class="song"></div>
                </a>
            </li>`).join('')

        this.$songs.insertAdjacentHTML('beforeend', html);

        if(this.page == 1 && this.singer.singername !== undefined ){
            let singerHtml = `<li class="song-item singer">
                    <span class="icon-singer"><img class="singer-img" src="https://y.gtimg.cn/music/photo_new/T001R68x68M000${this.singer.singermid}.jpg?max_age=2592000" alt="${this.singer.singername}" onerror="this.onerror = null; this.src = defaultPic">
                    </span>
                    <div class="song-name ellipsis">${this.singer.singername}</div>
                    <div class="song-artist ellipsis">
                        <span class="single">单曲：${this.singer.songnum}</span>
                        <span>专辑：${this.singer.albumnum}</span>
                    </div>
                    <div class="song"></div>
                </li>`
            this.$songs.insertAdjacentHTML('afterbegin',singerHtml)
        }

        /*搜索歌曲数量过少时*/
        if(this.$songs.children.length < 10){
            this.$complete.style.display = 'block';
            window.removeEventListener('scroll', this.onscroll);
            this.$loading.style.display = 'none';
            return
        }
    };
}