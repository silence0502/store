import * as React from 'react';
import { Form, Input, Button, Collapse, Icon, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
const FormItem = Form.Item;
const Panel = Collapse.Panel;
const Option = Select.Option;

import * as UUID from 'uuid'
import * as _ from 'lodash';

import SceneAutoReplyAnswer from '../scene-auto-reply-answer/index'

import './style/index'

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

export interface SceneAutoReplyClsProps extends FormComponentProps {
    uuid?
    del_disabled?
    data?
    doDelQuestion?
    title?
}
class SceneAutoReplyCls extends React.PureComponent<SceneAutoReplyClsProps, any> {
    flag: any
    constructor(props) {
        super(props);
        let answer_arr = []
        if (!this.props.data) {
            let uuid = UUID.v1()
            let answer = {
                uuid: uuid,
                name: 'answer1'
            }
            answer_arr.push(answer)
        }
        this.state = {
            answer_arr: answer_arr
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
    getAnswer() {
        let { answer_arr } = this.state
        let answer_data = []
        for (var i = 0; i < answer_arr.length; i++) {
            let answer_item = this[answer_arr[i].name].getData()
            if (answer_item.error) {
                this.flag = false
                return false
            } else {
                answer_data.push(answer_item.data)
            }
        }
        return answer_data
    }
    getData() {
        this.handleSubmit()
        let answer_data = this.getAnswer()
        let form_data = this.props.form.getFieldsValue()
        if (!this.flag) {
            return { error: 'error', data: null }
        }
        let data: any = form_data
        data.answers = answer_data
        return { error: null, data: data }
    }
    setAnswerArr(answer) {
        if (!answer) return
        let answer_arr = []
        answer.map((item, index) => {
            let answer_item = {
                uuid: UUID.v1(),
                name: `answer${answer_arr.length + 1}`,
                data: item
            }
            answer_arr.push(answer_item)
        })
        this.setState({
            answer_arr: answer_arr
        })
    }
    doAddAnswer(e) {
        e.stopPropagation()
        let { answer_arr } = this.state
        let uuid = UUID.v1()
        let name = `answer${answer_arr.length + 1}`
        let ques = {
            uuid: uuid,
            name: name
        }
        answer_arr.push(ques)
        this.setState({
            answer_arr: answer_arr
        })
    }
    doDelAnswer(uuid) {
        let { answer_arr } = this.state
        _.remove(answer_arr, (item) => {
            return item.uuid == uuid
        })
        this.setState({
            answer_arr: answer_arr
        })
    }
    doDel(e) {
        e.stopPropagation()

        this.props.doDelQuestion && this.props.doDelQuestion(this.props.uuid)
    }
    componentWillMount() {
        if (this.props.data) {
            this.setAnswerArr(this.props.data.answers)
        }
    }
    renderAnswer() {
        let { answer_arr } = this.state
        let self = this
        if (answer_arr.length) {
            return answer_arr.map((item, index) => {
                let del_disabled = answer_arr.length == 1 ? true : false
                return (
                    <SceneAutoReplyAnswer
                        uuid={item.uuid}
                        wrappedComponentRef={(node) => { this[item.name] = node; }}
                        title={`回答${index + 1}`}
                        del_disabled={del_disabled}
                        answer_info={item.data}
                        doDelAnswer={self.doDelAnswer.bind(self)} />
                )
            })
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        let data = this.props.data || {}
        let hd_html = (
            <FormItem
                {...formItemLayout}
                label={this.props.title}
                hasFeedback
            >
                {getFieldDecorator('title', {
                    initialValue: data.title,
                    rules: [{
                        required: true, message: '请输入问题!',
                    }],
                })(
                    <Input placeholder="请输入问题" onClick={(e) => { e.stopPropagation() }} />
                )}
                <div className="btn-area">
                    {/*<Button onClick={this.doAdd.bind(this)}>新增</Button>*/}
                    {/* <Button onClick={this.doAddAnswer.bind(this)}>新增回答</Button> */}
                    <Button type="danger" disabled={this.props.del_disabled} onClick={this.doDel.bind(this)}>删除问题</Button>
                </div>
            </FormItem>
        )
        return (
            <Collapse bordered={false} defaultActiveKey={['1']}>
                <Panel header={hd_html} key="1" className="scene-auto-reply">
                    <FormItem
                        {...formItemLayout}
                        label="关键字"
                        hasFeedback
                    >
                        {getFieldDecorator('keyword', {
                            initialValue: data.keyword,
                            rules: [{
                                required: true, message: '请输入关键字!',
                            }],
                        })(
                            <Select
                                mode="tags"
                                tokenSeparators={[',']}
                            >
                            </Select>
                        )}
                    </FormItem>
                    {this.renderAnswer()}
                </Panel>
            </Collapse>
        );
    }
}

const SceneAutoReply: any = Form.create<any>()(SceneAutoReplyCls);

export default SceneAutoReply;