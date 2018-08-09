import * as React from 'react'
import { Row, Col, Button, Collapse } from 'antd';

import './style/index'
const Panel = Collapse.Panel;

class SceneAutoReplyInfo extends React.Component<any, any> {
    renderKeyword(keyword) {
        if (keyword) {
            return keyword.map((item, index) => {
                return <span className="scene-auto-reply-keys">{item}</span>
            })
        }
    }
    renderAnswer(answer) {
        if (answer) {
            return answer.map((item, index) => {
                return (
                    <div className="scene-auto-reply-info">
                        <Row className="auto-reply-row">
                            <Col span={4} style={{ textAlign: 'center' }}>回答 {index + 1}：</Col>
                            <Col span={20}>{item.title}</Col>
                        </Row>
                        {item.resource ? <Row className="auto-reply-row">
                            <Col span={4}></Col>
                            <Col span={20}>
                                <div className="pic">
                                    <img src={item.resource.url} />
                                </div>

                            </Col>
                        </Row> : ''}
                    </div>
                )
            })
        }
    }
    render() {
        let { data } = this.props
        let question = (
            <Row className="auto-reply-row">
                <Col span={3} style={{ textAlign: 'center' }}>问题{this.props.num}：</Col>
                <Col span={20}>{data.title}</Col>
            </Row>
        )
        return (
            <Row>
                <Col>
                    <Collapse bordered={false}>
                        <Panel header={question} className="scene-auto-reply-info">
                            <Row>
                                <Col span={4} style={{ textAlign: 'center' }}>关键字：</Col>
                                <Col span={20}>
                                    {this.renderKeyword(data.keyword)}
                                </Col>
                            </Row>
                            {this.renderAnswer(data.answers)}

                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        )


    }
}

export default SceneAutoReplyInfo;