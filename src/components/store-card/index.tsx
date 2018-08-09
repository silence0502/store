import * as React from 'react';
import { Card, Icon } from 'antd';

import './style/index';

export interface StoreCardProps {
    data?: any;
}
class StoreCard extends React.Component<StoreCardProps, any> {
    render() {
        let { data } = this.props;
        return (
            <div className="store-card">
                <Card

                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                >
                </Card>
            </div>
        );
    }
}

export default StoreCard;
