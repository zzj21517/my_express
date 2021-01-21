/*
 * @Author: your name
 * @Date: 2021-01-20 21:28:29
 * @LastEditTime: 2021-01-21 22:09:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my_express\routes\index.js
 */
var express = require('express');
var request = require('request')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  request('https://static1.34580.cn/topics2/sz/956485edea7d1f90855b1009b9d8c7e2/1.json', (err,res,body) => {
    console.log(res, 'res')
  })
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;