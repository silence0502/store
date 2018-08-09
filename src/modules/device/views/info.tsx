import * as React from 'react';
import SectionHeader from '../../../components/section-header/index'
import DeviceInfo from '../../../components/device-info'
import SdTable from '../../../components/sd-table'
import CompactTable from '../../../components/CompactTable'
import { Button, Modal } from 'antd'
import * as _ from 'lodash';
const confirm = Modal.confirm;
import emitter from '../../../common/emitter'
import '../style/index'

import Loading from '../../../common/loading'

export interface InfoProps {
    modalTitle?
    history?
    match?
    device_info?
    actions?
    device_scene_info?
    device_noscene_list?
}

class Info extends React.PureComponent<InfoProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            visible: false,
            infoLoading: false,
            selected: {},
            pageSize: 5,
            tableloading: false,
            scene_list: []
        };
    }
    doCancel(e) {
        let { scene_list } = this.state
        let scene_id = parseInt(e)
        let { match } = this.props
        let device_id = match.params.id
        let unbind_info = { device_id, scene_id }
        this.props.actions.deviceDelScene({ unbind_info }, () => {
            emitter.emit('message', 'success', '取消成功！')
            _.remove(scene_list, (item) => {
                return item.id == scene_id
            })
            let scene = [...this.state.scene_list]
            this.setState({
                scene_list: scene
            })
        })
    }
    showModal() {
        this.setState({
            visible: true,
            tableloading: true
        })
        let { match } = this.props
        let id = match.params.id
        let status = 'unbind'
        let obj = { status }
        this.props.actions.deviceNoSceneList(id, obj, (data, err) => {
            this.setState({
                tableloading: false
            })
        })
    }
    CancelModal() {
        this.setState({
            visible: false
        })
    }
    goDelete() {
        let { match } = this.props
        let id = match.params.id
        this.props.actions.deleteDevice(id, (err, data) => {
            if (data) {
                emitter.emit('message', 'success', '删除成功！')
                setTimeout(() => {
                    this.props.history.push(`/device/list`)
                }, 1000)
            }
        })
    }
    showDeleteConfirm() {
        let self = this
        confirm({
            title: '您确定要删除该设备吗?',
            content: '',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                self.goDelete()
            },
            onCancel() { },
        });
    }
    showCancelConfirm(e) {
        let self = this
        confirm({
            title: '您确定要取消该设备吗?',
            content: '',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                self.doCancel(e)
            },
            onCancel() { },
        });
    }
    goEdit() {
        let { match } = this.props
        let id = match.params.id
        this.props.history.push(`/device/edit/${id}`)
    }
    bindScene() {
        let { selected } = this.state
        let { match } = this.props
        let device_id = parseInt(match.params.id)
        let scene_ids = _.map(selected, (item, index) => {
            return item.id
        })
        let bind_info = _.map(scene_ids, (item, index) => {
            let scene_id = item
            return { scene_id, device_id }
        })
        this.props.actions.deviceAddScene({ bind_info }, (data, err) => {
            emitter.emit('message', 'success', '绑定成功！')
            let status = 'binded'
            let obj = { status }
            this.props.actions.deviceSceneInfo(device_id, obj, (err, data) => {
                this.setState({
                    infoLoading: false,
                    scene_list: data
                });
            })
        })
        this.setState({
            visible: false
        })
    }
    componentWillMount() {
        this.setState({
            infoLoading: true
        });
        let { match } = this.props
        let id = match.params.id
        this.props.actions.deviceInfo(id, (err, data) => {
            let status = 'binded'
            let obj = { status }
            this.props.actions.deviceSceneInfo(id, obj, (err, data) => {
                this.setState({
                    infoLoading: false,
                    scene_list: data
                });
            })
        })
    }
    componentWillUnmount() {
        this.props.actions.resetDeviceInfo()
    }
    tableSelectRow(data) {
        let newSelected = data
        this.setState({
            selected: newSelected
        })
    }
    goLink(scene_id) {
        this.props.history.push(`/scene/info/${scene_id}`)
    }
    renderModalDeceive() {
        let { device_noscene_list } = this.props
        let { tableloading, pageSize } = this.state
        let data = {
            header: [
                {
                    key: 'name',
                    title: '场景名称',
                    width: '15%',
                    link: true
                }, {
                    key: 'category',
                    title: '场景类型',
                    width: '15%'
                }, {
                    key: 'desc',
                    title: '场景简介',
                }
            ],
            dataList: device_noscene_list
        }
        return (
            <CompactTable
                goLink={this.goLink.bind(this)}
                data={data}
                selectAuth={true}
                selectRow={this.tableSelectRow.bind(this)}
                pageSize={pageSize}
                loading={tableloading}
            />
        )
    }
    render() {
        let { device_info, device_scene_info } = this.props
        let { scene_list } = this.state
        let table_data = {
            header: [
                {
                    key: 'name',
                    title: '场景名称',
                    link: true
                }, {
                    key: 'category',
                    title: '场景类型',
                }, {
                    key: 'desc',
                    title: '场景简介',
                }
            ],
            dataList: scene_list
        }
        if (device_info && device_scene_info) {
            return (
                <div className="info">
                    <div className="container" style={{ background: '#fff', margin: '0 0 32px 0', minHeight: window.innerHeight - 130 + 'px' }}>
                        <div style={{ minHeight: window.innerHeight - 195 + 'px', padding: '8px' }}>
                            <section>
                                <SectionHeader title="设备信息">
                                    <Button type="primary" onClick={this.showModal.bind(this)}>绑定场景</Button>
                                    <Button type="primary" onClick={this.goEdit.bind(this)}>编辑</Button>
                                    <Button type="danger" onClick={this.showDeleteConfirm.bind(this)}>删除</Button>
                                </SectionHeader>
                                <DeviceInfo data={this.props.device_info} />
                            </section>
                            <section>
                                <SectionHeader title="绑定信息"></SectionHeader>
                                <SdTable data={table_data} doCancel={this.showCancelConfirm.bind(this)} actionAuth={['delete']} goLink={this.goLink.bind(this)} />
                            </section>
                        </div>
                        <section className='actionsfooter'>
                            <Button onClick={() => { this.props.history.goBack() }}>返回</Button>
                        </section>
                        <Modal
                            title="发现"
                            visible={this.state.visible}
                            onCancel={this.CancelModal.bind(this)}
                            footer={null}
                            width="60%"
                        >
                            {this.renderModalDeceive()}
                            <div className='actionsfooter' >
                                <Button type="primary" onClick={this.bindScene.bind(this)} style={{ marginRight: '10px' }}>确定</Button>
                                <Button onClick={this.CancelModal.bind(this)}>取消</Button>
                            </div>
                        </Modal>
                    </div>
                </div>
            );
        } else {
            return <div style={{ marginTop: (window.innerHeight - 130) / 2 + 'px' }}><Loading /></div>
        }
    }
}

export default Info;