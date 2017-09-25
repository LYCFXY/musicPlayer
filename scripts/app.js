(function(){

        /*获取推荐页面的数据*/
        fetch('json/rec.json')
        .then(res => res.json())
        .then(render)

        /*获取排行榜页面的数据*/
        fetch('json/rank.json')
        .then(res => res.json())
        .then(json => json.data.topList)
        .then(renderTopList)

/*推荐页面*/
/****************************************************/
        function render(json) {
            renderSlider(json.data.slider)
            renderRadios(json.data.radioList)
            renderPlaylist(json.data.songList)
            lazyload(document.querySelectorAll('.lazyload'))
        }

        /*渲染滑动数据*/
        function renderSlider(slides){
            slides = slides.map(slide => {
                    return {link: slide.linkUrl, image: slide.picUrl}
                })

            new Slider({
                el: document.querySelector('#qq-slider'),
                slides
            })

            //获取数据后加载swiper
            var mySwiper = new Swiper ('.swiper-container', {
                loop: true,                                         //用来循环播放
                pagination: '.swiper-pagination',                   //显示焦点按钮
                paginationClickable: '.banner-pagination',
                autoplayDisableOnInteraction: false,                //用户操作后不会停止
                autoplay: 1000,                                      //设定时间
                observer:true,
                observeParents:true,
            })
        }

        /*渲染电台html*/
        function renderRadios(radios){
            document.querySelector('.raidos .list').innerHTML = radios.map(radio =>
                `<a class="list_main" href="javascript:;">
                        <li class="list-item">
                             <div class="list_media">
                                 <span class="icon icon_play"></span>
                                 <img class="lazyload" data-src="${radio.picUrl}" />
                             </div>
                             <div class="list_info">
                                 <h3 class="list_title">${radio.Ftitle}</h3>
                             </div>
                         </li>
                    </a>
                `
            ).join('')
        }

        /*渲染热门推荐HTML*/
        function renderPlaylist(playlists){
              document.querySelector('.playlists .list').innerHTML = playlists.map(list =>
                `   <a class="list_main " href="javascript:;">
                        <li class="list-item list_distance">
                             <div class="list_media">
                                 <span class="icon icon_play"></span>
                                 <img class="lazyload" data-src="${list.picUrl}" />
                             </div>
                             <div class="list_info">
                                 <h3 class="list_title">${list.songListDesc}</h3>
                             </div>
                         </li>
                    </a>
                `
            ).join('')
        }

/*排行榜页面*/
/****************************************************/
        function renderTopList(list) {
        document.querySelector('#rank .toplist').innerHTML = list.map(item =>
                `
                <li class="top-item">
                    <div class="top-item-media">
                        <a class="media" href="#">
                            <img class="lazyload" data-src="${item.picUrl}" />
                        </a>
                    </div>
                    <div class="top-item-info">
                        <div class="title-wrap">
                            <h3 class="top-item-title ellipsis">${item.topTitle}</h3>
                            <ul class="top-item-list">
                                ${songlist(item.songList)}
                            </ul>
                        </div>
                        <i class="arrow"></i>
                    </div>
                </li>
                ` ).join('')

            /*调用懒加载*/
            lazyload(document.querySelectorAll('#rank .toplist .lazyload'))

            function songlist(songs){
                return songs.map((song, i) =>
                    `
                        <li class="top-item-song">
                            ${i+1}
                            <span class="song-name">${song.songname}</span>-${song.singername}
                        </li>
                    `).join('')
            }


        }

})()