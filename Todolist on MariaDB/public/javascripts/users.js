$(function () {
    currentID = 0;//当前用户id
    
    $('#clearButton').click(function () {//清空搜索框
        $('#search').val("");
        $('.tab-pane .panel-group .panel,.tab-pane .alert').show(100);
    });

    $('#search').keyup(function () {//搜索
        var str = $('#search').val();
        if(str.length > 0){
            $('.tab-pane .panel-group .panel,.tab-pane .alert').hide(100)
                .filter(":contains('" + str + "')").show(100);
        }else{
            $('.tab-pane .panel-group .panel,.tab-pane .alert').show(100);
        }
    });
    
    $('#submitnew').click(function () {//添加新事件
        var description = $('#newevent').val();
        var time = $('#newtime').val();
        if(description.length == 0){
            alert('请添加事件描述');
        }else if(time.length == 0){
            alert('请设置deadline');
        }else{
            var event = {description: description,time: time, id:currentID, finished:0};
            $.post('/api/events',event, function(data,status) {
                $('#newevent').val('');
                refresh();
            });
        }
    });
    
    $("#buttom_log").click(function () {//登录按钮
        var username = $('#usernamelog').val();
        var password = $('#passwordlog').val();
        if(username.length==0){
            alert("帐号不能为空");
            return;
        }
        $.get('/api/users?username='+username,function (data,status) {
            if(data.length>0){
                if(password == data[0].password){
                    currentID = data[0].id;
                    $('#div_loggin').hide(300);
                    $('#div_list').hide(300);
                    $("#div_add").hide(300);
                    $('#div_todo').show(300);
                    $('#searchForm').show(300);
                    $('#user-menu').show(300);
                    $('#usernamelog').val('');
                    $('#passwordlog').val('');
                    refresh();
                    travelToNew()
                    $("body").css({"background-image":"url('../images/white.png')"});
                }
                else{//密码错误
                    alert('帐号或密码错误');
                }
            } else {
                    alert('该用户不存在');
            }
        });
    });

    $("#change-password").click(function(){//修改密码界面按钮log
        $('#div_loggin').hide(300);
        $('#div_list').show(300);//用户列表显示
        $("#div_add").hide(300);//添加用户界面隐藏
        $('#div_todo').hide(300);
        $('.user-menu').hide(300);
        $('#searchForm').hide(300);
        $("body").css({"background-image":"url('../images/flower.png')"});
    });

    $('#delete-menu').click(function () {
        if(window.confirm('确定不再使用TodoList吗？这将会清除您所有事件记录')){
            $.ajax({
                type: 'DELETE',
                url: '/api/users/'+currentID,
                success: function (data) {
                    if(data.affectedRows>0){
                        alert("删除成功，ID为"+currentID+"的用户已经被删除！");
                        $('#div_loggin').show(300);
                        $('#div_list').hide(300);
                        $("#div_add").hide(300);
                        $('#div_todo').hide(300);
                        $('#searchForm').hide(300);
                        $('#user-menu').hide(300);
                        $("body").css({"background-image":"url('../images/green.png')"});
                    }
                }
            });
            return true;
        }else{
            return false;
        }
    });

    $("#buttom_reg").click(function () {//新建用户按钮
        $('#div_loggin').hide(300);
        $('#div_list').hide(300);
        $("#div_add").show(300);
        $('#div_todo').hide(300);
        $("body").css({"background-image":"url('../images/red.png')"});
    });

    $("#home,#logout").click(function () {//切换登录页面按钮
        $('#div_loggin').show(300);
        $('#div_list').hide(300);
        $("#div_add").hide(300);
        $('#div_todo').hide(300);
        $('#searchForm').hide(300);
        $('#user-menu').hide(300);
        $("body").css({"background-image":"url('../images/green.png')"});
    });

    $("#username").keyup(function () {//用户名时键盘抬起
        var username=$('#username').val();
        if(username.length==0){
            $('#exist').css("visibility","hidden");
            $("#register").addClass("disabled");//把按钮加入不可用类 按钮不可用
            return;
        }
        $.get('/api/users?username='+username,function (data,status) {
            if(data.length>0){
                $('#exist').css("visibility","visible")
                    .html("此用户名已被注册")
                    .css("color", "red");
                $("#register").addClass("disabled");
            } else {
                $('#exist').css("visibility","visible")
                            .html("此用户名未被注册")
                    .css("color", "green");
                $("#register").removeClass("disabled");
            }
        });
    });
    
    $("#register").click(function () {//添加新用户
        var username = $('#username').val();
        var password = $('#password').val();
        var passwordAgain = $('#passwordAgain').val();
        if(password != passwordAgain){
            $('#exist').css("visibility","visible")
                .html("密码不一致")
                .css("color", "red");
            return;
        }
        var user = {username: username,password: password};
        $.post('/api/users',user, function(data,status) {
            alert("添加用户成功，新用户的ID为"+data.id);
            $('#username').val("");
            $('#password').val("");
            $('#passwordAgain').val("");
            $('#exist').css("visibility","hidden");
            $("#register").addClass("disabled");
            $('#div_loggin').show(300);
            $('#div_add').hide(300);
            $("body").css({"background-image":"url('../images/green.png')"});
        });
    });
    
    $('#change').click(function () {//修改密码
        var password = $('#changepassword').val();
        var passwordAgain = $('#changepasswordAgain').val();
        if(password != passwordAgain){
            $('#consistency').css("visibility","visible")
                .html("密码不一致")
                .css("color", "red");
            return;
        }
        var user = {id: currentID,password: password};
        $.post('/api/users',user, function(data,status) {
            $('#changepassword').val("");
            $('#changepasswordAgain').val("");
            $('#consistency').css("visibility","hidden");
            $('#div_list').hide(300);
            $('#div_todo').show(300);
            $("body").css({"background-image":"url('../images/white.png')"});
            alert("密码修改成功");
        });
    });

    $('#back').click(function () {
        $('#div_list').hide(300);
        $('#div_todo').show(300);
        $('#searchForm').show(300);
        $("body").css({"background-image":"url('../images/white.png')"});
    });

    $('#closeModal').click(function () {
        $('#newevent').val('');
    });

})

