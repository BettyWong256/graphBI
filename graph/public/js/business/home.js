/**
 * Created by wangkun12 on 2016/4/11.
 */

window.onload=function(){
    changeDivHeight();
}
//当浏览器窗口大小改变时，设置显示内容的高度
window.onresize=function(){
    changeDivHeight();
}
function changeDivHeight(){
    var width = window.innerWidth;
    var showHeight = width/1366*500;
    $('.home-top').css('height' , showHeight+'px');
}
