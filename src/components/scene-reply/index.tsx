import * as React from 'react';
import { Form, Input, Button, Collapse, Icon, Select } from 'antd';

const FormItem = Form.Item;
const Panel = Collapse.Panel;
const Option = Select.Option;

import * as UUID from 'uuid'

import SceneAutoReplyAnswer from '../scene-auto-reply-answer/index'

import './style/index'



class SceneAnswerCls extends React.Component<any, any> {
    constructor(props) {
        super(props);
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
    // getAnswer() {
    //     let { reply_arr } = this.state
    //     let reply_arr = []
    //     for (var i = 0; i < reply_arr.length; i++) {
    //         let reply_arr = this[answer_arr[i].name].refs.wrappedComponent.refs.formWrappedComponent.getData()
    //         if (answer_item.error) {
    //             this.flag = false
    //             return
    //         } else {
    //             answer_data.push(answer_item.data)
    //         }
    //     }
    //     return answer_data
    // }
    getData() {
        //this.handleSubmit()
        //let answer_data = this.getAnswer()
        let form_data = this.props.form.getFieldsValue()
        return form_data
        // if (!this.flag) {
        //     return { error: 'error', data: null }
        // }
        // let data = form_data
        // data.answers = answer_data
        // return { error: null, data: data }
    }
    setAnswerArr(answer) {

    }

    doDel() {
        this.props.doDelReply && this.props.doDelReply(this.props.uuid)
    }
    componentWillMount() {

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        let data = this.props.data || {}
        let { del_disabled } = this.props
        return (
            <div className='scene-reply'>
                <FormItem
                    {...formItemLayout}
                    label={this.props.title}
                    hasFeedback
                >
                    {getFieldDecorator('text', {
                        initialValue: this.props.text,
                        rules: [
                            // {
                            //     required: true, message: '请输默认回复信息!',
                            // }
                        ],
                    })(
                        <Input placeholder="请输默认回复信息" onClick={(e) => { e.stopPropagation() }} />
                    )}
                    <div className="btn-area">
                        <Button type="danger" disabled={del_disabled} onClick={this.doDel.bind(this)}>删除</Button>
                    </div>
                </FormItem>
            </div>
        );
    }
}

const SceneReply: any = Form.create<any>()(SceneAnswerCls);

export default SceneReply;