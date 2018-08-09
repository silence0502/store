import * as React from 'react';

import { Pagination, Input, Row, Col, Modal } from 'antd';
const Search = Input.Search;

import SectionHeader from '../../../components/section-header'
import StoreCard from '../../../components/store-card'

export interface StoreProps {
    modalTitle?
    history?
    match?
    location?
}
let data = [
    {
        id: 0,
        images: require('../../../img/1-1.JPG')
    },
    {
        id: 1,
        images: require('../../../img/1-2.JPG')
    },
    {
        id: 2,
        images: require('../../../img/1-3.JPG')
    },
    {
        id: 3,
        images: require('../../../img/1-4.JPG')
    },
    {
        id: 4,
        images: require('../../../img/1-5.JPG')
    },
    {
        id: 5,
        images: require('../../../img/1-6.JPG')
    },
    {
        id: 6,
        images: require('../../../img/1-6的侧.JPG')
    },
    {
        id: 7,
        images: require('../../../img/1-7.JPG')
    },
]
class Store extends React.PureComponent<StoreProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            visible: false,
            _data: {}
        };
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    renderModal(id) {
        this.setState({
            visible: true,
            _data: data[id]
        })
    }

    componentDidMount() {

    }
    componentWillMount() {


    }
    componentWillUnmount() {

    }
    renderCard() {
        return (
            data.map((item, index) => {
                return <Col className="gutter-row" span={6}>
                    <div className="gutter-box" style={{ marginBottom: '10px' }}><StoreCard data={item} renderModal={this.renderModal.bind(this)} /></div>
                </Col>
            })
        )
    }
    renderList() {
        return (
            <div>
                <Row gutter={15}>
                    {this.renderCard()}
                </Row>
            </div>
        )
    }
    render() {
        let { _data } = this.state
        return (
            <div>
                <SectionHeader title='图像列表'></SectionHeader>
                <div style={{ width: '100%', overflow: 'hidden' }}>
                    <Search
                        placeholder="请输入图片名称"
                        style={{ width: 200, float: 'right', margin: ' 0 0 15px 0' }}
                    />
                </div>
                {this.renderList()}
                <div style={{ margin: '15px 0 0 0', textAlign: 'center' }}>
                    <Pagination showQuickJumper defaultCurrent={2} total={500} />
                </div>
                <div>
                    <Modal
                        title=""
                        bodyStyle={{
                            height: '400px'
                        }}
                        width={700}
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <img alt="example" src={_data.images} style={{ width: '200px', height: '200px' }} />
                        <p>Some contents...</p>
                    </Modal>
                </div>
            </div>
        )

    }
}

export default Store;