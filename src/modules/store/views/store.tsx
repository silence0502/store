import * as React from 'react';

import { Pagination, Input, Row, Col, Modal, Spin } from 'antd';
const Search = Input.Search;

import SectionHeader from '../../../components/section-header'
import StoreCard from '../../../components/store-card'

export interface StoreProps {
    modalTitle?
    history?
    match?
    location?
    store_id
    actions?
    photo_list?
    photo_info?
    listLoading?
    goPage?
    page_size?
    page_num?
}
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

    goPage(current) {
        if (this.props.goPage) {
            this.props.goPage(current)
        }
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    showModal(id) {
        this.props.actions.get_photo_info(id)
        this.setState({
            visible: true,
            _data: this.props.photo_info
        })
    }

    renderModal() {
        let { _data } = this.state
        return (
            <Row gutter={15}>
                <Col className="gutter-row" span={12}>
                    <div className="gutter-box">
                        <img alt="example" src={_data.img} style={{ width: '100%', height: '100%' }} />
                    </div>
                </Col>
                <Col className="gutter-row" span={12}>
                    <div className="gutter-box">
                        <p>这是对该图片的描述</p>
                    </div>
                </Col>
            </Row>
        )
    }
    componentWillMount() {

    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    renderCard() {
        let { photo_list } = this.props
        return (
            photo_list.rows.map((item, index) => {
                return (
                    <Col key={index} className="gutter-row" span={6}>
                        <div className="gutter-box" style={{ marginBottom: '10px' }}>
                            <StoreCard data={item} renderModal={this.showModal.bind(this)} />
                        </div>
                    </Col>)
            })
        )
    }
    renderList() {
        return (
            <div style={{ minHeight: window.innerHeight - 305 }}>
                <Row gutter={15}>
                    {this.renderCard()}
                </Row>
            </div>
        )
    }
    renderPagination() {
        if (this.props.photo_list.rows.length > 0) {
            return (
                <Pagination
                    showQuickJumper
                    onChange={this.goPage.bind(this)}
                    total={this.props.photo_list.count}
                    current={parseInt(this.props.page_num + 1, 10)}
                    pageSize={this.props.page_size} />
            )
        } else {
            return (
                <div>当前无内容</div>
            )
        }
    }
    render() {
        if (!this.props.listLoading && this.props.photo_list && this.props.photo_list.rows) {
            return (
                <div style={{ padding: '10px' }}>
                    <SectionHeader title="图像列表"></SectionHeader>
                    <div style={{ width: '100%', overflow: 'hidden' }}>
                        <Search
                            placeholder="请输入图片名称"
                            style={{ width: 200, float: 'right', margin: ' 0 0 15px 0' }}
                        />
                    </div>
                    {this.renderList()}
                    <div style={{ margin: '15px 0 0 0', textAlign: 'center' }}>
                        {this.renderPagination()}
                    </div>
                    <div>
                        <Modal
                            title=""
                            bodyStyle={{
                                height: '100%'
                            }}
                            width={700}
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            {this.renderModal()}
                        </Modal>
                    </div>
                </div>
            )
        } else {
            return <Spin />
        }

    }
}

export default Store;