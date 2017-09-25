const express = require('express')
const request = require('request-promise')
const app = express()

app.get('/', async (req, res) => {
    const url = `https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=${+ new Date()}`
    try {
        res.json (await request({
            url: url,
            json: true,
            headers: {
                /*Accept代表发送端（客户端）希望接受的数据类型。 */
                'accept': 'application/json',
                /*伪头部字段,标明自身被授权。*/
                'authority': 'c.y.qq.com',
                /*origin主要是用来说明最初请求是从哪里发起的*/
                'origin': 'https://m.y.qq.com/',
                /*当浏览器向web服务器发送请求的时候，一般会带上Referer，告诉服务器我是从哪个页面链接过来的当浏览器向web服务器发送请求的时候，一般会带上Referer，告诉服务器我是从哪个页面链接过来的*/
                'referer': 'https://m.y.qq.com/',
                /*作用是告诉服务器，用户客户端是什么浏览器，以及操作系统的信息的*/
                'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
            }
        }))
    }catch(e){
        res.json({error: e.message})
    }
})

app.listen(4000)


//curl "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w="%"E6"%"9D"%"8E"%"E8"%"8D"%"A3"%"E6"%"B5"%"A9&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all&_=1506259111203" -H "origin: https://m.y.qq.com" -H "accept-encoding: gzip, deflate, sdch" -H "accept-language: zh-CN,zh;q=0.8" -H "user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1" -H "accept: application/json" -H "cache-control: max-age=0" -H "authority: c.y.qq.com" -H "cookie: pgv_pvi=5072752640; RK=3InrIeHrR6; ptui_loginuin=898639198; ptcz=a128b073bcb7ab058bad5adc1d21fab3a3be5f1619ddeb62b1958c428bf31130; pt2gguin=o0898639198; ts_refer=ADTAGmyqq; ts_uid=8509681806; pgv_si=s4440808448; ts_refer=localhost/qqMusic/qq-music/; yqq_stat=0; ts_uid=8509681806; pgv_info=ssid=s5297134105; pgv_pvid=9931787384" -H "referer: https://m.y.qq.com/" --compressed