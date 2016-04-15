/**
 * Created by wangkun12 on 2016/4/15.
 */

var elem = {};


//高度自适应
function mainHeight(){
    var height = window.innerHeight;
    var showHeight = height - 180;
    $('.draw-main').css('min-height' , showHeight+'px');
    $('.draw-data-body').height($('.draw-main').height()- 50);
};


//获取页面元素
function getElem(){
    elem.change = $('.draw-change');
    elem.add = $('.draw-add');
    elem.look = $('.draw-look');
    elem.save = $('.draw-save');
};
//绑定事件
function bindEvent(){
    elem.add.click(function(){
        $('.draw-cav').addClass('cavMove');
        $('.draw-data').css('left','0');
    });
    elem.change.click(function(){
        $('.draw-cav').removeClass('cavMove');
        $('.draw-data').css('left','-600px');
    })
};
//初始化页面
function pageLoad(){
    mainHeight();
};


$(function(){
    //获取页面元素
    getElem();
    //绑定事件
    bindEvent();
    //初始化
    pageLoad();
});


//当浏览器窗口大小改变时，设置显示内容的高度
window.onresize=function(){
    mainHeight();
}