export function lazyload(images) {
    /*图片转为数组*/
    let imgs = [].slice.call(images || document.querySelectorAll('.lazyload'));

    let onscroll =  throttle(function () {
        /*console.log(new Date())*/
        if (imgs.length === 0) {
            return window.removeEventListener('scroll', onscroll)
        }
        imgs = imgs.filter( img => img.classList.contains('lazyload'))

        /*图片在视口就加载*/
        imgs.forEach(img => {
            if(inViewport(img)) {
                loadImage(img)
            }
        })
    }, 300)

    window.addEventListener('scroll', onscroll)
    /*主动触发*/
    window.dispatchEvent(new Event('scroll'))

    /*解决连续滚动的性能问题*/
    function throttle(fun, wait) {
        /*记录上次调用的时间*/
        let prev, timer
        return function fn(){
            /*记录当前调用的时间*/
            let curr = Date.now()
            /*如果已经调用过，当前的时间减去上次调用的时间*/
            let diff = curr - prev
            /*第一次调用的时候没有上次调用时间，所以重新调用*/
            if(!prev || diff >= wait){
                fun()
                prev = curr
            }else if( diff < wait){
                clearTimeout(timer)
                timer = setTimeout(fn, wait - diff)
            }
        }
    }
    /*判断是否在视口内*/
    function inViewport(img) {
        let { top, left, right, bottom} = img.getBoundingClientRect()
        let vpWidth = document.documentElement.clientWidth
        let vpHeight = document.documentElement.clientHeight
        return (
            (top > 0 && top < vpHeight || bottom > 0 && bottom < vpHeight) &&
            (left > 0 && left < vpWidth || right > 0 && right < vpWidth)
        )
    }

    /*加载图片*/
    function loadImage(img) {
        let image = new Image()
        image.src = img.dataset.src
        image.onload = function(){
            img.src = image.src
            /*加载完成后移除lazyload*/
            img.classList.remove('lazyload')
        }
    }
}