function refresh(){//刷新事件列表
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();
    var hour = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();
    var now = year + '-' + (month+1 < 10? '0':'') +  (month+1) + '-' + (day < 10? '0':'') + day + 'T' + (hour < 10? '0':'')
        + hour + ':' + (minute < 10? '0':'') + minute + ':' + (second < 10? '0':'') + second;

    var UTC = Date.UTC(year, month, day, hour, minute, second);
    $.get('/api/events?id='+currentID,function (data2,status2) {
        if(data2.length >= 0){
            var ing = '';
            var finished = '';
            var passed = '';
            for(var i= 0; i < data2.length; i++){
                var arr=data2[i].time.split("T")[0].split("-");
                var arr2=data2[i].time.split("T")[1].split(":");
                var da=new Date(arr[0],arr[1]-1,arr[2]);
                var curYear = arr[0];
                var curMonth = arr[1]-1;
                var curDay = arr[2];
                var curHour = arr2[0];
                var curMinute = arr2[1];
                var curSecond = arr2[2];
                // console.log(curYear + ' ' + curMonth + ' ' + curDay + ' ' + curHour + ' ' + curMinute + ' ' + curSecond);
                // console.log(year + ' ' + month + ' ' + day + ' ' + hour + ' ' + minute + ' ' + second);
                var curUTC = Date.UTC(curYear, curMonth, curDay, curHour, curMinute, curSecond);
                if(data2[i].finished == 0 || data2[i].finished == undefined){//未完成
                    if(now > data2[i].time){//过期
                        passed += item3_1 + data2[i].eid + item3_2 + data2[i].description + item3_3 + da.toDateString() + item3_4;
                    }else{
                        if((curUTC-UTC) < 86400000){//紧急
                            ing += item1_1_3 + data2[i].eid + '">' + data2[i].description + item1_2 + da.toDateString() + item1_3 + data2[i].eid + item1_4
                                + data2[i].eid + item1_5 + data2[i].eid + item1_6 + data2[i].description + item1_7 + data2[i].eid + item1_8 + data2[i].eid +
                            item1_9 + data2[i].time + item1_10;
                        }else if((curUTC-UTC) < 86400000*3){//较紧急
                            ing += item1_1_2 + data2[i].eid + '">' + data2[i].description + item1_2 + da.toDateString() + item1_3 + data2[i].eid + item1_4
                                 + data2[i].eid + item1_5 + data2[i].eid + item1_6 + data2[i].description + item1_7 + data2[i].eid + item1_8 + data2[i].eid +
                                item1_9 + data2[i].time + item1_10;
                        }else{
                            ing += item1_1 + data2[i].eid + '">' + data2[i].description + item1_2 + da.toDateString() + item1_3 + data2[i].eid + item1_4
                                + data2[i].eid + item1_5 + data2[i].eid + item1_6 + data2[i].description + item1_7 + data2[i].eid + item1_8 + data2[i].eid +
                                item1_9 + data2[i].time + item1_10;
                        }
                    }
                }else{//已完成
                    finished += item2_1 + data2[i].eid + item2_2 + data2[i].description + item2_3 + da.toDateString() + item2_4;
                }

            }
            if(ing != ''){
                $('#accordion').html(ing);
            }else{
                $('#accordion').html(item_empty);
            }
            if(finished != ''){
                $('#finished').html(finished);
            }else{
                $('#finished').html(item_empty);
            }
            if(passed != ''){
                $('#passed').html(passed);
            }else{
                $('#passed').html(item_empty);
            }
        }
    });
}

