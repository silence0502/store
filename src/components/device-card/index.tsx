import * as React from 'react';
import { Card, Button } from 'antd';
import './style/index';

export interface DeviceCardProps {
    data?: any;
    goInfo?: any;
}
class DeviceCard extends React.Component<DeviceCardProps, any> {
    goInfo() {
        let id = this.props.data.id
        if (this.props.goInfo) {
            this.props.goInfo(id)
        }
    }
    render() {
        let { data } = this.props;
        return (
            <div className="device-card">
                <Card bordered={true} onClick={this.goInfo.bind(this)}>
                    <div style={{ overflow: 'hidden' }}>
                        <div className="cover"> <img className="pic" src={data.cover} /></div>
                        <div className="title">{data.name}</div>
                    </div>
                    <div className="des">
                        <div style={{ width: '100%', overflow: 'hidden' }}><a title={data.desc} style={{ color: '#000', textDecoration: 'none' }}>{data.desc}</a></div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default DeviceCard;
