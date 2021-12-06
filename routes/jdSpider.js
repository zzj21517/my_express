/*
 * @Author: your name
 * @Date: 2021-05-31 10:58:01
 * @LastEditTime: 2021-11-28 15:16:46
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

var shortid = require('shortid')
var mysql = require('../db1.js');
let insertSql = "INSERT INTO questions ( `answer`,`assuredKeywords`,`chapterId`,`conciseExplain`,`difficulty`,`explain`,`falseCount`,`id`,`illiteracyExplain`,`illiteracyKeywords`,`keywords`,`knackDetail`,`knackImgUrl`,`knackKeyword`,`knackVoiceTxt`,`label`,`mediaContent`,`mediaHeight`,`mediaKey`,`mediaType`,`mediaWidth`,`optionA`,`optionB`,`optionC`,`optionD`,`optionE`,`optionF`,`optionG`,`optionH`,`optionType`,`question`,`questionId`,`trueCount`,`wrongRate`) VALUES ? "
let selectSql="SELECT * FROM questions"
function r(t) {
    var a, i, o = Math.abs(parseInt((new Date).getTime() * Math.random() * 1e4)).toString(),
        n = 0;
    for (a = 0; a < o.length; a++)
        n += parseInt(o[a]);
    return i = function (t) {
            return function (a, i) {
                return i - "" + a.length <= 0 ? a : (t[i] || (t[i] = Array(i + 1).join(0))) + a
            }
        }([]),
        n += o.length,
        n = i(n, 3 - n.toString().length),
        t.toString() + o + n
}

function spiderQuesition(questions, req, res) {
    let addr = `http://api2.jiakaobaodian.com/api/open/question/question-list.htm?_r=${r(1)}&page=1&limit=25&questionIds=${questions}`
    request({
        url: addr,
        method: 'get',
        headers: {},
    }, (err, res1, body) => {
        console.log(err, res1, body)
        let obj = JSON.parse(res1.body)
        if (obj.success) {
            let data = obj.data || []
            if (Array.isArray(data) && data.length) {
               let paramList=[]
               data.map(item=>{
                   let {answer,assuredKeywords,chapterId,conciseExplain,difficulty,explain,falseCount,id,illiteracyExplain,illiteracyKeywords,keywords,knackDetail,knackImgUrl,knackKeyword,knackVoiceTxt,label,mediaContent,mediaHeight,mediaKey,mediaType,mediaWidth,optionA,optionB,optionC,optionD,optionE,optionF,optionG,optionH,optionType,question,questionId,trueCount,wrongRate}=item
                   paramList.push([answer,assuredKeywords,chapterId,conciseExplain,difficulty,explain,falseCount,id,illiteracyExplain,illiteracyKeywords,keywords,knackDetail,knackImgUrl,knackKeyword,knackVoiceTxt,label,mediaContent,mediaHeight,mediaKey,mediaType,mediaWidth,optionA,optionB,optionC,optionD,optionE,optionF,optionG,optionH,optionType,question,questionId,trueCount,wrongRate])
               })
               console.log(paramList,'paramsList')
               mysql.connection(insertSql,[paramList],(err,result)=>{
                   if(err){
                       console.log(err,'err')
                       res.send('error')
                   }else{
                       res.send('success')
                   }
               })
            }
        }
    })
}


function spider( req, res) {
    let addr = `https://api2.jiakaobaodian.com/api/open/exercise/sequence.htm?_r=${r(1)}&carType=car&cityCode=320500&course=kemu1&_=${Math.random()}`
    request({
        url: addr,
        method: 'get',
        headers: {

        },
    }, (err, res1, body) => {
        let obj = JSON.parse(res1.body)
        if (obj.success) {
            let data = obj.data || []
            if (Array.isArray(data) && data.length) {
                let tempList = data.splice(0, 2)
                console.log(tempList)
                spiderQuesition(tempList.join(','), req, res)
            }
        }
    })
}
router.get('/', function (req, res, next) {
    spider(req, res)

    // res.send('success')
    // mysql.connection(selectSql,(err,result)=>{
    //     if(err){
    //         res.send('error')
    //     }else{
    //         console.log(result)
    //         res.send('success')
    //     }
    // })
});

module.exports = router;