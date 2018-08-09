import React from 'react';
import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';
Exporting(Highcharts);

export interface LineChartProps {
    data?: any,
    nodeName?: any
}

/**
 * 折线图
 * 
 * @export
 * @class LineChart
 * @extends {React.PureComponent<LineChartProps, any>}
 */

export default class PieChart extends React.PureComponent<LineChartProps, any> {
    pie: any
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

        // 创建渐变色----只转一次，会改变全局的colors，会把colors的字符串数组转成json数组，影响line-chart 也变成渐变色

        // if (!Highcharts.getOptions().colors[1].radialGradient) {
        //     Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
        //         return {
        //             radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
        //             stops: [
        //                 [0, color],
        //                 [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
        //             ]
        //         };
        //     });
        // }

        this.options = {
            title: {
                text: '' // 
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        },
                        connectorColor: 'silver'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: data.title,
                data: data.chartData
                // [
                // ['Firefox', 45.0],
                // {
                //     name: 'Chrome',
                //     y: 12.8,
                //     sliced: true,
                //     selected: true
                // },
                // ]
            }],
            credits: {
                enabled: false
            }
        }
        this.chart = Highcharts.chart(this.pie, this.options);
    }
    chartExport() {

        this.chart.exportChart(
            {
                type: 'image/png',
                filename: this.props.data.title,
                sourceWidth: 400,
                sourceHeight: 280
            }
        );
    }
    render() {
        return (
            <div ref={(node) => { this.pie = node }} ></div>
        );
    }

}
