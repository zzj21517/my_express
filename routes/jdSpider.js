/*
 * @Author: your name
 * @Date: 2021-05-31 10:58:01
 * @LastEditTime: 2021-06-01 17:27:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my_express/routes/bigFileUpload.js
 */

var express = require('express');
var router = express.Router();
var multiparty = require('multiparty')
var path = require('path')
var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')

function spider(req, res) {
    let addr = 'https://p.m.jd.com/norder/order.action?wareId=100020701838&wareNum=1&enterOrder=true'
    request({
        url: addr,
        method: 'get',
        headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Cache-control': 'no-cache',
            cookie: '__jdu=310478548; shshshfpa=3504307c-d505-0ac2-9022-6cc653620afc-1617681679; shshshfpb=u5YXvKMPD4rjcCI66mdQQjw%3D%3D; TrackID=1CwvG3LVGmJ-7Fhujr0B8g3WG43VOqQ9vOB5aqtYisI8BzdEScdooQffvfK00QdHfv6GOLYvnw0dtKJCuiiekR9LHdCg5FtxhgiOQ0rK66Cef7wZCJm5WX_APbKgflDmV; pinId=0o-PGkvHz2vbL1ahtghln7V9-x-f3wj7; whwswswws=; downloadAppPlugIn_downCloseDate=1618569961759_10800000; areaId=12; ipLoc-djd=12-988-40034-0; unpl=V2_ZzNtbRVVFx1yCE9cfU4OUmJRQFsRUkNHfA8UUnpMDFYyBUVeclRCFnUUR1NnGFwUZwcZXkBcRhVFCEdkeBBVAWMDE1VGZxBFLV0CFSNGF1wjU00zQwBBQHcJFF0uSgwDYgcaDhFTQEJ2XBVQL0oMDDdRFAhyZ0AVRQhHZHkZXQBhChZYS2dzEkU4dlZ9EVkFYjMTbUNnAUEpDURSeBFdSGUDE1hEXkcQfDhHZHg%3d; __jdc=76161171; 3AB9D23F7A4B3C9B=NKE7BHKV4BNMAEQ4A2YPKYUTBIQSQZRUR4GQALLROLZ2D4P5RNWOGAV5BKD2DP2JBI37KNJWVNBHSGVA4OZEIEYUKY; wxa_level=1; retina=1; jxsid=16225322310835611916; webp=1; mba_muid=310478548; autoOpenApp_downCloseDate_auto=1622532231910_10800000; visitkey=51440554246947775; jcap_dvzw_fp=1Ydsx24YNs5Ws28D0DhvoC8U3GRek3qpdf_Ee9WfBx_MpsUUBjOwP_NrQq1SnW3XtSog0Q==; TrackerID=VCd-t3AX6A50LlkohsjZUNtZVeXZwKtgcWXIkeMLwGH5W-3V-ZzQXbxWdvbF7aCUPiw33oFHw4P-Cb6n3564o6SKE5dlwlIzzi3PWvHZUFb1tSg7YEtAhEeYxj8J6_XD2DLAjbuhAEA72eoQiI4h7Q; pt_key=AAJgteCfADBCFgdySVSq0vs8R7MQrO8w2RzkAQupuTIMFzD3MiCT3gqz-zpFNR-gadxuLOvC4xI; pt_pin=qaz17186221871; pt_token=4t3gev27; pwdt_id=qaz17186221871; sfstoken=tk01mcb1e1c86a8sMyszKzM5WWxqNLKe7iuAX9Xa+V44yWZv07hgf7DwkHuavkLxUI9V7zfnB9wUJFSPAKACqL2NvEbv; sc_width=375; wq_area=12_988_40034%7C3; cid=9; equipmentId=NKE7BHKV4BNMAEQ4A2YPKYUTBIQSQZRUR4GQALLROLZ2D4P5RNWOGAV5BKD2DP2JBI37KNJWVNBHSGVA4OZEIEYUKY; _modc=098f6bcd4621d373cade4e832627b4f6; string123=CB6C2C017382A6C2AB4C245FBA9FF9F2L7Y5132%26TE; wqmnx=1bcd1c43jdm356a3e3a6hpea2b4e4130; cd_eid=NKE7BHKV4BNMAEQ4A2YPKYUTBIQSQZRUR4GQALLROLZ2D4P5RNWOGAV5BKD2DP2JBI37KNJWVNBHSGVA4OZEIEYUKY; addrId_1=5087552937; mitemAddrId=12_919_923_24017; mitemAddrName=%u6C5F%u82CF%u8FDE%u4E91%u6E2F%u5E02%u704C%u5357%u53BF%u7530%u697C%u9547%u80E1%u57291%u7EC42%u53F7; wq_addr=5087552937%7C12_919_923_24017%7C%u6C5F%u82CF_%u8FDE%u4E91%u6E2F%u5E02_%u704C%u5357%u53BF_%u7530%u697C%u9547%7C%u6C5F%u82CF%u8FDE%u4E91%u6E2F%u5E02%u704C%u5357%u53BF%u7530%u697C%u9547%u80E1%u57291%u7EC42%u53F7%7C119544960%2C34267651; __jda=76161171.310478548.1617681675.1622532648.1622534790.10; warehistory="100011650363,100000160095,10031027293418,"; sk_history=100011650363%2C100000160095%2C10031027293418%2C; __jdv=76161171%7Candroidapp%7Ct_335139774%7Cappshare%7CCopyURL%7C1622534852734; PPRD_P=UUID.310478548-CT.138561.2.1-LOGID.1622534852741.1813690802; fingerprint=efa624578f0a7c6b2a76f841315309e3; deviceVersion=604.1; deviceOS=ios; deviceOSVersion=13.2.3; deviceName=Safari; cartLastOpTime=1622534880; wq_logid=1622534880_1804289383; wqmnx1=MDEyNjM4NTpkcmVuPTVyZWU0NDdhYTtNICllN1RlIDkyYTNyZDI0T0lISA%3D%3D; __jdb=76161171.12.310478548|10.1622534790; mba_sid=16225322314382699416293818866.18; commonAddress=5087552937; regionAddress=5087552937; __wga=1622534881499.1622532256818.1622532256818.1622532256818.15.1; jxsid_s_t=1622534881637; jxsid_s_u=https%3A//p.m.jd.com/norder/order.action; shshshfp=1b0caf68eba698c81b3fac06873988cf; shshshsID=3ff51fa29c159a2c0847c95d905951bb_17_1622534882091'
        },
        encoding: null,
    }, (err, res1, body) => {
        const $ = cheerio.load(body)
        let photoTag = $('body')
        console.log(photoTag.text(), photoTag,$)
        res.send(photoTag.text())
    })
}
router.get('/', function (req, res, next) {
    spider(req, res)
});

module.exports = router;