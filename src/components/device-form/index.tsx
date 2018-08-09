import React from 'react';
import { Form, Input } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

import ResourcesThumbnailUpload from '../resources-thumbnail-upload/index'

import './style/index';
import { FormComponentProps } from 'antd/lib/form/Form';

export interface DeviceFormClsProps extends FormComponentProps {
    id?
    data?
}
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 13 },
};
class DeviceFormCls extends React.PureComponent<DeviceFormClsProps, any> {
    constructor(props: any) {
        super(props)
        this.state = {

        }
    }
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
    changeMachineImage(key, value) {
        this.setState({
            [key]: value
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let data = this.props.data || {}
        return (
            <Form className='device-form'>
                <FormItem
                    {...formItemLayout}
                    label="设备名称"
                    hasFeedback
                >
                    {getFieldDecorator('name', {
                        initialValue: data.name,
                        rules: [
                            { required: true, message: '设备名称不能为空!' }
                        ],
                    })(
                        <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="设备编号"
                    hasFeedback
                >
                    {getFieldDecorator('num', {
                        initialValue: data.num,
                        rules: [
                            { required: true, message: '设备编号不能为空!' }
                        ],
                    })(
                        <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="开场白"
                    hasFeedback
                >
                    {getFieldDecorator('start_introduction', {
                        initialValue: data.start_introduction,
                        rules: [
                            { required: true, message: '开场白不能为空!' }
                        ],
                    })(
                        <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="备注"
                    hasFeedback
                >
                    {getFieldDecorator('remark', {
                        initialValue: data.remark,
                        rules: [
                            { required: true, message: '备注不能为空!' }
                        ],
                    })(
                        <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="描述"
                    hasFeedback
                >
                    {getFieldDecorator('desc', {
                        initialValue: data.desc,
                        rules: [{
                            required: true, message: '描述不能为空!'
                        }]
                    })(
                        <TextArea placeholder="" rows={3} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="封面图片"
                    hasFeedback
                >
                    {getFieldDecorator('cover', {
                        initialValue: data.cover,
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
        )
    }

}

const DeviceForm: any = Form.create<any>()(DeviceFormCls);

export default DeviceForm;