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
var session=require('express-session')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  req.session.userInfo='zzj'

  res.render('index', {
    title: 'xiaoaiaaa'
  });
});

router.get('/ddd', function (req, res, next) {
  
  res.render('index', {
    title: req.session.userInfo
  });
});

module.exports = router;