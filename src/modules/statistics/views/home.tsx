import * as React from 'react';

import { Button, Row, Col } from 'antd'
import LineChart from '../../../components/line-chart/index'
import PieChart from '../../../components/pie-chart/index'
import BdMap from '../../../components/bdmap/index'
import TagCloud from '../../../components/tag-cloud/index'
import SectionHeader from '../../../components/section-header/index'

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
    renderMap() {
        // 覆盖物坐标点
        let data = [
            [116.4, 39.9],
            [117.4, 37.9],
            [118.8, 32.10],
            [120.15, 30.2],
            [121.5, 31.3],
            [108.9, 34.2],
            [104, 30.67],
            [116.98, 36.67]
        ]
        return <BdMap data={data} />
    }
    renderTagCloud() {
        let data = [
            { word: '天气', sceneId: '6' },
            { word: '翻译', sceneId: '7' },
            { word: '感冒', sceneId: '3' },
            { word: '时间', sceneId: '5' },
            { word: '学习', sceneId: '3' },
            { word: '游戏', sceneId: '4' },
            { word: '药品', sceneId: '3' },
            { word: '蔬菜', sceneId: '1' },
            { word: '考试', sceneId: '3' },
            { word: '旅游', sceneId: '9' },
            { word: '安全', sceneId: '9' },
            { word: '水果', sceneId: '1' }
        ]
        return <TagCloud data={data} goInfo={this.goInfo.bind(this)} />
    }
    goInfo(id) {
        this.props.history.push(`scene/info/${id}`)
    }
    render() {
        let _style = { background: '#fff', marginBottom: '16px', minHeight: (window.innerHeight - 130) / 2 + 'px', padding: '8px' }
        let _styles = { background: '#fff', marginBottom: '32px', minHeight: (window.innerHeight - 130) / 2 + 'px', padding: '8px' }
        return (
            <div>
                <Row gutter={16} style={{ display: 'flex', alignItems: 'stretch' }}>
                    <Col className="gutter-row" span={12}>
                        <div className="container" style={_style}>
                            <SectionHeader title="设备分布"></SectionHeader>
                            <div>
                                {this.renderMap()}
                            </div>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <div className="container" style={_style}>
                            <SectionHeader title="搜索热词"></SectionHeader>
                            <div>
                                {this.renderTagCloud()}
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16} style={{ display: 'flex', alignItems: 'stretch' }}>
                    <Col className="gutter-row" span={12}>
                        <div className="container" style={_styles}>
                            <SectionHeader title="设备添加统计"></SectionHeader>
                            <div>
                                {this.renderLine()}
                            </div>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <div className="container" style={_styles}>
                            <SectionHeader title="场景类型分布"></SectionHeader>
                            <div>
                                {this.renderPie()}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Home;