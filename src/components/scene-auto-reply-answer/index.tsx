import * as React from 'react';
import { Form, Input, Button, Collapse, Icon, Select } from 'antd';

const FormItem = Form.Item;
const Panel = Collapse.Panel;

// import ResourcesThumbnailUpload from '../resources-thumbnail-upload/index'

import './style/index'

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

class SceneAutoReplyAnswerCls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resource_type: this.props.answer_info && this.props.answer_info.resource ? this.props.answer_info.resource.type : '',
            resource: this.props.answer_info && this.props.answer_info.resource ? this.props.answer_info.resource.url : '',
            w: this.props.answer_info && this.props.answer_info.resource ? this.props.answer_info.resource.w : '',
            h: this.props.answer_info && this.props.answer_info.resource ? this.props.answer_info.resource.h : '',
        }
    }
    handleSubmit() {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.flag = true
            } else {
                this.flag = false
            }
        })
    }
    getData() {
        this.handleSubmit()
        let form_data = this.props.form.getFieldsValue()
        if (!this.flag) {
            return { error: 'error', data: null }
        }
        if (this.state.resource) {
            form_data.resource = {
                url: this.state.resource,
                type: this.state.resource_type,
                w: this.state.w,
                h: this.state.h,
            }
        }
        return { error: null, data: form_data }
    }
    doDelAnswer() {
        this.props.doDelAnswer && this.props.doDelAnswer(this.props.uuid)
    }
    changeResource(type, path, w, h) {
        this.setState({
            resource_type: type,
            resource: path,
            w: w,
            h: h,
        })
    }
    renderDelIcon() {
        if (this.props.del_disabled) {
            return <Icon type="close-circle-o" className="disabled" />
        } else {
            return <Icon type="close-circle-o" onClick={this.doDelAnswer.bind(this)} />
        }
    }
    changeMachineImage(key, value) {
        this.setState({
            [key]: value
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let data = this.props.answer_info || {}
        return (
            <FormItem
                {...formItemLayout}
                label={this.props.title}
                hasFeedback
            >
                {getFieldDecorator('title', {
                    initialValue: data.title,
                    rules: [{
                        required: true, message: '请输入回答!',
                    }],
                })(
                    <Input placeholder="请输入回答" type="textarea" rows={4} />
                )}
                {/* <div className="btn-area lt">
                    {this.renderDelIcon()}  // 删除功能
                </div>
                <div style={{ width: '75%' }}>
                    <ResourcesThumbnailUpload
                        data={null}
                        url={''}
                        onChange={this.changeMachineImage.bind(this, 'image')} />
                </div> */}
            </FormItem>
        );
    }
}

const SceneAutoReplyAnswer: any = Form.create<any>()(SceneAutoReplyAnswerCls);

export default SceneAutoReplyAnswer;