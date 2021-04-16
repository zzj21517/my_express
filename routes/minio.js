/*
 * @Author: your name
 * @Date: 2021-04-16 14:55:54
 * @LastEditTime: 2021-04-16 17:03:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my_express/routes/minio.js
 */
var express = require('express');
var router = express.Router();
var multiparty = require('multiparty')

router.options('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
var Minio = require('minio')
var path = require('path')

function initMinio(fileName,fileUrl) {
    let minioClient = new Minio.Client({
        endPoint: '123.150.252.54',
        port: 19000,
        useSSL: false,
        accessKey: 'minioadmin',
        secretKey: 'minioadmin'
    })
    minioClient.fPutObject('ftzart-test', fileName, fileUrl, {
        'Content-Type': 'application/octet-stream',
        'X-Amz-Meta-Testing': 1234,
        'example': 5678
    }, (err, etag) => {
        if (err) {
            return console.log(err)
        }
        console.log('file uploaded successfully', etag)
    })
}

/* GET users listing. */
router.post('/', function (req, res, next) {
    var form = new multiparty.Form({
        uploadDir: path.resolve(__dirname, '../public/images')
    })
    form.parse(req)
    form.on('file', (name, file) => {
        console.log('hhh', name, file)
        initMinio(file.originalFilename,file.path)
    })
    res.send('respond with a resource');
});

module.exports = router;