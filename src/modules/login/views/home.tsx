import * as React from 'react';
import { Icon, Form, Input, Button, Checkbox } from 'antd';
import styles from '../style/index.less'

import PropTypes from 'prop-types';

import emitter from '../../../common/emitter'

import { CommonActions } from '../../common/actions/index'

const FormItem = Form.Item;
export interface HomeProps {
    location?,
    actions?: CommonActions;
    name?: any;
    history?
    form;
}

class HomeCls extends React.PureComponent<HomeProps, any> {
    static childContextTypes = {
        location: PropTypes.object,
    }
    constructor(props) {
        super(props)
    }
    componentWillMount() {

    }
    handleSubmit = e => {
        e.preventDefault();
        let self = this
        this.props.form.validateFields((err, values) => {
            if (!err) {
                self.props.actions.login(values, (data) => {
                    if (data) {
                        emitter.emit('message', 'success', '登录成功！')
                        this.props.history.replace(`/store/photo`)
                    } else {
                        emitter.emit('message', 'error', '用户名或密码错误！')
                    }
                })
            }
        });
    };
    renderForm() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.form}>
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

                    <FormItem className={styles.additional}>
                        {getFieldDecorator('remember', {
                            initialValue: false
                        })(<Checkbox className={'remember'}>记住密码</Checkbox>)}
                        <Button type="primary" htmlType="submit" className={styles.login_form_button}>
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
            <div className={styles.login} style={{ height: window.innerHeight }}>
                <div className={styles.sider} style={{ width: window.innerWidth - 400 + 'px' }}>
                    <img src={bg} style={{ width: window.innerWidth - 400 + 'px', height: window.innerHeight }} />
                </div>
                <div className={styles.content} style={{ width: '400px' }}>
                    <div className={styles.logo}>
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
