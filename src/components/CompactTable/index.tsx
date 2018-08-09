import React from 'react';
import { Table, Icon, Divider, Pagination } from 'antd';
import './index';
// import moment from '../../common/moment'
import * as _ from 'lodash';

export interface CompactTableProps {
    // pageAuth?
    // showModal?
    // page_num?
    // page_size?
    data?
    goPage?
    goLink?
    goEdit?
    goDelete?
    goBackup?       // 备份
    goRecover?      // 恢复
    actionAuth?     // [ 'edit','delete','backup','recover' ] -- 操作权限
    actionWidth?    // 操作宽度
    footInfoAuth?   // 页脚信息
    outStyle?
    selectAuth?     // 选择权限
    sortAuth?       // 排序权限
    selectRow?
    pageSize?
    loading?
    size?           // {y:185},传size，需在header里添加width
}

export default class CompactTable extends React.PureComponent<CompactTableProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            page_num: 1,
            page_size: this.props.pageSize ? this.props.pageSize : 10,
        };
    }
    static defaultProps = {

    }
    goEdit(record) {
        if (this.props.goEdit) {
            this.props.goEdit(record)
        }
    }
    goDelete(record) {
        if (this.props.goDelete) {
            this.props.goDelete(record)
        }
    }
    goBackup(record) {
        if (this.props.goBackup) {
            this.props.goBackup(record)
        }
    }
    goRecover(record) {
        if (this.props.goRecover) {
            this.props.goRecover(record)
        }
    }
    goPage(current) {
        this.setState({ page_num: current })
        if (this.props.goPage) {
            this.props.goPage(current)
        }
    }
    goLink(record) {
        if (this.props.goLink) {
            this.props.goLink(record.id)
        }
    }
    renderTable() {
        let { actionAuth, data, selectAuth, selectRow, loading, size, sortAuth, pageSize } = this.props
        let header = data.header || []
        let dataList: any = _.merge([], data.dataList)
        let columns = []
        for (let i = 0; i < header.length; i++) {
            let obj: any = {
                title: header[i].title,
                dataIndex: header[i].key,
                key: header[i].key,
                fixed: header[i].fixed ? 'left' : null,
                width: header[i].width ? header[i].width : null,
                sorter: sortAuth ? (a, b) => {

                    let aV = a[header[i].key]
                    let bV = b[header[i].key]
                    if (isNaN(aV)) {
                        return aV.charCodeAt(0) - bV.charCodeAt(0)
                    } else {
                        return aV - bV
                    }
                } : null,
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
                width: this.props.actionWidth ? this.props.actionWidth : 150,
                render: (text, record) => {
                    let actionArr = []
                    for (let i = 0; i < actionAuth.length; i++) {
                        switch (actionAuth[i]) {
                            case 'edit':
                                actionArr.push(<a onClick={this.goEdit.bind(this, record)} id={record.id} href="javascript:;" type="vertical">编辑</a>)
                                break
                            case 'delete':
                                actionArr.push(<a onClick={this.goDelete.bind(this, record)} id={record.id} href="javascript:;" type="vertical">删除</a>)
                                break
                            case 'backup':
                                actionArr.push(<a onClick={this.goBackup.bind(this, record)} id={record.id} href="javascript:;" type="vertical">备份</a>)
                                break
                            case 'recover':
                                actionArr.push(<a onClick={this.goRecover.bind(this, record)} id={record.id} href="javascript:;" type="vertical">恢复</a>)
                                break
                            default:
                                break
                        }
                        if (i < actionAuth.length - 1) {
                            actionArr.push(<Divider type="vertical" />)
                        }
                    }
                    return (
                        <span>{actionArr}</span>
                    )
                }
            })
        }
        let { page_num, page_size } = this.state

        _.map(dataList, function (item: any, index) {
            item.key = page_num * page_size + index
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
        if (size && size.y) {
            area.y = size.y
        }
        let rowSelection = null
        if (selectAuth) {
            rowSelection = {
                onChange: (selectedRowKeys, selectedRows) => {
                    if (selectRow) {
                        selectRow(selectedRows)
                    }
                },
                getCheckboxProps: record => ({
                    disabled: record.hasChecked, // Column configuration not to be checked
                }),
            }
        }

        return (
            <Table size="small" scroll={area} rowSelection={rowSelection}
                pagination={{ pageSize: pageSize }}
                className='smalltable'
                columns={columns}
                dataSource={dataList}
                loading={loading} />
        )
    }
    render() {
        let { data, goPage, footInfoAuth, outStyle, loading } = this.props
        if (!data) {
            return (
                <div />
            )
        }
        let { page_size, page_num } = this.state
        let count = data ? data.totalCount : 0
        return (
            <div className='compactTable' style={outStyle}>
                {this.renderTable()}
                {/* <div className=''>
                    {footInfoAuth ? (<div style={{ marginTop: '10px' }}>{footInfoAuth}</div>) : ''}
                    {(count > page_size) ? (
                        <div style={{ margin: '10px 0', textAlign: 'center' }}>
                            <Pagination size="small"
                                className=''
                                onChange={this.goPage.bind(this)}
                                total={count}
                                current={parseInt(data.pageNo, 10)}
                                pageSize={page_size}
                                showQuickJumper />
                        </div>
                    ) : ''}
                </div> */}

            </div>
        );
    }
}