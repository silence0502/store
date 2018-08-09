import * as React from 'react';
import { Button } from 'antd'
import DeviceList from '../../../components/device-list/index'
import qs from 'querystringify'
import { stringify } from 'querystringify'
import * as _ from 'lodash';
import '../style/index'

import Loading from '../../../common/loading'

export interface ListProps {
    modalTitle?
    history?
    match?
    actions?
    location?
    device_list?
}
class List extends React.PureComponent<ListProps, any> {
    constructor(props: any) {
        super(props);
        let { sort, page_num, query_key } = qs.parse(this.props.location.search)
        this.state = {
            listLoading: false,
            sort: sort ? sort : 'updated_at desc',
            page_num: page_num ? page_num : 0,
            page_size: 12,
            query_key: query_key ? query_key : ''
        };
    }
    goInfo(id) {
        let { match } = this.props
        this.props.history.push(`info/${id}`)
    }
    goCreate() {
        let { match } = this.props
        this.props.history.push(`create`)
    }
    sortChangeHandler(sort) {
        let { page_size, page_num, query_key } = this.state
        let queryObj = {
            page_size, page_num, sort, query_key
        }
        this.props.history.push(`/device/list?${stringify(queryObj)}`)
        this.setState({
            sort: sort
        });
        this.getData(queryObj)
    }
    searchHandler(query_key) {
        let { page_size, sort } = this.state
        let page_num = 0
        let queryObj = { page_num, sort, query_key, page_size }
        this.props.history.push(`/device/list?${stringify(queryObj)}`)
        this.setState({
            page_num, query_key
        });
        this.getData(queryObj)
    }
    goPage(current) {
        let page_num = current - 1
        let { page_size, sort, query_key } = this.state
        let queryObj = {
            page_size, page_num, sort, query_key
        }
        this.props.history.push(`/device/list?${stringify(queryObj)}`)
        this.setState({
            page_num: page_num
        });
        this.getData(queryObj)
    }
    getData(queryObj) {
        this.setState({
            listLoading: true
        });
        this.props.actions.deviceList(queryObj, (data, err) => {
            this.setState({
                listLoading: false
            });
        })
    }
    componentDidMount() {

    }
    componentWillMount() {
        let { page_size, page_num, sort, query_key } = this.state
        let queryObj = {
            page_size, page_num, sort, query_key
        }
        this.getData(queryObj)
    }
    componentWillUnmount() {
        this.props.actions.resetDeviceList()
    }
    render() {
        let sorts_data = [
            { key: 'updated_at', active: false, sort: 'desc' },
            { key: 'name', active: false, sort: 'asc' },
        ]
        _.map(sorts_data, (sort) => {
            let _sort = this.state.sort.split(' ')
            if (sort.key == _sort[0]) {
                sort.active = true
                sort.sort = _sort[1]
            }
        })
        let { device_list } = this.props

        return (
            <div>
                <div className="container" style={{ background: '#fff', margin: '0 0 32px 0', minHeight: window.innerHeight - 130 + 'px', padding: '8px' }}>
                    <DeviceList
                        sorts={sorts_data}
                        onSortChange={this.sortChangeHandler.bind(this)}
                        onSearch={this.searchHandler.bind(this)}
                        data={this.props.device_list}
                        goInfo={this.goInfo.bind(this)}
                        goPage={this.goPage.bind(this)}
                        goCreate={this.goCreate.bind(this)}
                        page_num={this.state.page_num}
                        query_key={this.state.query_key}
                        page_size={this.state.page_size}
                    />
                </div>
            </div>
        )

    }
}

export default List;