/**
 * Created by wangkun12 on 2016/4/15.
 */

var elem = {};
var cavObj = $('.draw-cav');//画布
var editObj = {};
var graphID = Math.ceil(Math.random()*10);
var editId = null;

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

function addGraph(){
    cavObj.append('<div class="editable mb20"><span class="draw-edit-tab none"><a href="javascript:;" class="mr5 draw-edit-data">编辑数据</a><a href="javascript:;" class="mr5 draw-edit-set">参数设置</a><a href="javascript:;" class="mr5 draw-edit-delete">删除</a></span><div style="width:740px;height: 300px;" class="new-graph" id="graph'+ graphID +'"></div></div>');
    editId = $('.new-graph').eq($('.new-graph').size()-1).attr('id');
    graphID++;
}

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
    //添加图表
    elem.line = $('.draw-add-line');
    elem.lines = $('.draw-add-lines');
    elem.bar = $('.draw-add-bar');
    elem.pie = $('.draw-add-pie');
    elem.graph = $('.draw-add-graph');


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
    //保存文案
    elem.saveWord.bind('click',function(){
        var value = $('.new-text').val();
        editObj.text(value);

    });
    elem.line.click(function(){
        addGraph();

        var myChartLine = echarts.init( document.getElementById( editId ));
        var option = {
            title: {
                text: '堆叠区域图'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'直接访问',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name:'搜索引擎',
                    type:'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {normal: {}},
                    data:[820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };
        myChartLine.setOption( option);
    });
    elem.lines.click(function(){
        addGraph();

        var myChartLine = echarts.init( document.getElementById( editId ));
        var option = {
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'line',
                    stack: '总量',
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'line',
                    stack: '总量',
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'直接访问',
                    type:'line',
                    stack: '总量',
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name:'搜索引擎',
                    type:'line',
                    stack: '总量',
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };
        myChartLine.setOption( option);
    });
    elem.bar.click(function(){
        addGraph();

        var myChartLine = echarts.init( document.getElementById( editId ));
        var option = {
            title : {
                text: '某地区蒸发量和降水量',
                subtext: '纯属虚构'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['蒸发量','降水量']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'蒸发量',
                    type:'bar',
                    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: '平均值'}
                        ]
                    }
                },
                {
                    name:'降水量',
                    type:'bar',
                    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                    markPoint : {
                        data : [
                            {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
                            {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name : '平均值'}
                        ]
                    }
                }
            ]
        };

        myChartLine.setOption( option);
    });
    elem.pie.click(function(){
        addGraph();

        var myChartLine = echarts.init( document.getElementById( editId ));
        var option = {
            title : {
                text: '某站点用户访问来源',
                subtext: '纯属虚构',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient : 'vertical',
                x : 'left',
                data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'left',
                                max: 1548
                            }
                        }
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                {
                    name:'访问来源',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ]
                }
            ]
        };

        myChartLine.setOption( option);
    });
    elem.graph.click(function(){
        addGraph();

        var myChartLine = echarts.init( document.getElementById( editId ));
        var
            option = {
                title : {
                    text: '预算 vs 开销（Budget vs spending）',
                    subtext: '纯属虚构'
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    orient : 'vertical',
                    x : 'right',
                    y : 'bottom',
                    data:['预算分配（Allocated Budget）','实际开销（Actual Spending）']
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                polar : [
                    {
                        indicator : [
                            { text: '销售（sales）', max: 6000},
                            { text: '管理（Administration）', max: 16000},
                            { text: '信息技术（Information Techology）', max: 30000},
                            { text: '客服（Customer Support）', max: 38000},
                            { text: '研发（Development）', max: 52000},
                            { text: '市场（Marketing）', max: 25000}
                        ]
                    }
                ],
                calculable : true,
                series : [
                    {
                        name: '预算 vs 开销（Budget vs spending）',
                        type: 'radar',
                        data : [
                            {
                                value : [4300, 10000, 28000, 35000, 50000, 19000],
                                name : '预算分配（Allocated Budget）'
                            },
                            {
                                value : [5000, 14000, 28000, 31000, 42000, 21000],
                                name : '实际开销（Actual Spending）'
                            }
                        ]
                    }
                ]
            };

        myChartLine.setOption( option);
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
        editId = $(this).parents('.editable').find('.new-graph').attr('id');
        $('.active').removeClass('active').removeClass('in');
        $('.draw-cav').addClass('cavMove');
        $('.draw-data').css('left','0');
        $('.myData').addClass('active').addClass('in');
        $('#myData').addClass('active').addClass('in');
    });
//参数设置
    $(document).on("click", '.draw-edit-set', function() {
        editId = $(this).parents('.editable').find('.new-graph').attr('id');
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


