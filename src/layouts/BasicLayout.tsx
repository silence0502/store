import * as React from 'react';
import styles from './BasicLayout.less';
import HeaderBar from '../components/HeaderBar/';
import { Layout } from 'antd';
import _ from 'lodash';
const { Content } = Layout;
import {
  HashRouter as Router,
  Switch,
  Route, Link
} from 'react-router-dom'
import emitter from '../common/emitter';

import { withRouter, matchPath } from 'react-router';

export interface BasicLayoutProps {
  navClickHandler?
  exitHandler?
  menu?
  history?
  location?
  activeKey?
}

export default class BasicLayout extends React.Component<BasicLayoutProps, any> {

  static contextTypes = {
  }
  constructor(props: any) {
    super(props);
    this.state = {
    };
  }
  // logout() {
  //   emitter.emit('notification', '退出成功', '', 'success')
  //   this.props.history.push('/login')
  // }
  render() {
    return (
      <Layout className={styles['layout']}>
        <HeaderBar navClickHandler={this.props.navClickHandler} exitHandler={this.props.exitHandler} activeKey={this.props.activeKey} />
        <Layout className={styles['page-body']}>
          <Content className={styles['page-content']}>{this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
