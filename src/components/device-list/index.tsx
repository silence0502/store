import * as React from 'react';
import './style/index';
import { Pagination, Input, Button, Alert } from 'antd';
const Search = Input.Search;
import * as uuid from 'uuid';
import * as classNames from 'classnames';
import * as _ from 'lodash';

import DeviceCard from '../device-card/index'
import Loading from '../../common/loading'

export interface DeviceListProps {
    goPage?: any;
    goCreate?: any;
    onSortChange?: any;
    sorts?: any;
    data?: any;
    page_size?: any;
    page_num?: any;
    query_key?: any;
    onSearch?: any;
    goInfo?: any;
}
class DeviceList extends React.Component<DeviceListProps, any> {
    clickHandler(e) {
        let key = e.currentTarget.getAttribute('data-key');
        let sort = e.currentTarget.getAttribute('data-sort');
        let active = e.currentTarget.getAttribute('data-active');
        let _sort =
            active == 'true' ? (sort == 'desc' ? `${key} asc` : `${key} desc`) : `${key} ${sort}`;
        this.props.onSortChange && this.props.onSortChange(_sort);
    }
    goInfo(id) {
        if (this.props.goInfo) {
            this.props.goInfo(id)
        }
    }
    goCreate() {
        if (this.props.goCreate) {
            this.props.goCreate()
        }
    }
    goPage(current) {
        if (this.props.goPage) {
            this.props.goPage(current)
        }
    }
    onSearch(query_key) {
        if (this.props.goPage) {
            this.props.onSearch(query_key)
        }
    }
    renderSort() {
        let { sorts } = this.props;
        return sorts.map(item => {
            let cls = {
                'btn-noborder': item.active ? false : true
            };
            let type: any = item.active ? 'primary' : '';
            let ghost: any = item.active ? 'ghost' : '';
            let name: any = '';
            if (item.key == 'updated_at') {
                name = item.sort == 'desc' ? (
                    <span>
                        时间<i className="anticon anticon-arrow-down" />
                    </span>
                ) : (
                        <span>
                            时间<i className="anticon anticon-arrow-up" />
                        </span>
                    );
            } else {
                name = item.sort == 'desc' ? <span>Z-A</span> : <span>A-Z</span>;
            }
            return (
                <Button
                    className={classNames(cls)}
                    type={type}
                    ghost={ghost}
                    size="small"
                    style={{ borderRadius: '4px' }}
                    data-key={item.key}
                    data-sort={item.sort}
                    data-active={item.active}
                    onClick={this.clickHandler.bind(this)}
                >
                    {name}
                </Button>
            );
        });
    }

    renderDeviceCard() {
        let self = this;
        let data = this.props.data;
        let data_arry = this.props.data.rows;
        if (data.count == 0) {
            return <Alert message="目前没有设备" type="warning" showIcon />;
        } else {
            return _.map(data_arry, function (item) {
                return (
                    <div className="device-col">
                        <DeviceCard data={item} goInfo={self.goInfo.bind(self)} />
                    </div>
                );
            });
        }
    }
    renderList() {
        let { page_size, page_num, query_key, data } = this.props;
        if (!data) {
            return <div style={{ marginTop: (window.innerHeight - 275) / 2 + 'px' }}><Loading /></div>
        }
        return (
            <div>

                <div className="device-cont" style={{ minHeight: window.innerHeight - 275 + 'px' }}>{this.renderDeviceCard()}</div>
                {data.count ? (
                    <div className="device-page-outer">
                        <div className="device-page">
                            <Pagination
                                onChange={this.goPage.bind(this)}
                                pageSize={page_size}
                                total={data.count}
                                current={parseInt(page_num + 1, 10)}
                            />
                        </div>
                    </div>
                ) : (
                        ''
                    )}
            </div>
        );
    }
    render() {
        let { page_size, page_num, data, query_key } = this.props;
        page_num = parseInt(page_num);

        return (
            <div className="device-list">
                <div className="device-sort">
                    <span className="title">排序</span>
                    {this.renderSort()}
                    <Button type="primary" onClick={this.goCreate.bind(this)} style={{ float: 'right', marginRight: '15px', borderRadius: '4px' }}>添加设备</Button>
                    <Search
                        placeholder="请输入设备名称或编号"
                        style={{ width: 200, float: 'right', marginRight: '15px' }}
                        onSearch={value => this.props.onSearch(value)}
                        defaultValue={query_key}
                    />
                </div>
                {this.renderList()}
            </div>
        )
    }
}

export default DeviceList;
