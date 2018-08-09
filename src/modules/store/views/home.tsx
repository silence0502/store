import * as React from 'react';
import SplitPane from 'react-split-pane'

import { Switch, Route, Redirect } from 'react-router-dom'

import Store from './store'

import { Row, Col, Breadcrumb, Icon, Tabs, Button, Input, Menu } from 'antd';
import '../style/index'


export interface HomeProps {
    modalTitle?
    history?
    match?
    location?
}
class Home extends React.PureComponent<HomeProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }
    componentWillMount() {


    }
    componentWillUnmount() {

    }
    renderLeftNav() {
        return (
            <Menu mode="inline">
                <Menu.Item key="user">
                    <Icon type="solution" />用户管理
                    </Menu.Item>
                <Menu.Item key="log">
                    <Icon type="form" />日志管理
                    </Menu.Item>
            </Menu>
        )
    }
    render() {
        let { match } = this.props
        return (
            <Row className='store'>
                <SplitPane
                    split="vertical"
                    minSize={100}
                    maxSize={300}
                    defaultSize={200}
                >
                    <div className="sideBar">
                        {this.renderLeftNav()}
                    </div>
                    <div className='main'>
                        <Switch>
                            <Route path={`${match.url}/home`} exact component={Store} />}
                        </Switch>
                    </div>
                </SplitPane>
            </Row>
        )

    }
}

export default Home;