$(function () {
    // 数据健康度
    let dataHealth = echarts.init(document.getElementById('data-health'));
    $.get('./../data/dataHealth.json', function (res){
        let finished = res.dataHealth.finished;
        let unFinished = res.dataHealth.unfinished;

        let dataHealthOption = {
            title: {
                text: '达标率',
                x: 'center',
                y: '50%',
                textStyle: {
                    fontWeight: "normal",
                    color: "#6087a6",
                    fontSize: 14
                }
            },
            // tooltip: {
            //     show: false,
            // },
            // toolbox: {
            //     show: false
            // },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                bottom: '5%',
                left: 'center',
                textStyle: { //图例文字的样式
                    color: '#989a99',
                    fontSize: 10
                },
                icon: 'rect', // 图例形状
                itemWidth: 10, // 图例图形宽度
                itemHeight: 10,
            },
            series: [{
                name: "",
                type: "pie",
                clockWise: false,
                radius: ['50%', '70%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        shadowBlur: 40,
                        shadowColor: "rgba(40, 40, 40, 0.5)"
                    }
                },
                hoverAnimation: false,
                center: ["50%", "45%"],
                data: [{
                        value: unFinished, // 未达标
                        name: "未达标",
                        itemStyle: {
                            normal: {
                                color: "#162c44",
                                //  shadowColor: "#b697cd",
                                //  shadowBlur: 12
                            }
                        }
                    },
                    {
                        value: finished, // 达标
                        name: "达标率",
                        label: {
                            normal: {
                                formatter: "{d}%",
                                position: "center",
                                show: true,
                                textStyle: {
                                    fontSize: "22",
                                    fontWeight: "bold",
                                    color: "#6087a6"
                                },
                                padding: [30, 0, 0, 0]
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#20939a", // 完成的圆环的颜色
                                //  label: {
                                //      show: false
                                //  },
                                //  labelLine: {
                                //      show: false
                                //  }
                            },
                            //  emphasis: {
                            //      color: "#20939a" // 完成的圆环的颜色
                            //  }
                        }
                    }
                ]
            }]
        };
        dataHealth.setOption(dataHealthOption);
    });

    // 变压器数据异常
    let transformerAbnormalData = echarts.init(document.getElementById('transformer-abnormal-data'));
    $.get('./../data/transformerAbnormalDataOption.json', function (res){
        let transformerAbnormalDataOption = {
            title: {
                // text: '同名数量统计',
                // subtext: '纯属虚构',
                // left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                icon: 'rect', // 图例形状
                itemWidth: 10, // 图例图形宽度
                itemHeight: 10,
                pageIconSize: 8, // 翻页按钮大小
                right: 0,
                top: 15,
                bottom: 20,
                // data: data.legendData,
                // selected: data.selected,
                textStyle: { //图例文字的样式
                    color: '#999999',
                    fontSize: 10
                },
            },
            color : [ '#20939a', '#2bb2ae', '#f98963', '#162c44', '#e04555', '#96ed7c', '#8088ea', '#3ba372', '#c180e6', '#1395eb', '#feda52'],
            series: [{
                name: '城市',
                type: 'pie',
                radius: '60%',
                center: ['40%', '50%'],
                data: res,
                itemStyle: {
                    normal: {
                        label: {
                            show: true, //隐藏或显示标示文字
                            // position:'inner', //标签的位置
                            padding: [0, -20],
                            textStyle: {
                                fontWeight: 300,
                                fontSize: 10, //文字的字体大小
                                color: '#fff'
                            },
                        },
                        labelLine: {
                            show: false //隐藏标示线
                        }
                    }
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        transformerAbnormalData.setOption(transformerAbnormalDataOption);
    });


    // 地图
    //执行一个laydate实例
    laydate.render({
        elem: '#calendarModel', // 指定元素
        value: '2020-12-31', // 默认日期

        ready: function(date){ // 控件初始打开的回调
            // console.log(date); //得到初始的日期时间对象
        },
        change: function(value, date, endDate){ // 日期时间被切换后的回调
            // console.log(value); // 得到日期生成的值
            // console.log(date); // 得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            // console.log(endDate); // 得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
        },
        done: function(value, date, endDate){ // 控件选择完毕后的回调
            // console.log(value);
            // console.log(date);
            // console.log(endDate);
        },
    });
    let mapDisplay = echarts.init(document.getElementById('map-display'));
    $.get('./../data/map.json', function (geoJson) {
        echarts.registerMap('AH', geoJson, {});
        var mapDisplayOption = {
            tooltip: {
                trigger: 'item',
                // formatter: '{b}<br/>{c} %', // 提示标签格式
                // backgroundColor:"#4169E1",//提示标签背景颜色
            },
            visualMap: {
                type: 'continuous', // 定义为连续型 visualMap
                min: 2000,
                max: 6000,
                // range:[15, 40], // 指定手柄对应数值的位置。range 应在 min max 范围内
                // text: ['High', 'Low'], // 两端文字            
                left: 'center',
                orient: 'horizontal', // 组件排列方向
                realtime: false,
                calculable: false, // 是否显示拖拽用的手柄（手柄能拖拽调整选中范围）
                // realtime: false, // 拖拽时，是否实时更新
                align: 'auto',
                hoverLink: true, // 鼠标悬浮到 visualMap 组件上时，鼠标位置对应的数值 在 图表中对应的图形元素，会高亮
                itemWidth: '12%',
                itemHeight: '200%',
                bottom: 20,
                inRange: {
                    color: ['#3bb4ab', '#529277', '#f49102', '#ff0d00'],
                    // symbolSize: [30, 100]
                },
                textStyle: {
                    color: '#fff',
                },
                // formatter: function (value) {                 //标签的格式化工具。
                //     return 'aaaa' + value;                    // 范围标签显示内容。
                // }
            },
            series: [{
                // zoom: 0.9,
                name: '安徽省',
                type: 'map',
                mapType: 'AH',
                // mapLocation: {
                //     x : 'center',
                //     y : 'center',
                //     // width: '50%'   // 自适应
                //     // height   // 自适应
                // },
                top: 'center',
                aspectScale: 0.85, //地图长度比
                label: {
                    normal: {
                        show: false,
                        textStyle: {
                            color: '#000'
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            color: '#333'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        // borderWidth: .5, //区域边框宽度
                        // borderColor: '#FFFFFF', //区域边框颜色
                        // areaColor: "#DCDCDC", //区域颜色

                    },
                    emphasis: {
                        // borderWidth: .10,
                        // borderColor: '#4b0082',
                        areaColor: "#20939a",
                    }
                },
                data: [{
                        value: 1340,
                        name: '合肥市',
                    },
                    {
                        value: 310,
                        name: '安庆市',
                    },
                    {
                        value: 234,
                        name: '滁州市',
                    },
                    {
                        value: 735,
                        name: '黄山市',
                    },
                    {
                        value: 238,
                        name: '蚌埠市',
                    },
                    {
                        value: 348,
                        name: '六安市',
                    },
                    {
                        value: 148,
                        name: '马鞍山市',
                    },
                    {
                        value: 348,
                        name: '芜湖市',
                    },
                    {
                        value: 248,
                        name: '铜陵市',
                    },
                    {
                        value: 148,
                        name: '宣城市',
                    },
                    {
                        value: 248,
                        name: '池州市',
                    },
                    {
                        value: 248,
                        name: '淮南市',
                    },
                    {
                        value: 248,
                        name: '阜阳市',
                    },
                    {
                        value: 1248,
                        name: '亳州市',
                    },
                    {
                        value: 248,
                        name: '宿州市',
                    },
                    {
                        value: 248,
                        name: '淮北市',
                    },
                ],
            }]
        };
        mapDisplay.setOption(mapDisplayOption);
    });

    // 全省指标情况
    let provincialIndicators = echarts.init(document.getElementById('provincial-indicators'));
    $.get('./../data/provincialIndicators.json', function (res) {
        let calculatedRate = res.calculatedRate;
        let complianceRate = res.complianceRate;
        let provincialIndicatorsOption = {
            // title : {  //标题组件
            //     show: false,
            //     text: '可算率',
            //     textStyle:{
            //         color: '#90a5ba',  //文字颜色
            // 　　　　 fontSize: 16, //字体大小
            //     },
            //     x:'center',
            //     // bottom: 40,
            //     top: 30
            // },
            series: [
            {
                type: 'gauge',
                center: ["25%", "60%"], // 仪表位置
                startAngle: 180,
                endAngle: 0,
                min: 0,
                max: 100,
                name: '可算率',
                title: {
                    offsetCenter: [0, '40%'], // x, y，单位px
                    fontSize: 12,
                    color: '#90a5ba',
                },
                radius: '65',
                progress: {
                    show: true,
                    width: 25
                },
                itemStyle: {
                    color: '#20929a',
                },
                pointer: {
                    show: false,
                },
                axisLine: { // 仪表盘轴线相关配置
                    show: true, 
                    lineStyle: {
                        width: 25,
                        color: [[1, '#162c44']],
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false,
                    length: 15,
                    lineStyle: {
                        width: 0,
                        color: '#fff'
                    }
                },
                axisLabel: {
                    show: false,
                    distance: -10,
                    formatter: function(value) {
                        if (value === 0 || value === 100) {
                            return value
                        }
                        return ''
                    },
                    paddingTop: 'px',
                    // lineHeight: 100,
                    fontSize: 12,
                    fontWeight: 'bolder',
                    color: '#90a5ba'
                },
                anchor: {
                    show: false,
                    showAbove: true,
                    size: 25,
                    itemStyle: {
                        borderWidth: 10
                    }
                },
                detail: {
                    show: true,
                    valueAnimation: true,
                    fontSize: 14,
                    offsetCenter: [0, '70%'],
                    // formatter: function (value) {           
                    //     return value.toFixed(1) + '%';  
                    // },
                    formatter: [
                        '{value}%',
                        '{a|得分：}' + calculatedRate.point + '{b| 分}',
                    ].join('\n'),
                    rich: {
                        a: {
                            fontSize: 12,
                            color: '#90a5ba',
                            lineHeight: 60
                        },
                        b: {
                            fontSize: 12,
                            color: '#90a5ba',
                        }
                    },
                    // offsetCenter: [0, '-20%'],
                    color: "#90a5ba",
                    fontWeight: 'bolder',
                },
                data: [
                    {
                        name: '可算率',
                        value: calculatedRate.value,
                        title: {
                            offsetCenter: ['0%', '-130%']
                        },
                        detail: {
                            offsetCenter: ['0%', '25%']
                        }
                    },
                ]
            },
            {
                type: 'gauge',
                center: ["75%", "60%"], // 仪表位置
                startAngle: 180,
                endAngle: 0,
                min: 0,
                max: 100,
                name: '达标率',
                title: {
                    offsetCenter: [0, '40%'], // x, y，单位px
                    fontSize: 12,
                    color: '#90a5ba',
                },
                radius: '65',
                progress: {
                    show: true,
                    width: 25
                },
                itemStyle: {
                    color: '#009865',
                },
                pointer: {
                    show: false,
                },
                axisLine: { // 仪表盘轴线相关配置
                    show: true, 
                    lineStyle: {
                        width: 25,
                        color: [[1, '#162c44']],
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false,
                    length: 15,
                    lineStyle: {
                        width: 0,
                        color: '#fff'
                    }
                },
                axisLabel: {
                    show: false,
                    distance: -10,
                    formatter: function(value) {
                        if (value === 0 || value === 100) {
                            return value
                        }
                        return ''
                    },
                    paddingTop: 'px',
                    // lineHeight: 100,
                    fontSize: 12,
                    fontWeight: 'bolder',
                    color: '#90a5ba'
                },
                anchor: {
                    show: false,
                    showAbove: true,
                    size: 25,
                    itemStyle: {
                        borderWidth: 10
                    }
                },
                detail: {
                    show: true,
                    valueAnimation: true,
                    fontSize: 14,
                    offsetCenter: [0, '70%'],
                    // formatter: function (value) {           
                    //     return value.toFixed(1) + '%';  
                    // },
                    formatter: [
                        '{value}%',
                        '{a|得分：}' + complianceRate.point + '{b| 分}',
                    ].join('\n'),
                    rich: {
                        a: {
                            fontSize: 12,
                            color: '#90a5ba',
                            lineHeight: 60
                        },
                        b: {
                            fontSize: 12,
                            color: '#90a5ba',
                        }
                    },
                    // offsetCenter: [0, '-20%'],
                    color: "#90a5ba",
                    fontWeight: 'bolder',
                },
                data: [
                    {
                        name: '达标率',
                        value: complianceRate.value,
                        title: {
                            offsetCenter: ['0%', '-130%'],
                        },
                        detail: {
                            offsetCenter: ['0%', '25%']
                        }
                    },
                ]
            },
            ]
        };
        provincialIndicators.setOption(provincialIndicatorsOption);
    });

    // 数据匹配情况
    $.get('./../data/dataMatching.json', function (res) {
        let datTable = document.getElementById('data-matching-table');
        // 变压器 总数量
        datTable.tBodies[0].rows[0].cells[1].innerHTML = res.transformerTotal;
        // 变压器 未匹配
        datTable.tBodies[0].rows[0].cells[2].innerHTML = res.transformerNotMatched;
        // 变压器 匹配错误
        datTable.tBodies[0].rows[0].cells[3].innerHTML = res.transformerMismatch;

        // 输电线路 总数量
        datTable.tBodies[0].rows[1].cells[1].innerHTML = res.transmissionTotal;
        // 输电线路 未匹配
        datTable.tBodies[0].rows[1].cells[2].innerHTML = res.transmissionNotMatched;
        // 输电线路 匹配错误
        datTable.tBodies[0].rows[1].cells[3].innerHTML = res.transmissionNotMismatch;

        // 变电站 总数量
        datTable.tBodies[0].rows[2].cells[1].innerHTML = res.stationTotal;
        // 变电站 未匹配
        datTable.tBodies[0].rows[2].cells[2].innerHTML = res.stationNotMatched;
        // 变电站 匹配错误
        datTable.tBodies[0].rows[2].cells[3].innerHTML = res.stationNotMismatch;
    });
    
    // 输电线路数据异常
    let transmissionLineAbnormalData = echarts.init(document.getElementById('transmission-line-abnormal-data'));
    $.get('./../data/transmissionLineAbnormalData.json', function (res){
        let transmissionLineAbnormalDataOption = {
            title: {
                // text: '同名数量统计',
                // subtext: '纯属虚构',
                // left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                icon: 'rect', // 图例形状
                itemWidth: 10, // 图例图形宽度
                itemHeight: 10,
                pageIconSize: 8, // 翻页按钮大小
                right: 0,
                top: 15,
                bottom: 20,
                // data: data.legendData,
                // selected: data.selected,
                textStyle: { //图例文字的样式
                    color: '#999999',
                    fontSize: 10
                },
            },
            color : [ '#20939a', '#2bb2ae', '#f98963', '#162c44', '#e04555', '#96ed7c', '#8088ea', '#3ba372', '#c180e6', '#1395eb', '#feda52'],
            series: [{
                name: '城市',
                type: 'pie',
                radius: '60%',
                center: ['40%', '50%'],
                data: res,
                itemStyle: {
                    normal: {
                        label: {
                            show: true, //隐藏或显示标示文字
                            // position:'inner', //标签的位置
                            padding: [0, -20],
                            textStyle: {
                                fontWeight: 300,
                                fontSize: 10, //文字的字体大小
                                color: '#fff'
                            },
                        },
                        labelLine: {
                            show: false //隐藏标示线
                        }
                    }
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        transmissionLineAbnormalData.setOption(transmissionLineAbnormalDataOption);
    });

    // 各单位可算率及达标率
    let allUnits = echarts.init(document.getElementById('all-units'));
    $.get('./../data/allUnits.json', function (res){
        let allUnitsOption = {
            grid: {
                left: '5%',
                right: '2%',
                top: '12%',
                bottom: '25%'
            },
            tooltip: {
                // trigger: 'axis',
                // formatter: function(params) {
                //     return params[0].value + '%';
                // }
            },
            legend: {
                itemHeight: 10,
                itemWidth: 10,
                bottom: '5%',
                textStyle: {  // 图列内容样式
                    fontSize: 12,
                    color: '#90a5ba',  // 字体颜色
                    // backgroundColor: 'black'  // 字体背景色
                },
                tooltip: {  // 图列提示框，默认不显示
                    show: false,
                    color: 'red'  
                },
                data: [   // 图列内容
                    {
                    name: '可算率',
                    icon: 'rect',
                    textStyle: {
                        color: '#90a5ba',  // 单独设置某一个图列的颜色
                    }
                    },
                    {
                    name: '达标率',
                    icon: 'rect',
                    textStyle: {
                        color: '#90a5ba',  // 单独设置某一个图列的颜色
                        // backgroundColor: '#fff' // 单独设置某一个图列的字体背景色
                    }
                    },
                ]
            },
            xAxis: {
                type: 'category',
                show: true,
                // nameTextStyle: {   // 坐标轴名称样式
                //     color: '#08244b',
                //     padding: [5, 0, 0, -5]
                // },
                axisLine: {       // 坐标轴 轴线
                    show: false,  // 是否显示
                    // ------   线 ---------
                    lineStyle: {
                        color: '#90a5ba',
                        width: 1,
                        type: 'solid'
                    }
                },
                axisTick: {    // 坐标轴 刻度
                    show: false,  // 是否显示
                },

                data: res.date
            },
            yAxis: {
                axisLine: {       // 坐标轴 轴线
                    show: false,  // 是否显示
                    // ------   线 ---------
                    lineStyle: {
                        color: '#90a5ba',
                        width: 1,
                        type: 'solid'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle:{
                    color: '#08244b',
                    width: 1,
                    type: 'solid'
                }
            　　},
            },
            color: res.color,
            series: [
                {  
                    barWidth: '32%',
                    //系列名称，如果启用legend，该值将被legend.data索引相关  
                    name: '可算率',  
                    //图表类型，必要参数！如为空或不支持类型，则该系列数据不被显示。  
                    type: 'bar',  
                    //系列中的数据内容数组，折线图以及柱状图时数组长度等于所使用类目轴文本标签数组axis.data的长度，并且他们间是一一对应的。数组项通常为数值  
                    barGap: '0%',//柱图间距
                    data: res.calculatedRate, 
                    label: {
                        show: true,
                        position: 'insideTop',
                        formatter: '{c}%',
                    },
                },
                {  
                    barWidth: '32%',
                    name: '达标率',  
                    barGap: '0%', // 柱图间距
                    type: 'bar',  
                    data: res.complianceRate,
                    label: {
                        show: true,
                        position: 'insideTop',
                        formatter: '{c}%',
                    },
                },
            ]
        };
        allUnits.setOption(allUnitsOption);
    });

    //根据窗口的大小变动图表
    window.onresize = function(){
        dataHealth.resize();
        transformerAbnormalData.resize();
        mapDisplay.resize();
        provincialIndicators.resize();
        transmissionLineAbnormalData.resize();
        allUnits.resize();
    }
});