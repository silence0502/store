import * as React from 'react';
import './style/index';
import { Pagination, Input, Button, Alert } from 'antd';
const Search = Input.Search;
import * as uuid from 'uuid';
import * as classNames from 'classnames';
import * as _ from 'lodash';

import SceneCard from '../scene-card/index'
import Loading from '../../common/loading'

export interface SceneListProps {
    goPage?: any;
    goCreate?: any
    onSortChange?: any;
    sorts?: any;
    data?: any;
    page_size?: any;
    page_num?: any;
    query_key?: any;
    onSearch?: any;
    goInfo?: any;
}
class SceneList extends React.Component<SceneListProps, any> {
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

    renderSceneCard() {
        let self = this;
        let data = this.props.data;

        let data_arry = this.props.data.rows;
        if (data.count == 0) {
            return <Alert message="目前没有场景" type="warning" showIcon />;
        } else {
            return _.map(data_arry, function (item) {
                return (
                    <div className="scene-col">
                        <SceneCard data={item} goInfo={self.goInfo.bind(self)} />
                    </div>
                );
            });
        }
    }
    renderList() {
        let { page_size, page_num, query_key, data } = this.props;
        if (!data) {
            return <div style={{ marginTop: (window.innerHeight - 350) / 2 + 'px' }}><Loading /></div>
        }
        return (
            <div>
                <div className="scene-cont" style={{ minHeight: window.innerHeight - 350 + 'px' }}>{this.renderSceneCard()}</div>
                {data.count ? (
                    <div className="scene-page-outer">
                        <div className="scene-page">
                            <Pagination
                                onChange={this.goPage.bind(this)}
                                pageSize={page_size}
                                current={parseInt(page_num + 1, 10)}
                                total={data.count}
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
            <div className="scene-list">
                <div className="scene-sort">
                    <span className="title">排序</span>
                    {this.renderSort()}
                    <Button type="primary" onClick={this.goCreate.bind(this)} style={{ float: 'right', marginRight: '15px', borderRadius: '4px' }}>创建场景</Button>
                    <Search
                        placeholder="请输入场景名称"
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

export default SceneList;
