
function getObj(id){return document.getElementById(id);}

window.onload=function(){
    getElementCount("container","box");
	getObj("toTop").onclick=function(){
	  window.animate({javascript:scrollTo(0,0)}, 300);
	}

	getObj("more").onclick = function () {
        var container=getObj("container");
        for(var i=1;i<21;i++){

            var newImage=document.createElement("img");
            newImage.src="img/img"+i+".jpg";

            var newBox=document.createElement("div");
            newBox.className="box";
            newBox.appendChild(newImage);

            getObj("container").appendChild(newBox);

        }

        getElementCount("container","box");
		lb.init();
    }
}

window.onscroll=function(){

    if( checkFlag()){
        getObj("more").style.display="block";


    }else{
        getObj("more").style.display="none";
    }

}

window.onresize=function () {
    getElementCount("container","box");
}

//检查是否到达底部
function checkFlag(){
    var containerObj=getObj("container");
	var elementArray=getChildElement(containerObj,"box");
	var lastElementHeight=elementArray[elementArray.length-1].offsetTop;
	//var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var pageScrollTop=document.documentElement.clientHeight||document.body.clientHeight;
    var scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
    var viewHeight =Math.min(document.documentElement.scrollHeight,document.documentElement.clientHeight);
    var docHeight=Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight);

	console.log("lastElementHeight:"+lastElementHeight)
	console.log("scrollTop:"+scrollTop)
	console.log("pageScrollTop:"+pageScrollTop)
    if((scrollTop-docHeight+viewHeight)>=-1){
	      return true;
	}
	
	if(scrollTop>100){
	  getObj("toTop").style.display="block";	
	}else{
	  getObj("toTop").style.display="none";
	}
}

//摆放瀑布流，选择最小高度的一列放入，一次执行
function getElementCount(containerID,contentClassName){
	var header = getObj(header);
	var containerObj=getObj(containerID);
	var contentArray=getChildElement(containerObj,contentClassName);
	var elementWidth=contentArray[0].offsetWidth;
	var containerWidth=containerObj.offsetWidth;
	var elementCountEveryRow=5;
	var elementHeightArray=[];
	for(var i=0;i<contentArray.length;i++){
		if(i<elementCountEveryRow){
			contentArray[i].style.position="absolute";
			contentArray[i].style.top = "90px";
			contentArray[i].style.left = ((elementWidth+10)*i) + "px";
			elementHeightArray[i]=contentArray[i].offsetHeight + 90;
		}else{
	       var minHeight=Math.min.apply(null,elementHeightArray);
		   var minHeightElementIndex=getElementMinHeigthIndex(elementHeightArray,minHeight);
		   contentArray[i].style.position="absolute";
		   contentArray[i].style.top=(minHeight+5)+"px";
		   contentArray[i].style.left=contentArray[minHeightElementIndex].offsetLeft+"px";
		   elementHeightArray[minHeightElementIndex]=elementHeightArray[minHeightElementIndex]+contentArray[i].offsetHeight + 5;
		}
	}
}

function getElementMinHeigthIndex(elementHeightArray,minHeight){
	for(var i in elementHeightArray){
	  if(elementHeightArray[i]==minHeight){
		 return i;  
	  }	
	}
}

function getChildElement(containerObj,contentClassName){
    var contentArray=[];
	var allContent =containerObj.getElementsByTagName("div");
	//遍历所有元素
	for(var i=0;i<allContent.length;i++){
	   if(allContent[i].className==contentClassName){
		   contentArray.push(allContent[i]);
	   }	
	}
	return contentArray;
}