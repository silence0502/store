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
            <div>left</div>
        )
    }
    render() {
        let { match } = this.props
        return (
            <div className='store'>
                <SplitPane
                    split="vertical"
                    minSize={100}
                    maxSize={300}
                    defaultSize={300}
                >
                    <div className="leftBg">
                        {this.renderLeftNav()}
                    </div>
                    <div className='main'>
                        <Store />
                    </div>
                </SplitPane>
            </div>
        )

    }
}

export default Home;