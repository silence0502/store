import * as React from 'react';

import { Button } from 'antd'
import Loading from '../../../common/loading'
import SectionHeader from '../../../components/section-header/index'
import DeviceForm from '../../../components/device-form/index'
import emitter from '../../../common/emitter'
import '../style/index'

export interface EditProps {
    modalTitle?
    history?
    match?
    actions?
    device_info?
}

class Edit extends React.PureComponent<EditProps, any> {
    formRef: any
    constructor(props: any) {
        super(props);
        this.state = {
            editLoading: false,
        }
    }
    doSubmit() {
        let formdata = this.formRef.getData()
        let { match, history } = this.props
        let id = match.params.id
        if (formdata) {
            if (id) {
                this.props.actions.editDevice(id, formdata, (err, data) => {
                    if (data) {
                        emitter.emit('message', 'success', '修改成功！')
                        setTimeout(() => {
                            this.props.history.push(`/device/list`)
                        }, 1000)
                    }
                })
            } else {
                this.props.actions.createDevice(formdata, (err, data) => {
                    if (data) {
                        emitter.emit('message', 'success', '添加成功！')
                        setTimeout(() => {
                            this.props.history.push(`/device/list`)
                        }, 1000)
                    }
                })
            }
        }
    }
    componentWillMount() {
        let { match } = this.props
        let id = match.params.id
        if (id) {
            this.setState({
                editLoading: true
            });
            this.props.actions.deviceInfo(id, (data, err) => {
                this.setState({
                    editLoading: false
                });
            })
        }
    }
    componentWillUnmount() {
        this.props.actions.resetDeviceInfo()
    }
    render() {
        let { device_info } = this.props
        let { match } = this.props
        let id = match.params.id
        let modalTitle = id ? '编辑设备' : '添加设备'
        if (device_info || !id) {
            return (
                <div className="edit">
                    <div className="container" style={{ background: '#fff', margin: '0 0 10px 0', minHeight: window.innerHeight - 190 + 'px', padding: '8px' }}>
                        <section>
                            <SectionHeader title={modalTitle}></SectionHeader>
                            <DeviceForm
                                wrappedComponentRef={(node) => { this.formRef = node }}
                                data={device_info}
                            />
                        </section>
                    </div>
                    <section className='actionsfooter'>
                        <Button onClick={this.doSubmit.bind(this)} type="primary">提交</Button>
                        <Button onClick={() => { this.props.history.goBack() }}>取消</Button>
                    </section>
                </div>
            );
        } else {
            return <div style={{ marginTop: (window.innerHeight - 130) / 2 + 'px' }}><Loading /></div>
        }
    }
}

export default Edit;