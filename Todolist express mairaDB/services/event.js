/**
 * Created by Ph0en1x on 2016/12/30 0030.
 */

var db = require('./db');//调用db 创建连接

function Event () {

}
Event.get = function (id,callback) {//按所属id查找事件
    var sql = 'select * from event where id = ' + id + ' order by time';
    console.log(sql);
    db.query(sql, function (err, data) {
        callback(err,data);
    });
}

Event.findAll = function (callback) {//查找所有事件表
    db.query('select * from event',function (err, data) {
        callback(err,data);
    });
}

Event.add = function (event,callback) {//添加用户项，id自增长
    var sql = "insert into event (description,time, id, finished) values ('" + event.description + "','" + event.time+ "',"+ event.id +","+event.finished +")";
    db.query(sql,function (err,data) {
        console.log(data);
        callback(err,data);
    })
}

Event.delete = function (eid,callback) {//通过eid删除事件
    var sql = "delete from event where eid =" + eid;
    db.query(sql,function (err,data) {
        console.log(data);
        callback(err,data);
    })
}

Event.update = function (event, callback) {//修改事件
    var sql = "update event set description='" + event.description + "', time='" + event.time + "' where eid=" + event.eid;
    db.query(sql,function (err,data) {
        console.log(data);
        callback(err,data);
    })
}

Event.complete = function (event, callback) {//修改事件
    var sql = "update event set finished= 1 where eid=" + event.eid;
    db.query(sql,function (err,data) {
        console.log(data);
        callback(err,data);
    })
}


module.exports = Event;