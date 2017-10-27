import { LYRICS_URL, SEARCH_URL } from './contants.js';

/*传入一首歌的songid, 就可以获得一首歌词的地址*/
export function lyricsUrl(songid){
    return `${LYRICS_URL}?id=${songid}`
}

/*传入id可以获得一首歌的url*/
export function songUrl(id) {
  return `http://ws.stream.qqmusic.qq.com/${id}.m4a?fromtag=46`
}

/*用来生成唱片封面的url*/
export function albumCoverUrl(id) {
  return `https://y.gtimg.cn/music/photo_new/T002R150x150M000${id}.jpg`
}

export function searchUrl(keyword, page=1){
    return `${SEARCH_URL}?keyword=${keyword}&page=${page}`
}


