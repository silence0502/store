import * as React from 'react';
import * as _ from 'lodash';

import { Row, Menu, Icon } from 'antd';
import SplitPane from 'react-split-pane'
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import Store from '../container/store'
import Charts from '../container/charts'
import styles from '../style/index.less'

class Home extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillMount() {

    }
    componentWillReceiveProps(nextProps) {

    }
    renderLeftNav() {
        let path = this.props.location.pathname
        let pathKey = path.replace('/setting/', '');
        if (pathKey.indexOf('setting') < 0) {
            return (
                <Menu defaultSelectedKeys={pathKey} mode="inline">
                    <Menu.Item key="1">
                        <Icon type="shop" />望京店
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="shop" />东直门店
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="shop" />西直门店
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="shop" />中关村店
                    </Menu.Item>
                </Menu>
            )
        }
    }
    render() {
        let { match } = this.props
        return (
            <Row className={styles.resource}>
                <SplitPane
                    split="vertical"
                    minSize={100}
                    maxSize={270}
                    style={{ height: '', maxHeight: window.innerHeight - 64 }}
                    defaultSize={236} >
                    {this.renderLeftNav()}
                    <div className={styles.main} style={{ minHeight: window.innerHeight - 104 }}>
                        <Switch>
                            <Redirect from={`${match.url}`} to={`${match.url}/photo`} exact />
                            <Route path={`${match.url}/photo`} component={Store} />
                            <Route path={`${match.url}/statistics`} component={Charts} />
                        </Switch>
                    </div>
                </SplitPane>
            </Row >
        );
    }
}

export default Home;