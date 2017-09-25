document.addEventListener('click', function(event){
    let target = event.target
    /*dataset，可以在该对象中存一些与该DOM对象相关的数据*/
    if(target.dataset.role !== 'tab') return

    [].forEach.call(target.parentNode.children, child=>{
        child.classList.remove('current')
    })
    target.classList.add('current')

    /*document.queryselector()*/
    let content = document.querySelector(target.dataset.view)

    /*解决切换后不主动触发的问题*/
    if(content.classList.contains('rank-view')){
       setTimeout(function (){
        window.dispatchEvent(new Event('scroll'))
       }, 300)
    }

    if(content){
        [].forEach.call(content.parentNode.children, child =>{
            child.style.display = 'none'

        })

    content.style.display = "block"

    var mySwiper = new Swiper ('.swiper-container', {
                loop: true,                                         //用来循环播放
                pagination: '.swiper-pagination',                   //显示焦点按钮
                paginationClickable: '.banner-pagination',
                autoplayDisableOnInteraction: false,                //用户操作后不会停止
                autoplay: 1000,                                     //设定时间
                observer:true,                                      //子元素改变时从新加载轮播
                observeParents:true,                                //父元素改变时从新加载轮播
    })


    }
})