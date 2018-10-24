import * as React from 'react';
import * as _ from 'lodash';

import { Row, Menu, Icon, message } from 'antd';

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
        let { page_num, store_num } = qs.parse(this.props.location.search)
        let { store_list } = this.props
        this.state = {
            listLoading: false,
            store_num: store_num ? store_num : store_list[0].id.toString(),
            page_num: page_num ? page_num : 0,
            page_size: 8,
        }
    }
    goPage(current) {
        let page_num = current - 1
        let { page_size, store_num } = this.state
        let queryObj = {
            page_num, page_size, store_num
        }
        this.props.history.push(`/store/photo?${stringify({ store_num, page_num })}`)
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
        let { store_num, page_num, page_size } = queryObj
        let store = store_num
        this.props.actions.get_photo_list({ store, page_num, page_size }, () => {
            self.setState({
                listLoading: false
            });
        })
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillMount() {
        let { store_num, page_num, page_size } = this.state
        let queryObj = {
            store_num, page_num, page_size
        }
        this.getDataFn(queryObj)
    }
    handleClick(e) {
        let { page_size } = this.state
        let store_num = e.key
        let page_num = 0
        let queryObj = {
            store_num, page_num, page_size
        }
        this.props.history.push(`/store/photo?${stringify({ store_num, page_num })}`)
        this.getDataFn(queryObj)
        this.setState({
            store_num: e.key,
            page_num: 0
        })
    }
    doDelete(id) {
        let { page_num, page_size, store_num } = this.state
        let queryObj: any = {}
        this.props.actions.delete_photo(id, (err, data) => {
            if (data) {
                message.success('删除成功')
                if (this.props.photo_list.rows.length === 1 && parseInt(page_num, 10) > 0) {
                    page_num = parseInt(page_num, 10) - 1
                    queryObj = { store_num, page_num, page_size }
                } else {
                    queryObj = { store_num, page_num, page_size }
                }
                this.props.history.push(`/store/photo?${stringify({ store_num, page_num })}`)
                this.getDataFn(queryObj)
                this.setState({
                    page_num: page_num
                })
            }
            if (err) {
                message.error('删除失败')
            }
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
        let pathKey = this.state.store_num
        return (
            <Menu defaultSelectedKeys={pathKey} mode="inline" onClick={this.handleClick.bind(this)}>
                {this.renderMenuItem()}
            </Menu>
        )
    }
    render() {
        let { match, photo_list } = this.props
        let { listLoading, page_num, page_size, store_num } = this.state
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
                            <Route path={`${match.url}/photo`} render={(props) => <Store {...{ photo_list, listLoading, page_num, page_size }} goPage={this.goPage.bind(this)} doDelete={this.doDelete.bind(this)} />} />
                            <Route path={`${match.url}/statistics`} render={() => <Charts />} />
                        </Switch>
                    </div>
                </SplitPane>
            </Row >
        )
    }
}

export default Home;