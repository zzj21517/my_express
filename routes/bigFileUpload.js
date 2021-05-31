/*
 * @Author: your name
 * @Date: 2021-05-31 10:58:01
 * @LastEditTime: 2021-05-31 17:37:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my_express/routes/bigFileUpload.js
 */

var express = require('express');
var router = express.Router();
var multiparty = require('multiparty')
var path = require('path')
var fs = require('fs')
// router.options('*', function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     res.header("X-Powered-By", ' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

/* GET users listing. */
router.post('/upload', function (req, res, next) {
    var form = new multiparty.Form({
        uploadDir: path.resolve(__dirname, '../public/images')
    })
    form.parse(req, function (err, fields, {
        file
    }) {
        console.log(fields, 'fff')
        res.json({
            code: 200,
            data: {
                path: file[0].path,
                index: fields.index[0]
            }
        })
    })
});

router.post('/concat', function (req, res, next) {
    const {
        pipeList
    } = req.body
    let pipePromiseList = pipeList.map((item, index) => {
        return new Promise((resolve, reject) => {
            fs.readFile(item, (err, data) => {
                if (err) {

                } else {
                    console.log(data, 'ddd')
                    resolve(data)
                }
            })
        })
    })
    Promise.all(pipePromiseList).then(resList => {
        let buf = Buffer.concat(resList)
        console.log(buf,'bbb333')
        res.json({
            code: 200,
            data: {
                imgBase64:buf.toString('base64')
            }
        })
    })
});

module.exports = router;