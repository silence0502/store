import * as React from 'react';

import { Pagination, Input, Row, Col } from 'antd';
const Search = Input.Search;

import SectionHeader from '../../../components/section-header'
import StoreCard from '../../../components/store-card'

export interface StoreProps {
    modalTitle?
    history?
    match?
    location?
}
class Store extends React.PureComponent<StoreProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }
    componentWillMount() {


    }
    componentWillUnmount() {

    }
    renderList() {
        return (
            <div>
                <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box"><StoreCard /></div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box"><StoreCard /></div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box"><StoreCard /></div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box"><StoreCard /></div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box"><StoreCard /></div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box"><StoreCard /></div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box"><StoreCard /></div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="gutter-box"><StoreCard /></div>
                    </Col>
                </Row>
            </div>
        )
    }
    render() {
        return (
            <div>
                <SectionHeader title='图像列表'></SectionHeader>
                <div style={{ width: '100%' }}>
                    <Search
                        placeholder="请输入图片名称"
                        style={{ width: 200, float: 'right', marginRight: '15px' }}
                    />
                </div>
                {this.renderList()}
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <Pagination showQuickJumper defaultCurrent={2} total={500} />
                </div>
            </div>
        )

    }
}

export default Store;