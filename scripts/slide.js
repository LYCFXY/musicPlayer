class Slider {
    constructor(options={}){
        console.log(options)
        this.wrap = document.querySelector('#qq-slider')
        this.$el = options.el
        this.slides = options.slides
        this.render();

    }

    render (){
        this.deviceWidth = document.body.clientWidth;

        this.$el.innerHTML = `<div class="qq-slider-wrap swiper-wrapper"></div><div class="swiper-pagination"></div>`
        this.$wrap = this.$el.firstElementChild
        this.$wrap.style.width = `${this.slides.length * this.deviceWidth}px`

        this.$wrap.innerHTML = this.slides.map(slide =>
            `<div class="ui-slider-item swiper-slide" style="width:${this.deviceWidth}px" >
                        <a href="${slide.link}">
                            <img src="${slide.image}" style="width:${this.deviceWidth}px" />
                        </a>
            </div>`
        ).join('')

    }

}

