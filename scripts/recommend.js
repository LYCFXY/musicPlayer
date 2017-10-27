import { Slider } from './slide.js';
import { lazyload } from './lazyload.js';
import { RECOMMEND_URL } from './contants.js'

export class Recommend {
    constructor(el){
        this.$el = el;
    }

    launch(){
        /*获取推荐页面的数据*/
        fetch(RECOMMEND_URL)
        /*fetch('json/rec.json')*/
        .then(res => res.json())
        .then(json => this.render(json));
        return this;
    }

/*推荐页面*/
/****************************************************/
    render(json){
        this.renderSlider(json.data.slider);
        this.renderRadios(json.data.radioList);
        this.renderPlaylist(json.data.songList);
        lazyload(document.querySelectorAll('.lazyload'))
    }

    /*渲染滑动数据*/
    renderSlider(slides){
        let slider = new Slider({
            el: document.querySelector('#qq-slider'),
            slides: slides.map(slide => {return {link: slide.linkUrl, image: slide.picUrl}})
        })
        window.addEventListener('resize', () => {
            slider.render();
            this.mySwiper();
        });
        //获取数据后加载swiper
        this.mySwiper();
    }

    mySwiper(){
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
    renderRadios(radios){
        this.$el.querySelector('.raidos .list').innerHTML = radios.map(radio =>
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
    renderPlaylist(playlists){
        this.$el.querySelector('.playlists .list').innerHTML = playlists.map(list =>
            `<a class="list_main " href="javascript:;">
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
}