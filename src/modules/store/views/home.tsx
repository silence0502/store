import * as React from 'react';
import * as _ from 'lodash';

import { Row, Menu, Icon, Spin } from 'antd';

import SplitPane from 'react-split-pane'
import { Switch, Route, Redirect } from 'react-router-dom'

import Store from '../container/store'
import Charts from '../container/charts'

import styles from '../style/index.less'

class Home extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { store_list } = this.props
        this.state = {
            store_id: store_list ? store_list : ''
        }
    }
    componentWillMount() {
        let user_info = JSON.parse(localStorage.getItem('user_info'))
        this.props.actions.get_store_list(user_info.id)
    }
    componentWillReceiveProps(nextProps) {

    }
    handleClick(e) {
        this.setState({
            store_id: e.key
        })
    }
    renderMenuItem() {
        let { store_list } = this.props
        return (
            store_list.map((item, index) => {
                return (
                    <Menu.Item key={item.id}>
                        <Icon type="shop" />{item.name}
                    </Menu.Item>
                )
            })
        )
    }
    renderLeftNav() {
        let pathKey = this.state.store_id
        return (
            <Menu defaultSelectedKeys={pathKey} mode="inline" onClick={this.handleClick.bind(this)}>
                {this.renderMenuItem()}
            </Menu>
        )
    }
    render() {
        let { match } = this.props
        let { store_id } = this.state
        if (this.props.store_list) {
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
                                <Route path={`${match.url}/photo`} render={() => <Store {...{ store_id }} />} />
                                <Route path={`${match.url}/statistics`} render={() => <Charts {...{ store_id }} />} />
                            </Switch>
                        </div>
                    </SplitPane>
                </Row >
            );
        } else {
            return <Spin />
        }
    }
}

export default Home;