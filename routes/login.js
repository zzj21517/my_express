/*
 * @Author: your name
 * @Date: 2021-01-20 21:28:59
 * @LastEditTime: 2021-01-21 21:35:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my_express\routes\login.js
 */

var express = require('express');
var router = express.Router();
var {
    AccountModel
} = require('../models/account')
router.post('/', function (req, res, next) {
    const {
        phone,
        password
    } = req.body
    // 查询是否被注册
    console.log(req.body)
    AccountModel.findOne({
        phone
    }, function (err, data) {
        if (data) {
            res.send({
                code: 200,
                subCode: 1,
                msg: '用户名已被注册！'
            })
        } else {
            // 保存到数据库
            AccountModel.create(req.body, function (err, data) {
                if (err) {
                    throw err
                } else {
                    console.log('注册成功！')
                    res.send({
                        code: 200,
                        subCode: 0,
                        msg: '成功！'
                    });
                }
            })
        }
    })
});
module.exports = router;