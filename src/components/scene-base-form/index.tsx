import * as React from 'react';

import { Form, Input, Select } from 'antd';
const { TextArea } = Input;
const Option = Select.Option;
import AvatarUpload from '../avatar-upload/index'

import ResourcesThumbnailUpload from '../resources-thumbnail-upload/index'
import './style/index'
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 13 },
};

class SceneBaseFormCls extends React.Component<any, any> {
    getData() {
        let data = null
        this.props.form.validateFields((err, values) => {
            if (!err) {
                data = values

            } else {
                data = null
            }
        })
        return data
    }
    // handleCheckName(rule, value, callback) {
    //     let data = {}
    //     data.name = value
    //     let name = this.props.data && this.props.data.name ? this.props.data.name : ''
    //     if (value != name) {
    //         // this.props.actions.check_name(data, function (err, res) {
    //         //     if (res && res.exist) {
    //         //         callback('该场景名已存在！')
    //         //         callback()
    //         //     } else {
    //         //         callback()
    //         //     }
    //         // })
    //     } else {
    //         callback()
    //     }
    // }
    changeMachineImage(key, value) {
        this.setState({
            [key]: value
        })
    }
    render() {

        const { getFieldDecorator } = this.props.form;
        let data = this.props.data || {}
        data.avatar = data.cover
        return (
            <Form className='scene-bass-form'>
                <FormItem
                    {...formItemLayout}
                    label="场景名称"
                    hasFeedback
                >
                    {getFieldDecorator('name', {
                        initialValue: data.name,
                        rules: [
                            { required: true, message: '场景名称不能为空!' },
                            { max: 12, message: '长度不能超过12个文字!' },
                            {/*{ validator: this.handleCheckName.bind(this) } */ }
                        ],
                    })(
                        <Input placeholder="不能超过12个字" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="场景介绍"
                    hasFeedback
                >
                    {getFieldDecorator('desc', {
                        initialValue: data.desc,
                        rules: [{
                            required: true, message: '场景介绍不能为空!'
                        }]
                    })(
                        <TextArea placeholder="" rows={3} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="场景分类"
                    hasFeedback
                >
                    {getFieldDecorator('category', {
                        initialValue: data.category || '',
                        rules: [
                            { required: true, message: '场景分类不能为空!' }
                        ],
                    })(
                        <Select >
                            <Option value=''>请选择</Option>
                            <Option value='1'>生活</Option>
                            <Option value='2'>娱乐</Option>
                            <Option value='3'>信息查询</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="封面图片"
                    hasFeedback
                >
                    {getFieldDecorator('cover', {
                        initialValue: data.cover || '',
                        rules: [{
                            required: true, message: '封面图片不能为空!'
                        }]
                    })(
                        <ResourcesThumbnailUpload
                            data={data}
                            url={data.cover}
                            onChange={this.changeMachineImage.bind(this, 'image')} />
                    )}

                </FormItem>

            </Form>
        );
    }
}

const SceneBaseForm: any = Form.create<any>()(SceneBaseFormCls);
export default SceneBaseForm;