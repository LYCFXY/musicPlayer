export class ProgressBar {
    constructor(el, duration, start){
        this.$el = el;
        this.elapsed = 0;
        this.duration = duration || 0;
        this.progress = 0;

        this.render();

        this.$progress = this.$el.querySelector('.progress-bar-progress');
        this.$elapsed = this.$el.querySelector('.progress-start');
        this.$duration = this.$el.querySelector('.progress-end');
        this.$elapsed.innerText = this.formatTime(this.elapsed);
        this.$duration.innerText = this.formatTime(this.duration);
        /*if(start){this.start()}*/
    }

    start(){
        this.intervalId = setInterval(this.update.bind(this), 1000)
    }

    pause(){
        clearInterval(this.intervalId)
    }

    restart() {
        this.reset();
        this.start();
    }

    update(){
        this.elapsed += 1;
        if(this.elapsed >= this.duration){this.reset()}
        this.progress = this.elapsed / this.duration;
        this.$progress.style.transform = `translateX(${-100 + this.progress * 100}%)`;
        this.$elapsed.innerText = this.formatTime(this.elapsed);
    }

    reset(duration) {
        this.pause();
        this.elapsed = 0;
        this.progress = 0;
        if (duration){
            this.duration = +duration;
            this.$duration.innerText = this.formatTime(this.duration);
        }
        this.$progress.style.transform = `translateX(-100%)`
    }

    render(){
        this.$el.innerHTML = `
               <div class="progress-box">
                  <div class="progress-bar">
                      <div class="progress-bar-progress">
                  </div>
                  </div>
               </div>
               <span class="progress-start">01:51</span>
               <span class="progress-end">05:06</span>
        `
    }


    formatTime(seconds){
        let mins = Math.floor(seconds / 60);
        let secs = Math.floor(seconds % 60);
        if(mins < 10){mins = '0' + mins}
        if(secs < 10){secs = '0' + secs}
        return `${mins}:${secs}`
    }
}