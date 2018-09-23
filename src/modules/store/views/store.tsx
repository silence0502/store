import * as React from 'react';
import * as _ from 'lodash';

import { Pagination, Input, Row, Col, Modal, Spin, message } from 'antd';
const Search = Input.Search;
const confirm = Modal.confirm;

import SectionHeader from '../../../components/section-header'
import StoreCard from '../../../components/store-card'
import NoData from '../../../components/NoData'

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
    doDelete?
    report_info?
}
class Store extends React.PureComponent<StoreProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            visible: false,
            _refWidth: 0,
            _refHeight: 0
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
        this.props.actions.reset_report_info()
    }

    showModal(id) {
        this.props.actions.get_photo_info(id, () => {
            this.props.actions.get_report_info(id, () => {
                this.setState({
                    visible: true,
                })
            })
        })
    }

    showDeleteConfirm(id) {
        let self = this
        confirm({
            title: '您确定要删除吗?',
            content: '请谨慎操作',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                self.doDelete(id)
            },
            onCancel() { }
        });
    }

    doDelete(id) {
        if (this.props.doDelete) {
            this.props.doDelete(id)
        }
    }
    renderReportInfo() {
        let { report_info } = this.props
        if (report_info && report_info.length > 0) {
            report_info.map((item, index) => {
                item.num = parseInt(item.num, 10);
            })
            let new_arr = _.orderBy(report_info, ['num', 'type'], ['asc', 'asc'])
            let new_q = '';
            for (let i = 0; i < new_arr.length; i++) {
                new_q += '第' + new_arr[i].num + '张图的坐标为（' + new_arr[i].left + ',' + new_arr[i].top + '）,形状为' + new_arr[i].quality
                for (let j = i + 1; j < new_arr.length; j++) {
                    if (new_arr[j].num === new_arr[i].num) {
                        new_q = new_q + ',尺寸为' + new_arr[j].quality + '。 \n'
                    }
                }
                i++
            }
            return (
                <pre>{new_q}</pre>
            )
        } else {
            return (
                <p>这是对该图片的描述</p>
            )
        }
    }
    renderNumber() {
        let { report_info } = this.props
        setTimeout(() => {
            let _imgDom: any = this.refs.modelImg
            if (_imgDom) {
                this.setState({
                    _refWidth: _imgDom.clientWidth / 2592,
                    _refHeight: _imgDom.clientHeight / 1520

                })
            }
        }, 500)
        if (this.state._refWidth && this.state._refHeight) {
            if (report_info && report_info.length > 0) {
                let fmtInfo = _.uniqBy(report_info, 'num')
                return fmtInfo.map((item, index) => {
                    let width = parseInt(item.width, 10) * this.state._refWidth, height = parseInt(item.height, 10) * this.state._refHeight
                    return <div key={index} style={{
                        position: 'absolute', top: parseInt(item.top, 10) * this.state._refWidth, left: parseInt(item.left, 10) * this.state._refHeight,
                        width: width, height: height, border: '1px solid #E50514', fontSize: '20px',
                        display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#e50514'
                    }}>{item.num}</div>
                })

            }
        }
    }
    renderModal() {
        return (
            <Row gutter={15}>
                <Col className="gutter-row" span={12}>
                    <div ref="modelImg" className="gutter-box" style={{ position: 'relative' }}>
                        <img alt="example" src={this.props.photo_info.img} style={{ width: '100%', height: '100%' }} />
                        {this.renderNumber()}
                    </div>
                </Col>
                <Col className="gutter-row" span={12}>
                    <div className="gutter-box">
                        {this.renderReportInfo()}
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
                            <StoreCard data={item} renderModal={this.showModal.bind(this)} doDelete={this.showDeleteConfirm.bind(this)} />
                        </div>
                    </Col>)
            })
        )
    }
    renderList() {
        if (this.props.photo_list.rows.length > 0) {
            return (
                <div style={{ minHeight: window.innerHeight - 305 }}>
                    <Row gutter={15}>
                        {this.renderCard()}
                    </Row>
                </div>
            )
        } else {
            return (
                <NoData />
            )
        }
    }
    renderPagination() {
        if (this.props.photo_list.rows.length > 0) {
            return (
                <Pagination
                    showQuickJumper
                    onChange={this.goPage.bind(this)}
                    total={this.props.photo_list.count}
                    current={parseInt(this.props.page_num, 10) + 1}
                    pageSize={this.props.page_size} />
            )
        } else {
            return <div />
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
                            width={window.innerWidth - 500}
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