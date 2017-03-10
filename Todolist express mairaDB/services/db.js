/**
 * Created by ligang on 16-12-7.
 */
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '1114',
    database : 'test'
});

function Db(){
}


Db.query = function(sql,callback) {
    connection.query(sql, function(err, data) {
        if (err) throw err;
        callback(err,data);
    });
};


module.exports = Db ;
