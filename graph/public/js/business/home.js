/**
 * Created by wangkun12 on 2016/4/11.
 */

window.onload=function(){
    changeDivHeight();
    changeBtnBottom();
}
//当浏览器窗口大小改变时，设置显示内容的高度
window.onresize=function(){
    changeDivHeight();
    changeBtnBottom();
}


//板块1高度自适应
function changeDivHeight(){
    var width = window.innerWidth;
    var showHeight = width/1366*500;
    $('.home-top').css('height' , showHeight+'px');
}
//start位置
function changeBtnBottom(){
    var height = $('.home-top').height();
    var showBottom = (height - 450)/3*2;
    $('.btn-diy').css('bottom' , showBottom+'px');
}

//home-exp宽度
function changeExpWidth(){
    var height = $('.home-top').height();
    var showBottom = (height - 450)/3*2;
    $('.btn-diy').css('bottom' , showBottom+'px');
}