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
// var db=require('../db1.js')

function spiderQuesition(questions,req,res){
    let addr=`http://api2.jiakaobaodian.com/api/open/question/question-list.htm?_r=19604815519963578102&page=1&limit=25&questionIds=${questions}`
    request({
        url:addr,
        method:'get',
        headers:{},
    },(err,res,body)=>{
        console.log(err,res,body)
    })
}

function spider(str,req, res) {
    let addr = 'http://api2.jiakaobaodian.com/api/open/question/list-by-tag.htm?_r=111922017237088616081&cityCode=511300&page=1&limit=25&course=kemu1&tagId=2&carType=car&_=0.5066246786512065'
    request({
        url: addr,
        method: 'get',
        headers: {
           
        },
    }, (err, res1, body) => {
        console.log(res1,'res1')
        let data=res1.data||[]
        console.log(data,'datat')
        if(Array.isArray(data)&&data.length){

            let tempList=data.splice(0,20)
            console.log(tempList)
            spiderQuesition(tempList.join(','),req,res)
        }
    })
}
router.get('/', function (req, res, next) {
    spider(req, res)
    res.send('success')
});

module.exports = router;