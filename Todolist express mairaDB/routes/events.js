/**
 * Created by Ph0en1x on 2016/12/30 0030.
 */


var express = require('express');
var router = express.Router();

var Event = require('../services/event');

router.get('/', function(req, res, next) {//响应查询请求
    var err;
    if(req.query.id!=null){
        Event.get(req.query.id,function (err,data) {//注册时检查是否重名时和密码验证时调用
            if (err) {
                console.log('Event.get error!');
            }
            res.json(data);
        })
    } else {
        Event.findAll(function (err,data) {
            if (err) {
                console.log('Event.findAll error!');
            }
            res.json(data);
        });
    }
});

router.post('/', function(req, res, next) {//响应添加事件的请求
    var err;
    var event = req.body;
    Event.add(event,function (err, data) {
        res.json(data);
    });

});

router.delete('/:id', function(req, res, next) {//响应删除指定eid事件请求 ajax
    var err;
    Event.delete(req.params.id,function (err,data) {
        if (err) {
            console.log('Event.delete error!');
        }
        res.json(data);
    });
});

module.exports = router;