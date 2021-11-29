/*
 * @Author: your name
 * @Date: 2021-11-28 14:55:50
 * @LastEditTime: 2021-11-28 15:05:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my_express\mysql.js
 */


let mysql=require(`mysql`) //引入相应依赖

module.exports={      //导出对象  
    //   
    config:{
        host:`localhost`, //主机名
        user:'root',      //用户名
        password:`password`,   //密码
        port:3306,        //端口号 
        database:`zzj`, //数据库
        multipleStatements:true  //使允许用多条sql
    },

    connection:function (sql,params,cb) {   //普通封装
        let db=mysql.createConnection(this.config)  //创建连接
        db.connect()      //打开连接
        db.query(sql,params,cb)
        db.end()
    },
    connectionPool: function (sql,params,cb) {      //连接池封装,封装用函数
        let pool=mysql.createPool(this.config)

        pool.getConnection(function (err,conn) {  //获取连接对象，后续方法
                                                      //conn,就是链接mysql的对象                                                        //写在连接对象的回调函数，
                                                     //回调函数有两个参数(err,conn)
            if(err){
                console.log(err)
            }
           conn.query(sql,params,cb)
             pool.releaseConnection(conn)  //释放连接,要有参数
                //conn.release()        关闭连接
        })
    }

}
