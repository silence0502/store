import * as React from 'react';
import * as classNames from 'classnames';
import { Menu, Dropdown, Avatar, Button } from 'antd';
import './style/index.scss';
import * as _ from 'lodash';
export interface NavbarProps {
    navClick?;
    activeKey?;
    fun_permissions?;
    logout?;
}
class Navbar extends React.Component<NavbarProps, any> {
    static defaultProps = {
        user: {
            avatar: 'uploads/pic/2017-5-4/bcde1510-3099-11e7-8047-7d8c9b5ab4af.jpg'
        }
    };
    renderMenus() {
        let { navClick, fun_permissions } = this.props;
        return fun_permissions.map((item, i) => {
            return (
                <Menu.Item key={item.route}>{item.name}</Menu.Item>
            );
        });
    }
    clickMenuHandler(e) {
        let { navClick } = this.props;
        let path = e.target.getAttribute('data-href');
        navClick ? navClick(path) : null;
    }
    logout() {
        this.props.logout && this.props.logout();
    }
    handleClick(e) {
        let { navClick } = this.props;
        if (navClick) {
            navClick(e.key);
        }
    }
    render() {
        let logo = require('../../img/logo.png');
        let { activeKey } = this.props;
        const menu = (
            <Menu className="user_menu" style={{ fontSize: '12px' }}>
                <Menu.Item>
                    <a
                        onClick={this.logout.bind(this)}
                        data-href="login"
                        rel="noopener noreferrer"
                        href="javascript:;"
                    >
                        安全退出
          </a>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="navbar">
                <div className="logo-wapper">
                    <img src={logo} />
                </div>
                <div className="menu-wapper">
                    <Menu
                        onClick={this.handleClick.bind(this)}
                        selectedKeys={activeKey}
                        mode="horizontal"
                        style={{ background: 'transparent', color: '#fff', fontSize: '16px' }}
                    >
                        {this.renderMenus()}
                    </Menu>
                </div>
                <div className="avatar-wapper">
                    <div className="avatar">
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="javascript:;">
                                <Avatar
                                    icon="user"
                                    size="large"
                                    style={{ backgroundColor: '#fff', color: '#00b388', margin: '8px 0' }}
                                />
                            </a>
                        </Dropdown>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;
