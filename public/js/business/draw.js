/**
 * Created by wangkun12 on 2016/4/15.
 */

var elem = {};
var cavObj = $('.draw-cav');
var editObj = {};


//高度自适应
function mainHeight(){
    var height = window.innerHeight;
    var showHeight = height - 180;
    $('.draw-main').css('min-height' , showHeight+'px');
    $('.draw-data-body').height($('.draw-main').height()- 50);
};

//表格可编辑
function tableEdit(obj){
    tableSave();
    var value = obj.text();
    var edit = '<textarea id="draw-test-edit" value="';
    edit += value;
    edit += '">';
    edit += value +'</textarea>';
    obj.html(edit);
    $('#draw-test-edit').focus();
};
function tableSave(){
    var $this = $('#draw-test-edit');
    var text = $this.val();
    $this.parent().html(text);
    $this.remove();
};

//获取页面元素
function getElem(){
    elem.editth = $('.table').find('th');
    elem.edittd = $('.table').find('td');    //数据编辑表格
    elem.change = $('.draw-change');         //运行
    elem.look = $('.draw-look');             //预览
    elem.save = $('.draw-save');             //保存
    elem.editData = $('.draw-edit-data');    //数据编辑
    elem.editSet = $('.draw-edit-set');      //设置参数
    elem.edit = $('.draw-edit');             //文本编辑
    elem.saveWord = $('.save-word');         //弹框保存文本
    elem.delete = $('.draw-edit-delete');    //删除
    elem.addH = $('.add-h');
    elem.addP = $('.add-p');
    elem.addC = $('.add-c');


};
//绑定事件
function bindEvent(){
    //运行
    elem.change.click(function(){
        $('.active').removeClass('active');
        $('.draw-cav').removeClass('cavMove');
        $('.draw-data').css('left','-600px');
    });
    //可编辑表格
    elem.editth.bind('click',function(){
        var obj = $(this);
        tableEdit(obj);
    });
    elem.edittd.bind('click',function(){
        var obj = $(this);
        tableEdit(obj);
    });
    //添加标题
    elem.addH.bind('click',function(){
        cavObj.append('<div class="editable mb20"><span class="draw-edit-tab none"><a href="javascript:;" class="mr5 draw-edit"  data-toggle="modal" data-target="#myModal">编辑</a><a href="javascript:;" class="mr5 draw-edit-delete">删除</a></span><h3 class="new-word">请输入标题</h3></div>');
    });
    //添加段落
    elem.addP.bind('click',function(){
        cavObj.append('<div class="editable mb20"><span class="draw-edit-tab none"><a href="javascript:;" class="mr5 draw-edit" data-toggle="modal" data-target="#myModal">编辑</a><a href="javascript:;" class="mr5 draw-edit-delete">删除</a></span><p class="new-word">请输入文本</p></div>');
    });
    //添加图表
    elem.addC.bind('click',function(){
        cavObj.append('<div class="editable mb20"><span class="draw-edit-tab none"><a href="javascript:;" class="mr5 draw-edit-data">编辑数据</a><a href="javascript:;" class="mr5 draw-edit-set">参数设置</a><a href="javascript:;" class="mr5 draw-edit-delete">删除</a></span><div style="width:740px;">123</div></div>');
    });
    //保存文案
    elem.saveWord.bind('click',function(){
        var value = $('.new-text').val();
        editObj.text(value);

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
    //
    newT();
});


//当浏览器窗口大小改变时，设置显示内容的高度
window.onresize=function(){
    mainHeight();
};
window.onscroll = function () {
   tableSave();
};
$('.draw-data-body').scroll(function(){
    tableSave();
});

function newT(){
    $(document).on("mousemove", ".editable", function() {
        $(this).css('background','rgba(36,36,36,0.2)');
        $(this).find('.draw-edit-tab').show();
    });
    $(document).on("mouseout", ".editable", function() {
        $(this).css('background','none');
        $(this).parent().find('.draw-edit-tab').hide();
    });

//编辑数据
    $(document).on("click", '.draw-edit-data', function() {
        $('.active').removeClass('active').removeClass('in');
        $('.draw-cav').addClass('cavMove');
        $('.draw-data').css('left','0');
        $('.myData').addClass('active').addClass('in');
        $('#myData').addClass('active').addClass('in');
    });
//参数设置
    $(document).on("click", '.draw-edit-set', function() {
        $('.active').removeClass('active').removeClass('in');
        $('.draw-cav').addClass('cavMove');
        $('.draw-data').css('left','0');
        $('.mySet').addClass('active').addClass('in');
        $('#mySet').addClass('active').addClass('in');
    });
//删除
    $(document).on("click", ".draw-edit-delete", function() {
        $(this).parents('.editable').remove();
    });
//编辑
    $(document).on("click", ".draw-edit", function() {
        editObj = $(this).parents('.editable').find('.new-word');
        $('.new-text').val(editObj.text());
    });
}


