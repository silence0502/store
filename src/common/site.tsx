import * as React from 'react';
import * as PropTypes from 'prop-types';
import BasicLayout from '../layouts/BasicLayout'
import UserLayout from '../layouts/UserLayout'

const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import { Spin, message } from 'antd';

import _ from 'lodash';
import { withRouter, matchPath } from 'react-router'
import HomeActionCreatorsMap, { CommonActions } from '../modules/common/actions/index'

import emitter from './emitter'

declare let global: any;

function mapProps(state: any) {
    return {
        currentUser: state.commonReducer.currentUser,
        store_list: state.commonReducer.store_list
    }
}
function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export interface SiteProps {
    children?: any;
    actions?: CommonActions;
    location,
    matchPath,
    match,
    history?
    store_list
    currentUser
}

message.config({
    top: 100,
    duration: 2,
});

class Site extends React.Component<SiteProps, any> {
    static contextTypes = {
        router: PropTypes.object,
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    constructor(props: any) {
        super(props);
        this.state = {

        };
    }
    navClickHandler(key) {
        if (!matchPath(this.props.location.pathname, { path: `/${key}` })) {
            this.setState({
                activeKey: key
            })
            this.props.history.push(`/store/${key}`)
        }
    }
    exitHandler() {
        this.props.actions.logout((currentUser) => {
            if (!currentUser) {
                emitter.emit('message', 'success', '退出成功')
                this.props.history.push(`/login`)
            }
        })
    }
    componentWillMount() {
        emitter.addListener('message', (type, content, duration, onClose) => {
            message.destroy()
            switch (type) {
                case 'error':
                    message.error(content, duration, onClose)
                    break
                case 'warning':
                    message.warning(content, duration, onClose)
                    break
                default:
                    message.success(content, duration, onClose)
            }
        })
        if (!this.props.currentUser) {
            if (this.props.location.pathname.indexOf('/login') < 0) {
                this.props.actions.touch((user) => {
                    if (!user) {
                        this.props.history.replace('/login')
                    } else {
                        if (!matchPath('/login', { path: this.props.location.pathname }) && !this.props.store_list) {
                            this.props.actions.get_store_list(user.id)
                        }
                    }
                })
            }
        }
    }

    componentWillReceiveProps(nextProps: any) {
        if (!nextProps.store_list && nextProps.currentUser) {
            this.props.actions.get_store_list(nextProps.currentUser.id)
        }
    }
    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        const menu = [
            {
                name: '图像',
                route: 'photo',
            },
            {
                name: '统计',
                route: 'statistics',
            }
        ]
        if (this.props.location.pathname.indexOf('/login') > -1) {
            return (
                <UserLayout>
                    {this.props.children}
                </UserLayout>
            );
        } else {
            let { pathname } = this.props.location
            let activeKey = []
            _.map(menu, fun => {
                if (matchPath(pathname, { path: `/store/${fun.route}` }) != null) {
                    activeKey.push(fun.route);
                }
            });
            if (this.props.store_list) {
                return (
                    <BasicLayout
                        navClickHandler={this.navClickHandler.bind(this)}
                        activeKey={activeKey}
                        menu={menu}
                        exitHandler={this.exitHandler.bind(this)}
                        currentUser={this.props.currentUser ? this.props.currentUser : ''}
                    >
                        {this.props.children}
                    </BasicLayout>
                );
            } else {
                return <Spin />
            }
        }
    }
}

export default withRouter(connect(mapProps, mapDispatchToProps)(Site))