import * as React from 'react';
import { Icon, Form, Input, Button, Checkbox } from 'antd';
require('../style/index.scss');

const FormItem = Form.Item;
export interface HomeProps {
    actions?: any;
    name?: any;
    history?
    form;
}

class HomeCls extends React.PureComponent<HomeProps, any> {
    componentWillMount() {

    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.history.push(`store`)
            }
        });
    };
    renderForm() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="form">
                <Form onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: '请输入用户名!' }]
                        })(
                            <Input
                                size="large"
                                prefix={<Icon type="user" className={'prefixIcon'} />}
                                placeholder="用户名"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }]
                        })(
                            <Input
                                size="large"
                                prefix={<Icon type="lock" className={'prefixIcon'} />}
                                placeholder="密码"
                                type="password"
                            />
                        )}
                    </FormItem>

                    <FormItem className={'additional'}>
                        {getFieldDecorator('remember', {
                            initialValue: false
                        })(<Checkbox className={'remember'}>记住密码</Checkbox>)}
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
            </Button>
                        <a className="login-form-forgot" href="">
                            忘记密码？
            </a>
                    </FormItem>
                </Form>
            </div>
        );
    }
    render() {
        let logo = require('../../../img/logo2.png');
        let bg = require('../../../img/login_background.png');
        return (
            <div className="login" style={{ height: window.innerHeight }}>
                <div className="sider" style={{ width: window.innerWidth - 400 + 'px' }}>
                    <img src={bg} style={{ width: window.innerWidth - 400 + 'px', height: window.innerHeight }} />
                </div>
                <div className="content" style={{ width: '400px' }}>
                    <div className="logo">
                        <img src={logo} className="logoFont" />
                    </div>
                    {this.renderForm()}
                </div>
            </div>
        );
    }
}

const Home = Form.create<any>()(HomeCls);

export default Home;
