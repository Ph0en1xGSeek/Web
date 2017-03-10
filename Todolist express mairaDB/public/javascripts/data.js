/**
 * Created by Ph0en1x on 2016/12/30 0030.
 */
item1_1_3 = ' <div class="panel panel-danger">\
    <div class="panel-heading">\
    <h4 class="panel-title">\
    <a data-toggle="collapse" data-parent="#accordion"\
href="#collapse';

item1_1_2 = ' <div class="panel panel-warning">\
    <div class="panel-heading">\
    <h4 class="panel-title">\
    <a data-toggle="collapse" data-parent="#accordion"\
href="#collapse';

item1_1 = ' <div class="panel panel-success">\
    <div class="panel-heading">\
    <h4 class="panel-title">\
    <a data-toggle="collapse" data-parent="#accordion"\
href="#collapse';
    // + eid + " >+ 这里是事件描述
item1_2 =  '</a> <span style="float:right">';
// + time
item1_3 = '</span>\
    </h4>\
    </div><div style="background: #ccc">\
<div id="collapse';
// + eid
item1_4 = '" class="panel-collapse collapse" style="margin-right: 15%;margin-left: 15%;">\
    <div class="panel-body">\
    <form class="form-horizontal" role="form">\
    <div class="form-group">\
    <label for="firstname';
// + eid
item1_5 = '" class="col-sm-2 control-label">事件</label>\
    <div class="col-sm-10">\
    <input type="text" class="form-control" id="firstname'
// + eid
item1_6 = '"value="';
// + description
item1_7 = '">\
    </div>\
    </div>\
    <div class="form-group">\
    <label for="lastname';
// + eid
item1_8 = '" class="col-sm-2 control-label">日期</label>\
    <div class="col-sm-10">\
    <input type="datetime-local" class="form-control" id="lastname';
// + eid
item1_9 = '" value="';
// + time
item1_10 = '">\
    </div>\
    </div>\
    <div class="form-group">\
    <div class="col-sm-offset-2 col-sm-10">\
    <button type="button" class="btn btn-success" onclick="completeEvent(this)"><span class="glyphicon glyphicon-ok"></span>完成</button>\
    <button id="delete_event" type="button" class="btn btn-danger" onclick="deleteEvent(this)"><span class="glyphicon glyphicon-remove"></span>删除</button>\
    <button type="button" class="btn btn-warning" onclick="updateEvent(this)"><span class="glyphicon glyphicon-pencil"></span>修改</button>\
    </div>\
    </div>\
    </form>\
    </div>\
    </div></div>\
</div>';

//============================================================================================================================================

item2_1 = '<div id="collapse';
// + eid
item2_2 = '" class="alert alert-info alert-dismissable">\
<button type="button" class="close" data-dismiss="alert"\
aria-hidden="true" onclick="deleteEvent(this)">\
    &times;\
</button>';
//    + desceiption
item2_3 = '<div style="float: right">';
// + time
item2_4 = '</div>\
    </div>';


item3_1 = '<div id="collapse';
// + eid
item3_2 = '" class="alert alert-danger alert-dismissable">\
<button type="button" class="close" data-dismiss="alert"\
aria-hidden="true" onclick="deleteEvent(this)">\
    &times;\
</button>';
//    + desceiption
item3_3 = '<div style="float: right">';
// + time
item3_4 = '</div>\
    </div>';

item_empty='<div class="container">\
    <div class="jumbotron">\
    <h1>空空如也！</h1>\
<p>点击<a onclick="travelToNew()" href="#going"  data-toggle="tab" >这里</a>去添加新任务吧</p>\
</div>\
</div>';