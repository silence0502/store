import * as React from 'react'

import { Row, Col } from 'antd';

import './style/index'



class SceneBaseInfo extends React.Component<any, any>{

    render() {
        let data = this.props.data
        switch (data.category) {
            case '1':
                data.category = '生活'
                break;
            case '2':
                data.category = '娱乐'
                break;
            case '3':
                data.category = '信息查询'
                break;
            default:
                break;
        }
        return (
            <div className="scene-base-info">
                <Row className="base-info-row">
                    <Col span={14}>
                        <Row>
                            <Col span={6} className="base-info-col">场景名称：</Col>
                            <Col span={18}>{data.name}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6} className="base-info-col">场景简介：</Col>
                            <Col span={18}>
                                <div>
                                    {data.desc}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6} className="base-info-col">场景分类：</Col>
                            <Col span={18}>{data.category}</Col>
                        </Row>

                    </Col>
                    <Col span={10}>
                        <Row>
                            <Col span={8} className="base-info-col">封面图片：</Col>
                            <Col span={16} className="base-info-image"><img src={data.cover} /></Col>
                        </Row>
                    </Col>
                </Row>


            </div>
        );
    }
}

export default SceneBaseInfo;