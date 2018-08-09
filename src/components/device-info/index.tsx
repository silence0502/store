import * as React from 'react';
import { Button, Col, Row } from 'antd';
import './style/index';

export interface DeviceInfoProps {
    data?: any;
}
class DeviceInfo extends React.Component<DeviceInfoProps, any> {
    render() {
        let { data } = this.props;
        return (
            <div className="device-info">
                <Row className="base-info-row">
                    <Col span={12}>
                        <Row>
                            <Col span={8} className="base-info-col">设备名称：</Col>
                            <Col span={16}>{data.name}</Col>
                        </Row>
                        <Row>
                            <Col span={8} className="base-info-col">设备编号：</Col>
                            <Col span={16}>{data.num}</Col>
                        </Row>
                        <Row>
                            <Col span={8} className="base-info-col">开场白：</Col>
                            <Col span={16}>{data.start_introduction}</Col>
                        </Row>
                        <Row>
                            <Col span={8} className="base-info-col">描述：</Col>
                            <Col span={16}>{data.desc}</Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={8} className="base-info-col">封面图片：</Col>
                            <Col span={16} className="base-info-image"><img src={data.cover} /></Col>
                        </Row>
                        <Row>
                            <Col span={8} className="base-info-col">备注：</Col>
                            <Col span={16}>{data.remark}</Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DeviceInfo;
