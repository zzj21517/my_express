/*
 * @Author: your name
 * @Date: 2021-01-21 21:27:11
 * @LastEditTime: 2021-01-21 21:27:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my_express\models\account.js
 */

let mongoose = require('mongoose')

let AccountSchema = new mongoose.Schema({
    phone: {
        type: String,
        unique: true
    },
    password: String,
    createAt: {
        type: Date,
        default: Date.now()
    }
})

exports.AccountModel = mongoose.model('account', AccountSchema)