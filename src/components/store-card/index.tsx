import * as React from 'react';
import { Card, Icon } from 'antd';
import styles from './style/index.less';

export interface StoreCardProps {
    data?: any
    renderModal?: any
    doDelete?: any
}
class StoreCard extends React.Component<StoreCardProps, any> {
    renderModal() {
        let id = this.props.data.id
        if (this.props.renderModal) {
            this.props.renderModal(id)
        }
    }
    doDelete() {
        let id = this.props.data.id
        if (this.props.doDelete) {
            this.props.doDelete(id)
        }
    }
    render() {
        let { data } = this.props;
        return (
            <div className={styles.store_card} >
                <Card
                    cover={<img alt="example" src={data.img} onClick={this.renderModal.bind(this)} />}
                    actions={[<Icon key="1" type="delete" onClick={this.doDelete.bind(this)} />]}
                >
                </Card>
            </div>
        );
    }
}

export default StoreCard;