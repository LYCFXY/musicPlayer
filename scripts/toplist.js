import { TOPLIST_URL } from './contants.js';
import { lazyload } from './lazyload.js';

export class TopList {
    constructor(el){
        this.$el = el;
    }

    /*获取排行榜页面的数据*/
    launch(){
        /*fetch('json/rank.json')*/
        fetch(TOPLIST_URL)
        .then(res => res.json())
        .then(json => this.render(json.data.topList))
        return this;
    }

    render(list){
        this.$el.querySelector('.toplist').innerHTML = list.map(item =>
            `<li class="top-item">
                <div class="top-item-media">
                    <a class="media" href="#">
                        <img class="lazyload" data-src="${item.picUrl}" />
                    </a>
                </div>
                <div class="top-item-info">
                    <div class="title-wrap">
                        <h3 class="top-item-title ellipsis">${item.topTitle}</h3>
                        <ul class="top-item-list">
                            ${this.songlist(item.songList)}
                        </ul>
                    </div>
                    <i class="arrow"></i>
                </div>
            </li>
            ` ).join('')

        lazyload(this.$el.querySelectorAll('.lazyload'))
    }

    songlist(songs){
        return songs.map((song, i) =>
            `<li class="top-item-song">
                    ${i+1}
                    <span class="song-name">${song.songname}</span>-${song.singername}
                </li>
            `).join('')
    }
}