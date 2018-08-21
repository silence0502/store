import * as React from 'react';
import * as _ from 'lodash';

import { Row, Menu, Icon, Spin } from 'antd';

import SplitPane from 'react-split-pane'
import { Switch, Route, Redirect } from 'react-router-dom'

import Store from '../container/store'
import Charts from '../container/charts'

var qs = require('querystringify')
import { stringify } from 'querystringify'

import styles from '../style/index.less'

class Home extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { page_num } = qs.parse(this.props.location.search)
        let { store_list } = this.props
        this.state = {
            listLoading: false,
            store: store_list[0].id.toString(),
            page_num: page_num ? page_num : 0,
            page_size: 8,
        }
    }
    goPage(current) {
        let page_num = current
        let { page_size, store } = this.state
        let queryObj = {
            page_num, page_size, store
        }
        this.props.history.push(`/store/photo?${stringify({ page_num })}`)
        this.setState({
            page_num: page_num
        });
        this.getDataFn(queryObj)
    }
    getDataFn(queryObj) {
        this.setState({
            listLoading: true
        });
        let self = this
        let { store, page_num, page_size } = queryObj
        this.props.actions.get_photo_list({ store, page_num, page_size }, () => {
            self.setState({
                listLoading: false
            });
        })
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillMount() {
        let { store, page_num, page_size } = this.state
        let queryObj = {
            store, page_num, page_size
        }
        this.getDataFn(queryObj)
    }
    handleClick(e) {
        let { page_num, page_size } = this.state
        let store = e.key
        let queryObj = {
            store, page_num, page_size
        }
        this.getDataFn(queryObj)
        this.setState({
            store: e.key
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
        let pathKey = this.state.store
        return (
            <Menu defaultSelectedKeys={pathKey} mode="inline" onClick={this.handleClick.bind(this)}>
                {this.renderMenuItem()}
            </Menu>
        )
    }
    render() {
        let { match, photo_list } = this.props
        let { listLoading, page_num, page_size } = this.state
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
                            <Route path={`${match.url}/photo`} render={(props) => <Store {...{ photo_list, listLoading, page_num, page_size }} />} goPage={this.goPage.bind(this)} />
                            <Route path={`${match.url}/statistics`} render={() => <Charts />} />
                        </Switch>
                    </div>
                </SplitPane>
            </Row >
        );
    }
}

export default Home;