function newModal () {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();
    var hour = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();
    var now = year + '-' + (month+1 < 10? '0':'') +  (month+1) + '-' + (day < 10? '0':'') + day + 'T' + (hour < 10? '0':'')
        + hour + ':' + (minute < 10? '0':'') + minute + ':' + (second < 10? '0':'') + second;
    $('#newtime').val(now);
    $('#newtime').attr("min",now);
}

function deleteEvent(eve){
    var delete_id = $(eve).closest('[id^="collapse"]').attr('id');//从最近的存有eid的祖先节点中提取eid
    delete_id = delete_id.substring(8);
    if (isdigit(delete_id) && parseInt(delete_id)>0){
        $.ajax({
            type: 'DELETE',
            url: '/api/events/'+delete_id,
            success: function (data) {
                if(data.affectedRows>0){
                    alert("删除成功，EID为"+delete_id+"的事件已经被删除！");
                    refresh();
                }
            }
        });
    }
}

function updateEvent(eve){
    var update_id = $(eve).closest('[id^="collapse"]').attr('id');//从最近的存有eid的祖先节点中提取eid
    update_id = update_id.substring(8);
    var update_description = $('#firstname' + update_id).val();
    var update_time = $('#lastname' + update_id).val();
    console.log("des: " + update_time);
    var event = {description: update_description,time: update_time, eid:update_id};
    $.post('/api/updates',event, function(data,status) {
        refresh();
    });
}

function completeEvent(eve) {
    var update_id = $(eve).closest('[id^="collapse"]').attr('id');//从最近的存有eid的祖先节点中提取eid
    update_id = update_id.substring(8);
    var event = {eid:update_id};
    $.post('/api/updates',event, function(data,status) {
        refresh();
    });
}

function isdigit(s)
{
    var r,re;
    re = /\d*/i; //\d表示数字,*表示匹配多个数字
    r = s.match(re);//适配正则表达式
    return (r==s)?1:0;
}

function travelToNew() {
    $('#Eventgoing').addClass("active");
    $('#Eventcompleted').removeClass();
    $('#Eventpassed').removeClass();
}
