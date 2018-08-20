import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import { matchPath } from 'react-router'
import styles from './index.less';
import { Layout, Menu, Icon, Avatar, Dropdown, Input } from 'antd';
import { login } from '../../modules/common/actions/user';
const Search = Input.Search;
const { Header, Footer, Sider, Content } = Layout;
declare let global: any;

export interface HeaderBarProps {
    menu?
    navClickHandler?
    activeKey?
    exitHandler?
    currentUser?
    goSearch?
}

/**
 * 头部导航
 * 
 * @export
 * @class HeaderBar
 * @extends {React.PureComponent<HeaderBarProps, any>}
 */

export default class HeaderBar extends React.PureComponent<HeaderBarProps, any> {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    static defaultProps = {
        menu: [
            {
                name: '图像',
                route: 'photo',
            },
            {
                name: '统计',
                route: 'statistics',
            }
        ],
    };
    static propTypes = {
    };
    handleClick(e) {
        let { navClickHandler } = this.props
        if (navClickHandler) {
            navClickHandler(e.key)
        }
    }
    searchHandler = (value) => {
        this.setState({
            queryKey: ''
        })
        let { goSearch } = this.props
        if (goSearch) {
            goSearch(value)
        }
    }
    renderMenuItem() {
        return _.map(this.props.menu, (item) => {
            return (
                <Menu.Item key={item.route} className={styles.item}>
                    <span>{item.name}</span>
                </Menu.Item >
            )
        })
    }
    exit() {
        this.props.exitHandler();
    }
    render() {
        let { activeKey } = this.props;
        const option = (
            <Menu>
                <Menu.Item><a onClick={this.exit.bind(this)}>退出</a></Menu.Item>
            </Menu>
        );
        return (
            <Header className={styles.header}>
                <div className={styles['nav-wrapper']}>
                    <div className={styles.title}>
                        <img alt="" src={require('../../img/logo.png')} />
                    </div>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        selectedKeys={activeKey}
                        className={styles.nav}
                        onClick={this.handleClick.bind(this)}
                        style={{ color: '#fff' }}
                    >
                        {this.renderMenuItem()}
                    </Menu>
                    <div className={styles.right}>
                        <Avatar icon="user" size="small" style={{ backgroundColor: '#fff', color: '#00b388', marginRight: '8px' }} />
                        <Dropdown overlay={option}>
                            <a className="ant-dropdown-link">
                                <span style={{ color: '#fff', marginRight: '6px' }}>admin</span>
                                <Icon type="down" style={{ color: '#fff' }} />
                            </a>
                        </Dropdown>
                    </div>
                </div>
            </Header>
        );
    }

}
