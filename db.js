/*
 * @Author: zzj
 * @Date: 2021-01-21 20:50:24
 * @LastEditTime: 2021-01-21 21:27:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my_express\db.js
 */

let mongoose = require('mongoose')

let db = mongoose.connection
db.on('error', function callback() {
    console.log('Connection error')
})

db.once('open', function callback() {
    console.log('connected!')
})

mongoose.connect('mongodb://zzj:123456@106.14.134.132:27017/mydb')

module.exports = mongoose