import React from 'react';
import { Table, Icon, Divider, Pagination } from 'antd';
import './style/index';
import * as _ from 'lodash';

export interface SdTableProps {
    data?
    doCancel?
    goLink?
    actionAuth? // 操作权限
}

export default class SdTable extends React.PureComponent<SdTableProps, any> {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    doCancel(record) {
        let id = record.id
        if (this.props.doCancel) {
            this.props.doCancel(id)
        }
    }
    goLink(record) {
        if (this.props.goLink) {
            this.props.goLink(record.id)
        }
    }
    renderTable() {
        let { actionAuth, data } = this.props
        let header = data.header
        let dataList: any = _.merge([], data.dataList)
        dataList.map((item, index) => {
            item.key = item.id
            switch (item.category) {
                case '1':
                    item.category = '生活'
                    break;
                case '2':
                    item.category = '娱乐'
                    break;
                case '3':
                    item.category = '信息查询'
                    break;
                default:
                    break;
            }
        })
        let columns = []
        for (let i = 0; i < header.length; i++) {
            let obj: any = {
                title: header[i].title,
                dataIndex: header[i].key,
                key: header[i].key
            }
            if (header[i].link) {
                obj.render = (text, record) => <a href="javascript:;" onClick={this.goLink.bind(this, record)}>{text}</a>
            }
            columns.push(obj)
        }
        if (actionAuth && actionAuth.length > 0) {
            columns.push({
                title: '操作',
                key: 'action',
                width: 150,
                render: (text, record) => (
                    <span>
                        {actionAuth.indexOf('delete') > -1 ? (
                            <a onClick={this.doCancel.bind(this, record)} rel={record.name} id={record.id} href="javascript:;" type="vertical">取消绑定</a>
                        ) : ''}

                    </span>
                )
            })
        }
        let area: any = { x: '100%' }
        switch (true) {
            case header.length > 6 && header.length <= 10:
                area = { x: 1100 }
                break;
            case header.length > 10:
                area = { x: 1800 }
                break;
            default:
                break;
        }
        return (
            <Table
                bordered={true}
                scroll={area}
                pagination={false}
                className='smalltable'
                columns={columns}
                dataSource={dataList} />
        )
    }
    render() {
        let { data } = this.props
        if (!data) {
            return (
                <div />
            )
        }
        return (
            <div className='compactTable'>
                {this.renderTable()}
            </div>
        );
    }
}