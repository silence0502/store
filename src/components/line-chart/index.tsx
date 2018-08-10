import React from 'react';
import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';
Exporting(Highcharts);

export interface LineChartProps {
    data?
    nodeName?
}

/**
 * 折线图
 * 
 * @export
 * @class LineChart
 * @extends {React.PureComponent<LineChartProps, any>}
 */

export default class LineChart extends React.PureComponent<LineChartProps, any> {
    line: any
    options: any
    chart: any
    x: any
    y: any
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        let data = this.props.data

        let oldColors = Highcharts.getOptions().colors
        // 改变默认参数colors，前面插入主色,pie-chart 会把colors的字符串数组转成json数组
        if (!oldColors[0].radialGradient && oldColors[0] !== '#00b388') {
            let colors = ['#00b388']
            Highcharts.setOptions({
                colors: colors.concat(oldColors),
                maxHeight: '100px'
            });
        }

        this.options = {
            chart: {
                type: 'column',
                color: '#ddd'
            },
            title: {
                text: '' // data.title
            },
            subtitle: {
                text: '数据截止 ' + data.updated_at
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45  // 设置轴标签旋转角度
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '数量（单位）'
                },
                lineColor: 'red'
            },

            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: '数量: <b>{point.y:.1f} （单位）</b>'
            },
            series: [{
                name: '总人口',
                data: data.chartData,
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.1f}', // :.1f 为保留 1 位小数
                    y: 10,
                }
            }],
            credits: {
                enabled: false
            },
        }
        this.chart = Highcharts.chart(this.line, this.options);
    }
    chartExport() {

        this.chart.exportChart(
            {
                type: 'image/png',
                filename: this.props.data.title,
                sourceWidth: 400,
                sourceHeight: 200
            }
        );
    }
    render() {
        return (
            <div ref={(node) => { this.line = node }} >line</div>
        );
    }

}
