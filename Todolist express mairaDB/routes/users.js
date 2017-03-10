var express = require('express');
var router = express.Router();

var User = require('../services/user');

/* GET users listing. */
router.get('/', function(req, res, next) {//响应查询请求
  var err;
  if(req.query.username!=null){
      User.findByUsername(req.query.username,function (err,data) {//注册时检查是否重名时和密码验证时调用
          if (err) {
              console.log('User.find error!');
          }
          res.json(data);
      })
  } else {
      User.findAll(function (err,data) {
          if (err) {
              console.log('User.findAll error!');
          }
          res.json(data);
      });
  }
});


router.get('/:id', function(req, res, next) {//响应指定id的查询请求
    var err;
    User.get(req.params.id,function (err,data) {
        if (err) {
            console.log('User.get error!');
        }
        res.json(data);
    });
});

router.post('/', function(req, res, next) {//响应添加用户的请求和修改密码请求
    var err;
    var user = req.body;
    if(user.id == null){
        User.add(user,function (err, data) {
            res.json({id: data.insertId});
        });
    }else{
        User.update(user,function (err,data) {
            res.json({id: data.insertId});
        });
    }

});

router.delete('/:id', function(req, res, next) {//响应删除指定id用户的请求 ajax
    var err;
    User.delete(req.params.id,function (err,data) {
        if (err) {
            console.log('User.delete error!');
        }
        res.json(data);
    });
});

module.exports = router;
