import './tab.js';
import { Recommend } from './recommend.js';
import { TopList } from './toplist.js';
import { Search } from './search.js';
import { MusicPlayer } from './music_player.js';

let recommend = new Recommend(document.querySelector('#rec-view')).launch();
let search = new Search(document.querySelector('#search-view'));
let toplist = new TopList(document.querySelector('#rank')).launch();
/*音乐播放*/
let musicPlayer = new MusicPlayer(document.querySelector('#player'));

let show = document.querySelector('#header .down-app');
show.addEventListener('click',() => {
     musicPlayer.show();
});

var songList = document.getElementById('song-list')
songList.addEventListener('touchend', touchPlay)

function touchPlay(){
    let target = event.target;
    if(target.matches('.song-name') || target.matches('.song-artist') || target.matches('icon-music')){
        musicPlayer.$audio.play();
    }

}

function onHashChange(){
    let hash = location.hash;
    if(/^#player\?.+/.test(hash)){
        let matches = hash.slice(hash.indexOf('?') + 1).match(/(\w+)=([^&]+)/g);
        let options = matches && matches.reduce((res, cur) => {
            let arr = cur.split('=');
            res[arr[0]] = decodeURIComponent(arr[1]);
            return res
        }, {});
        musicPlayer.play(options);
        search.reset();
    } else {
        musicPlayer.hide();
    }
}

/*刷新是立即解析*/
onHashChange()
window.addEventListener('hashchange', onHashChange);

