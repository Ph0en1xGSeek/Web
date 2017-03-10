/**
 * 提供数据库直接查询
 */

var db = require('./db');//调用db 创建连接

function User () {

}

User.get = function (id,callback) {//按id查找用户
    var sql = 'select * from user where id = ' + id;
    console.log(sql);
    db.query(sql, function (err, data) {
        callback(err,data);
    });
}

User.findAll = function (callback) {//查找所有用户表
    db.query('select * from user',function (err, data) {
        callback(err,data);
    });
}

User.findByUsername = function (username, callback) {//用户名查找
    var sql = 'select * from user where username = \'' + username + '\'';
    db.query(sql,function (err,data) {
        callback(err,data);
    })
}

User.add = function (user,callback) {//添加用户项，id自增长
    var sql = "insert into user (username,password) values ('"+user.username+"','"+user.password+"')";
    db.query(sql,function (err,data) {
        console.log(data);
        callback(err,data);
    })
}

User.delete = function (id,callback) {//通过id删除用户
    var sql = "delete from user where id =" + id;
    db.query(sql,function (err,data) {
        console.log(data);
        callback(err,data);
    })
}

User.update = function (user, callback) {//修改事件
    var sql = "update user set password='" + user.password + "' where id=" + user.id;
    db.query(sql,function (err,data) {
        console.log(data);
        callback(err,data);
    })
}
module.exports = User;