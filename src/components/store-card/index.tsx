import * as React from 'react';
import { Card, Icon } from 'antd';

import './style/index';

export interface StoreCardProps {
    data?: any
    renderModal?: any
}
class StoreCard extends React.Component<StoreCardProps, any> {
    renderModal() {
        let id = this.props.data.id
        if (this.props.renderModal) {
            this.props.renderModal(id)
        }
    }
    render() {
        let { data } = this.props;
        return (
            <div className="store-card" >
                <Card
                    cover={<img alt="example" src={data.images} onClick={this.renderModal.bind(this)} />}
                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                >
                </Card>
            </div>
        );
    }
}

export default StoreCard;
