/**
 * Created by wangkun12 on 2016/4/19.
 */
define( function ( require, exports ) {
    var red = require('/js/plugins/echarts/theme/red.js');
    var blue = require('/js/plugins/echarts/theme/blue.js');
    var dark = require('/js/plugins/echarts/theme/dark.js');
    var helianthus = require('/js/plugins/echarts/theme/helianthus.js');
    var infographic = require('/js/plugins/echarts/theme/infographic.js');
    var roma = require('/js/plugins/echarts/theme/roma.js');
    var shine = require('/js/plugins/echarts/theme/shine.js');
    //主题文件匹配
    function matchTheme(str){
        switch(str){
            case 'red': return red;break;
            case 'blue': return blue;break;
            case 'dark': return dark;break;
            case 'helianthus': return helianthus;break;
            case 'infographic': return infographic;break;
            case 'roma': return roma;break;
            case 'shine': return shine;break;
            default: return null;
        }
    }
    //主题背景色设置
    function bgcolor(str){
        $('.draw-cav').css('background','#fff');
        $('.draw-cav').css('color','#000');
        if(str == 'dark'){
            $('.draw-cav').css('background-color','rgb(27, 27, 27)');
            $('.draw-cav').css('color','#fff');
        }else if(str =='helianthus'){
            $('.draw-cav').css('background-color','rgb(242, 242, 230)');
        }
    }




    //绘制线形图
    function graphLine(state,id,param){
        var data = {
            theme: 'default',
            text: '未来一周气温变化',
            size: 12,
            color: "#000000",
            subtext: '纯属虚构',
            toolShow: true,
            legendShow: true,
            legendOrient: 'horizontal',
            legendX:'center',
            legendY:'top',
            minY: 'normal',
            maxY: 'normal',
            rotateX: 0,
            smooth: false,
            legendData: ['最高气温','最低气温'],
            xData: ['周一','周二','周三','周四','周五','周六','周日'],
            yData:[ {
                name: '最高气温',
                arr: [11, 11, 15, 13, 12, 13, 10]
            }, {
                name: '最低气温',
                arr: [1, -2, 2, 5, 3, 2, 0]
            } ]

        };
        if(param){
            for (var key in param) {
                data[key] = param[key];
            }
        }
        var myChartLine = echarts.init(document.getElementById(id),matchTheme(data.theme));
        var mySeries = [];
        for ( var i = 0; i < data.yData.length; i++ ) {
            mySeries.push( {
                name: data.yData[ i ].name,
                type: 'line',
                smooth: data.smooth,
                data: data.yData[ i ].arr
            } );
        };
        var option = {
            title : {
                text: data.text,
                subtext: data.subtext,
                textStyle:{
                    fontSize: data.size,
                    color: data.color,
                }
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                show: data.legendShow,
                orient: data.legendOrient,
                data: data.legendData,
                x: data.legendX,
                y:data.legendY
            },
            toolbox: {
                show : data.toolShow,
                feature : {
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
                    boundaryGap : false,
                    axisLabel:{
                        rotate: data.rotateX
                    },
                    data : data.xData
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    min: data.minY,
                    max: data.maxY
                }
            ],
            series : mySeries
        };
        myChartLine.setOption(option);
        if(!param){
            dataPool.push({id:id,data:data,state:state});
        }

    };
    //绘制面积堆积图
    function graphLines(id,param){
        if(param){
            for (var key in param) {
                data[key] = param[key];
            }
        }
        var myChartLine = echarts.init(document.getElementById(id),matchTheme(data.theme));
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
        myChartLine.setOption(option);
    };
    //绘制柱形图
    function graphBar(id,param){
        var data = {};
        if(param){
            for (var key in param) {
                data[key] = param[key];
            }
        }
        var myChartLine = echarts.init(document.getElementById(id),matchTheme(data.theme));
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
        myChartLine.setOption(option);
    };
    //绘制扇形图
    function graphPie(id,param){
        var data = {};
        if(param){
            for (var key in param) {
                data[key] = param[key];
            }
        }
        var myChartLine = echarts.init(document.getElementById(id),matchTheme(data.theme));
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
        myChartLine.setOption(option);
    };
    //绘制雷达图
    function graphGraph(id,param){
        var data = {};
        if(param){
            for (var key in param) {
                data[key] = param[key];
            }
        }
        var myChartLine = echarts.init(document.getElementById(id),matchTheme(data.theme));
        var option = {
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
        myChartLine.setOption(option);
    };

    /**
     * 图表初始化
     * @param state 类型 1-折线，2-堆积，3-柱形，4-扇形，5-雷达
     * @param id id
     * @param param 数据对象
     */

    exports.init = function(state,id,param){
        switch (state){
            case '1': graphLine(state,id,param);break;
            case '2': graphLines(state,id,param);break;
            case '3': graphBar(state,id,param);break;
            case '4': graphPie(state,id,param);break;
            case '5': graphGraph(state,id,param);break;
            default : return false;
        }
        if(param){
            bgcolor(param.theme);
        }
    };


    /**当前数据获取
     * 根据全局变量dataPool填充编辑框 --填充完毕
     * @param id 编辑内容id
     * editParam.data 当前编辑图的数据对象
     */
    exports.getJson = function(id) {
        var editParam = {};
        for(var i=0;i< dataPool.length;i++){
            if(dataPool[i].id == id){
                for(var key in dataPool[i]){
                    editParam[key] = dataPool[i][key];
                }
            }
        };
        $('input[type="radio"]').removeAttr('checked');
        $('#'+editParam.data.theme+'-theme').attr('checked','checked');
        $('#title').val(editParam.data.text);
        $('#title-size').val(editParam.data.size);
        $('#title-color').val(editParam.data.color);
        $('#subtitle').val(editParam.data.subtext);
        if(editParam.data.toolShow){$('#show-tool').attr('checked','checked');}
        else{$('#no-tool').attr('checked','checked');}
        if(editParam.data.legendShow){$('#show-legend').attr('checked','checked');}
        else{$('#no-legend').attr('checked','checked');}
        $('#'+ editParam.data.legendOrient +'-orient').attr('checked','checked');
        $('#'+ editParam.data.legendX +'-legend').attr('checked','checked');
        $('#'+ editParam.data.legendY +'-legend').attr('checked','checked');
        if( editParam.data.minY != 'normal'){$('#min-y').val(editParam.data.minY );}
        if( editParam.data.minX != 'normal'){$('#min-x').val(editParam.data.minX );}
        $('#rotate-x').val(editParam.data.rotateX);
        if(editParam.data.smooth){$('#true-smooth').attr('checked','checked');}
        else{$('#false-smooth').attr('checked','checked');}


        //x轴
        for(var i=0;i<editParam.data.xData.length;i++){
            $('#myData').find('tr').eq(0).find('th').eq(i+1).text(editParam.data.xData[i]);
        }
        //y轴
        for(var j=0;j<editParam.data.legendData.length;j++){
            $('#myData').find('tr').eq(j+1).find('th').text(editParam.data.legendData[j]);
            for(var z=0;z<editParam.data.yData.length;z++){
                if(editParam.data.legendData[j] == editParam.data.yData[z].name){
                    for(var m=0;m<editParam.data.yData[z].arr.length;m++){
                        $('#myData').find('tr').eq(j+1).find('td').eq(m).text(editParam.data.yData[z].arr[m]);
                    }
                }
            }
        }


    };

    /**提取更改数据
     * 根据编辑框修改全局变量dataPool --返回
     * @param id 编辑内容id
     */
    exports.postJson = function(id) {
        for(var i=0;i< dataPool.length;i++){
            if(dataPool[i].id == id){
                dataPool[i].data.theme = $('input[name="theme"]:checked').val();
                dataPool[i].data.text = $('#title').val();
                dataPool[i].data.size = $('#title-size').val();
                dataPool[i].data.color = $('#title-color').val();
                dataPool[i].data.subtext = $('#subtitle').val();
                dataPool[i].data.toolShow = $('input[name="toolbox"]:checked').val() == 'true'? true : false;
                dataPool[i].data.legendShow = $('input[name="legend"]:checked').val() == 'true'? true : false;
                dataPool[i].data.legendOrient = $('input[name="orient"]:checked').val();
                dataPool[i].data.legendX = $('input[name="legend-x"]:checked').val();
                dataPool[i].data.legendY = $('input[name="legend-y"]:checked').val();
                if($('#min-y').val()) dataPool[i].data.minY = $('#min-y').val();
                if($('#max-y').val()) dataPool[i].data.maxY = $('#max-y').val();
                dataPool[i].data.rotateX = $('#rotate-x').val();
                dataPool[i].data.smooth = $('input[name="smooth"]:checked').val() == 'true'? true : false;


                dataPool[i].data.legendData = [];
                dataPool[i].data.xData = [];
                dataPool[i].data.yData = [];
                var editIn = $('#myData').find('.table');
                var x= 1,y =1;
                while(editIn.find('tr').eq(0).find('th').eq(x).text()!=''){
                    dataPool[i].data.xData.push(editIn.find('tr').eq(0).find('th').eq(x).text());
                    x++;
                }
                while(editIn.find('tr').eq(y).find('th').text()!=''){
                    var par = {};
                    par.arr=[];
                    dataPool[i].data.legendData.push(editIn.find('tr').eq(y).find('th').text());
                    par.name = editIn.find('tr').eq(y).find('th').text();
                    for(var xy=0; xy<dataPool[i].data.xData.length; xy++){
                        par.arr.push(editIn.find('tr').eq(y).find('td').eq(xy).text())
                    }
                    dataPool[i].data.yData.push(par);
                    y++;
                }


                exports.init(dataPool[i].state,dataPool[i].id,dataPool[i].data);
                break;
            }
        };





    };
} );