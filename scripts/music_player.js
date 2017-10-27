import { ProgressBar } from './progress_bar.js';
import { LyricsPlayer } from './lyrics_player.js';
import { songUrl, lyricsUrl, albumCoverUrl } from './helpers.js';

export class MusicPlayer {
    constructor(el){
        this.$el = el;
        this.$el.addEventListener('click', this.handleEvent.bind(this));
        this.$audio = this.createAudio();
        this.progress = new ProgressBar(this.$el.querySelector('.progress'), 280, true);
        this.lyrics = new LyricsPlayer(this.$el.querySelector('.lyric-box'), this.$audio);
    }

    /*创建播放器标签*/
    createAudio(){
        let audio = document.createElement('audio');
        audio.id = `player-${Math.floor(Math.random() * 100)}-${+new Date()}`;
        audio.addEventListener('ended', () => {
                this.lyrics.restart();
                this.progress.restart();
                this.$audio.play();
        })
        document.body.appendChild(audio);
        return audio;
    }

    handleEvent(event){
        let target = event.target;
        switch (true){
            case target.matches('.icon-play'):
                /*开始播放*/
                this.onPlay(event)
                break
            case target.matches('.icon-pause'):
                /*暂停播放*/
                this.onPause(event)
                break
            case target.matches('.pack-up'):
                /*隐藏播放*/
                this.hide()
                break
        }
    }

    /*开始播放*/
    onPlay(event){

        /*audio的方法*/
        this.$audio.play();
        alert(123)
        this.lyrics.start();
        this.progress.start();

        /*解决刷新时候自动播放，没有触发按钮时*/
        var target = this.$el.querySelector('.song-info-wrap .icon');
        target.classList.add('icon-pause');
        target.classList.remove('icon-play');

        /*event.target.classList.add('icon-pause');
        event.target.classList.remove('icon-play');*/
    }

    /*暂停播放*/
    onPause(event){
        this.$audio.pause();
        this.lyrics.pause();
        this.progress.pause();
        event.target.classList.remove('icon-pause');
        event.target.classList.add('icon-play');
    }

    play(options = {}){
        if(!options) return

        this.$el.querySelector('.song-name').innerText = options.songname;
        this.$el.querySelector('.singer-name').innerText = options.artist;

        this.progress.reset(options.duration);

        let url = albumCoverUrl(options.albummid);

        this.$el.querySelector('.singer-img').src = url;
        this.$el.querySelector('.background').style.backgroundImage = `url(${url})`;

        if(options.songid){
            this.songid = options.songid;
            this.$audio.src = songUrl(this.songid);
            fetch(lyricsUrl(this.songid))
                .then(res => res.json())
                .then(json => json.lyric)
                .then(text => this.lyrics.reset(text))
                .then(() => {this.onPlay()})
                .catch(() => {})
        }
        this.show();
    }

    show(){
        this.$el.style.display = 'block';
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    }

    hide(){
        this.$el.style.display = 'none';
        document.getElementsByTagName('body')[0].style.overflow = 'visible';
    }
}