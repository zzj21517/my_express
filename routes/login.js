/*
 * @Author: your name
 * @Date: 2021-01-20 21:28:59
 * @LastEditTime: 2021-01-20 21:45:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my_express\routes\login.js
 */

var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    console.log('登录成功了')
    res.send({code:200,msg:'成功！'});
});
module.exports = router;

