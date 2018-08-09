import * as React from 'react';
require('./SiteLayout.scss');
import Navbar from '../components/navbar';
import { Layout } from 'antd';
const { Content } = Layout;
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import * as PropTypes from 'prop-types';
import { withRouter, matchPath } from 'react-router';
const { connect } = require('react-redux');
import { bindActionCreators } from 'redux';
import HomeActionCreatorsMap, { CommonActions } from '../modules/common/actions/index';
import _ from 'lodash';

import emitter from '../common/emitter';

export interface SiteLayoutProps {
  navClickHandler?: any;
  activeKey?: any;
  exitHandler?: any;
  menu?: any;
  user?: any;
  history?: any;
  fun_permissions?: any;
  location?: any;
}

function mapProps(state: any) {
  return {
    fun_permissions: state.commonReducer.fun_permissions
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(HomeActionCreatorsMap, dispatch)
  };
}

class SiteLayout extends React.Component<SiteLayoutProps, any> {
  static contextTypes = {
    router: PropTypes.object
  };
  constructor(props: any) {
    super(props);
  }
  navClickHandler(key) {
    this.props.history.push(`/${key}`);
  }
  logout() {
    emitter.emit('notification', '退出成功', '', 'success')
    this.props.history.push('/login')
  }
  render() {
    let activeKey: any = []
    let fun_permissions: any = [{ route: 'store', name: '图像' }, { route: 'statistics', name: '统计' }];
    let { pathname } = this.props.location;
    _.map(fun_permissions, fun => {
      if (matchPath(pathname, { path: `/${fun.route}` }) != null) {
        activeKey.push(fun.route);
      }
    });
    return (
      <Layout className="layout">
        <Navbar
          navClick={this.navClickHandler.bind(this)}
          activeKey={activeKey}
          fun_permissions={fun_permissions}
          logout={this.logout.bind(this)}
        />
        <Layout className="page-body">
          <Content className="page-content">{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}
export default withRouter(connect(mapProps, mapDispatchToProps)(SiteLayout));
