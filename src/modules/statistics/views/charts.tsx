import * as React from 'react';
import { Button, Row, Col,  Divider, Icon } from 'antd'
import LineChart from '../../../components/line-chart/index'
import PieChart from '../../../components/pie-chart/index'
import SectionHeader from '../../../components/section-header/index'
import ChartTable from '../../../components/chart-table/index'

import '../style/index'

declare let tagcloud: any;

class Home extends React.Component<any, any> {
    mapContain: any
    constructor(props: any) {
        super(props);
        this.state = {

        };
    }

    renderLine() {
        let data = {
            chartData: [
                ['2017-01-01', 15],
                ['2017-02-01', 15],
                ['2017-03-01', 20],
                ['2017-04-01', 25],
                ['2017-05-01', 60],
                ['2017-06-01', 60],
                ['2017-07-01', 65],
                ['2017-08-01', 60],
                ['2017-09-01', 65],
                ['2017-10-01', 70]
            ],
            title: '设备数量统计',
            updated_at: '2018-05-30'
        }
        return <LineChart data={data} />
    }
    renderPie() {
        let data = {
            chartData: [
                ['生活', 25],
                ['娱乐', 35],
                ['信息查询', 30],
                ['学习', 9],
                ['其他', 1]
            ],
            title: '场景占比',
            updated_at: '2018-05-31'
        }
        return <PieChart data={data} />
    }
    renderTable(){
        const columns = [{
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        }, {
        title: '2018-01-01',
        dataIndex: 'one',
        key: 'age',
        }, {
        title: '2018-02-01',
        dataIndex: 'two',
        key: 'address',
        }, {
        title: '2018-03-01',
        dataIndex:'three',
        key: 'three',
        }, {
        title: '2018-04-01',
        dataIndex:'four',
        key: 'four',
        }, {
        title: '2018-05-01',
        dataIndex:'five',
        key: 'five',
        }, {
        title: '2018-07-01',
        dataIndex:'seven',
        key: 'seven',
        }
    ];

        const data = [{
            key: '1',
            time:'node_1',
            one: '--',
            two: '--',
            three:'--',
            four:'--',
            five:'--',
            seven:'--'
            }, {
            key: '2',
            time:'node_2',
            one: '--',
            two: '--',
            three:'--',
            four:'--',
            five:'--',
            seven:'--'
            }, {
            key: '3',
            time:'node_3',
            one: '--',
            two: '--',
            three:'--',
            four:'--',
            five:'--',
            seven:'--'
            },{
            key: '4',
            time:'node_4',
            one: '--',
            two: '--',
            three:'--',
            four:'--',
            five:'--',
            seven:'--'
            },{
            key: '5',
            time:'node_5',
            one: '--',
            two: '--',
            three:'--',
            four:'--',
            five:'--',
            seven:'--'
            },{
            key: '6',
            time:'node_6',
            one: '--',
            two: '--',
            three:'--',
            four:'--',
            five:'--',
            seven:'--'
            }];

        return(
            <ChartTable columns={columns} data={data} />
        )
    }
    render() {
        let _style = { background: '#fff', marginBottom: '16px', minHeight: (window.innerHeight - 100) / 2 + 'px' }
        let _styles = { background: '#fff', marginBottom: '32px', minWidth: (window.innerHeight - 200) / 2 + 'px' }
        return (
            <div>
                <Row gutter={16} style={{ display: 'flex', alignItems: 'stretch' }}>
                    <Col className="gutter-row" span={9} offset={1}>
                         <div className="container" style={_style}> 
                            <SectionHeader title="场景类型分布"></SectionHeader>
                            <div>
                                {this.renderPie()}
                            </div>
                        </div>
                    </Col>
                    
                    <Col className="gutter-row" span={10} offset={2}>
                        <div className="container" style={_styles}>
                            <SectionHeader title="设备添加统计"></SectionHeader>
                            <div >
                                {this.renderLine()}
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="gutter-row" span={21} offset={1}>
                        <div className="container" style={_style}>
                            <SectionHeader title="设备添加统计"></SectionHeader>
                            <div >
                                {this.renderTable()}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Home;