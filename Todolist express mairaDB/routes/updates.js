/**
 * Created by Ph0en1x on 2017/1/1 0001.
 */

var express = require('express');
var router = express.Router();

var Event = require('../services/event');

router.post('/', function(req, res, next) {//响应添加事件的请求
    var err;
    var event = req.body;
    if(event.description != null){
        console.log(event.description);
        Event.update(event,function (err, data) {
            res.json(data);
        });
    }else{
        Event.complete(event,function (err, data) {
            console.log("complete2");
            res.json(data);
        });
    }
});

module.exports = router;