function Lightbox(){
    this.abstract = "";
    this.isCreate = false;
    this.state = "0";
    this.container = "";
    this.titleNode = "";
    this.currentImageNode = "";
    this.imageNode = "";
    this.init();

}

Lightbox.prototype ={
	createNode : function(){
		this.container = $('<div class="lightbox-container"></div>');
        var _self = this;
		var wrapper = $('<div class="lightbox-wrapper"></div>').appendTo(this.container);

        this.abstract = $('<div class="lightbox-abstract"></div>').appendTo(this.container);
    	$(this.container).on('click',function(e){
			if(e.target == this){
			    //点在图片上点不隐藏
                _self.hide();
            }
		});        

		var imageWrapper = $('<div class="lightbox-image-wrapper"></div>').appendTo(wrapper);

        var para = $('<p class="lightbox-abstract-para"></p>').appendTo(this.abstract);
        this.imageNode = $('<img class="lightbox-image"/>').appendTo(imageWrapper);
        this.imageNode.on('click',function (e) {
            if(e.target == this){
                if(_self.state == "0"){
                    _self.state = "1";
                    $(".lightbox-abstract").css('display','none');
                    var index = _self.images.indexOf(_self.currentImageNode);
                    $(".lightbox-wrapper").css('left','50%')
                                            .css('transform', 'translateX(-50%) translateY(-50%)');
                    _self.goTo(index);
                }else{
                    _self.state = "0";
                    $(".lightbox-abstract").css('display','block');
                    var index = _self.images.indexOf(_self.currentImageNode);
                    $(".lightbox-wrapper").css('left','50px')
                        .css('transform', 'translateY(-50%)');
                    _self.goTo(index);
                }
            }

        });
        var prevNode = $('<span class="lightbox-prev"></span>').appendTo(imageWrapper);

        prevNode.on('click',function(){
        	_self.toPrev();
        });

        var nextNode = $('<span class="lightbox-next"></span>').appendTo(imageWrapper);

        nextNode.on('click',function(){
        	_self.toNext();
        });

        var noteNode = $('<div class="lightbox-note"></div>').appendTo(wrapper);

        this.titleNode =$('<p class="lightbox-title"></p>').appendTo(noteNode);

        var closeNode = $('<span class="lightbox-close"></span>').appendTo(noteNode);
        closeNode.on('click',function(){
            //只要不是点图就是隐藏
        	_self.hide();
        });
        this.container.css("opacity", "1");
        this.container.css("display","none");
        $(document.body).append(this.container);
        this.isCreate = true;
	},
	toPrev :function(){ 
        var index = this.images.indexOf(this.currentImageNode);
        index <= 0 ? index = this.images.length -1 : index--;
        this.goTo(index);
	},
	toNext : function(){   
        var index = this.images.indexOf(this.currentImageNode);
        index >= this.images.length -1 ? index = 0 : index++;
        this.goTo(index);
	},
	goTo : function(index){  
		var imageNode = this.images[index];
        this.show(imageNode);
	},
	update : function(imageNode){ 
 		var _self = this;
        var images = this.images;
        var imgNode = _self.imageNode;
        var paragram = this.abstract;
        var para = $(".lightbox-abstract p");
        var src=$(imageNode).attr('src');
        imgNode.css("opacity", "0");

        var index = _self.images.indexOf(_self.currentImageNode);
        console.log(index);
        this.container.addClass("lightbox-loading");
        var newImg = $('<img />')
                    .attr('src',src);
        newImg.on('load',function() {
            var imgWidth = this.width;
            var imgHeight = this.height;

            var clientWidth = document.documentElement.clientWidth;
            var clientHeight = document.documentElement.clientHeight;

            //将图片等比例缩小
            var scale = Math.max(imgWidth / clientWidth, imgHeight / clientHeight);

            if (_self.state == "1"){
                imgNode.width(scale > 1 ? imgWidth / scale * 0.8 : imgWidth )
                    .height(scale > 1 ? imgHeight / scale * 0.8 : imgHeight)
                    .delay(300).attr('src', src)
                    .animate({opacity: 1}, 300);
            }else {
                $(".lightbox-abstract").css('display','block');
                $(".lightbox-wrapper").css('left','50px')
                    .css('transform', 'translateY(-50%)');
                imgNode.width(scale > 1 ? imgWidth / scale * 0.4 : imgWidth * 0.5)
                    .height(scale > 1 ? imgHeight / scale * 0.4 : imgHeight * 0.5)
                    .delay(300).attr('src', src)
                    .animate({opacity: 1}, 300);

                paragram.css("margin-left", (scale > 1 ? imgWidth / scale * 0.4 : imgWidth * 0.5) + 80 + "px");
                paragram.css("width", (clientWidth - (scale > 1 ? imgWidth / scale * 0.4 : imgWidth * 0.5) - 100) + "px");
                para.html(data[index % 20].desc);
            }
            _self.container.removeClass("lightbox-loading");
        });
        index++;
        this.titleNode.text(index + "/" + images.length);
    },
	show :function(imageNode){
		var _self = this;
        this.isShow = true;
        //创建幻灯片节点并加载到页面
        this.isCreate || this.createNode();
        this.currentImageNode = imageNode;

        //更新图片
        this.update(this.currentImageNode);
        this.container.fadeIn();
	},
	hide :function(){   //掩藏幻灯片面板
        var _self = this;
		this.isShow = false;
        this.container.fadeOut(300,0);
        _self.state = "0";

	},
 	init :function(){   //初始化函数
 		var _self = this;
 		//得到data-lightbox属性的images集合
        var images = $("img");
        //将集合转化为数组
        this.images = Array.prototype.slice.call(images);
        //对每张图片进行以及点击事件的绑定
        images.each(function(index,item){
            item.onclick = function () {
                _self.show(_self.images[index]);
            }
        })

 		$(document).on('keyup',function(e){
 			if(_self.isCreate){
                switch(e.keyCode){
                    case 37 :
                        _self.toPrev();
                        break;
                    case 39 :
                        _self.toNext();
                        break;
                }
            }
 		});
 		$(window).on('resize',function(){
 			_self.isCreate && _self.isShow && _self.update(_self.currentImageNode);
 		});
    }
}
lb = new Lightbox();