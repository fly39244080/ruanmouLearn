// 引入 ECharts 主模块
import echarts from 'echarts';

//柱状
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('mainBar'));
myChart.showLoading();

setTimeout(()=>{
    myChart.hideLoading();
    // 绘制图表
    myChart.setOption({
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    });
},2000);

//数据集的形式
var myChartData = echarts.init(document.getElementById('mainDataSet'));

// var option2 = {
//     legend: {},
//     tooltip: {},
//     dataset: {
//         // 提供一份数据。
//         source: [
//             ['product', '2015', '2016', '2017'],
//             ['Matcha Latte', 43.3, 85.8, 93.7],
//             ['Milk Tea', 83.1, 73.4, 55.1],
//             ['Cheese Cocoa', 86.4, 65.2, 82.5],
//             ['Walnut Brownie', 72.4, 53.9, 39.1]
//         ]
//     },
//     // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
//     xAxis: {type: 'category'},
//     // 声明一个 Y 轴，数值轴。
//     yAxis: {},
//     // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
//     series: [
//         {type: 'bar'},
//         {type: 'bar'},
//         {type: 'bar'}
//     ]
// }

var optionDataSet= {
    backgroundColor:'#ccc',
    color: ['#786555','#686435', '#fb7293', '#E062AE'],
    legend: {},
    tooltip: {},
    dataset: {
        source: [
            ['product', '2012', '2013', '2014', '2015'],
            ['苹果', 41.1, 30.4, 65.1, 53.3],
            ['香蕉', 86.5, 92.1, 85.7, 83.1],
            ['火龙果', 24.1, 67.2, 79.5, 86.4]
        ]
    },
    xAxis: [
        {type: 'category', gridIndex: 0},
        {type: 'category', gridIndex: 1}
    ],
    yAxis: [
        {gridIndex: 0},
        {gridIndex: 1}
    ],
    grid: [
        {bottom: '55%'},
        {top: '55%'}
    ],
    // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。

    series: [
        // 这几个系列会在第一个直角坐标系中，每个系列对应到 dataset 的每一行。
        {type: 'bar', seriesLayoutBy: 'row'},
        {type: 'bar', seriesLayoutBy: 'row'},
        {type: 'bar', seriesLayoutBy: 'row'},
        // 这几个系列会在第二个直角坐标系中，每个系列对应到 dataset 的每一列。
        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1}
    ]
};
myChartData.setOption(optionDataSet);

//饼状
// mainPie
var mainPieDom = document.getElementById('mainPie');
var myChartPie = echarts.init(mainPieDom);

var optionPie1 = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'top',
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
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

var optionPie2 = {
    backgroundColor: '#2c343c',
    textStyle: {
        color: 'rgba(255, 255, 255, 0.3)'
    },
    title: {
        text: '天气情况统计',
        subtext: '虚构数据',
        left: 'center',
        top:20,
        textStyle:{
            color:'#ffffff'
        }
    },

// 字符串模板 模板变量有：
// {a}：系列名。
// {b}：数据名。
// {c}：数据值。
// {d}：百分比。

    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    
    selectedMode: 'single',
    legend: {
        orient: 'vertical',
        // top: 'middle',
        x: 'right',
        top:'center',
        bottom: 20,
        left: '0',
        data: ['视频广告', '联盟广告','邮件营销','直接访问','搜索引擎'],
        textStyle:{
            color:'#fff'
        }
    },
   
    series:[
        {
            name: '访问来源',
            type: 'pie',
            bottom: 10,
            color: ['#FFDB5C','#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3', '#9d96f5', '#8378EA', '#96BFFF'],
            avoidLabelOverlap: false,
            selectedMode: 'single',
            radius: '75%',
            // radius: ['30%', '70%'],
            center: ['50%', '55%'],
            roseType: 'angle',  // 设置 roseType 显示成南丁格尔图
            label: { 
                normal: {
                    show: true,
                    position: 'inner',  //outside,inside,center,inner
                    textStyle: {
                        fontSize: '13',
                        color: 'rgba(255, 255, 255,1)'
                    }
                },
                // emphasis:{
                //     show:true,
                //     textStyle: {
                //         fontSize: '15',
                //         color:'#ffffff',
                //         fontWeight: 'bold'
                //     }
                // }
            },
            labelLine: {
                normal: {
                    show:false,
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                },
            },
            
            data:[
                {
                    value:235, 
                    name:'视频广告',
                    itemStyle: {
                        color: '#ff6600'
                    }
                },   
                {
                    value:274, 
                    name:'联盟广告',
                    itemStyle:{
                        color:'blue'
                    }
                },
                {value:310, name:'邮件营销'},
                {value:335, name:'直接访问'},
                {value:400, name:'搜索引擎'}
                
            ]
        },
        
        
        // {
        //     name: '访问来源',
        //     type: 'pie',
        //     bottom: 10,
        //     color: ['#FFDB5C','#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3', '#9d96f5', '#8378EA', '#96BFFF'],
        //     avoidLabelOverlap: false,
        //     // radius: '55%',
        //     roseType: 'angle',
        //     radius: ['30%', '60%'],
        //     center: ['50%', '55%'],
        //     label: {
                
        //     },
        //     data:[
        //         {value:310, name:'邮件营销'},
        //         {value:335, name:'直接访问'},
        //         {value:400, name:'搜索引擎'}
        //     ]
        // }
    ]
};

myChartPie.setOption(optionPie2)


//最简单的旭日图
var myChartSun = echarts.init(document.getElementById('mainSunBox'));
var optionSunburst = {
    series: {
        type: 'sunburst',
        data: [{
            name: 'A',
            value: 10,
            children: [{
                value: 3,
                name: 'Aa'
            }, {
                value: 5,
                name: 'Ab'
            }]
        }, {
            name: 'B',
            itemStyle:{
                color:'orange'
            },
            children: [{
                name: 'Ba',
                value: 4,
                itemStyle:{
                    color:'orange'
                },
            }, {
                name: 'Bb',
                value: 2,
                itemStyle:{
                    color:'orange'
                },
            }]
        }, {
            name: 'C',
            value: 3
        }]
    }
};
myChartSun.setOption(optionSunburst);

