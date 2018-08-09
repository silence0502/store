import * as React from 'react';
import * as classNames from 'classnames';
import { Button } from 'antd';
import './style/index.scss';

import * as _ from 'lodash';
export interface NavbarProps {
    data?
    changeFilter?

}
class SceneFilter extends React.Component<NavbarProps, any> {
    static defaultProps = {
        // user: {}
        data: [
            {
                name: '类型',
                val: 'type',
                act: '',
                child: [
                    { name: '全部', val: '' },
                    { name: '生活', val: '1' },
                    { name: '娱乐', val: '2' },
                    { name: '信息查询', val: '3' }
                ]
            },
            {
                name: '来源',
                val: 'source',
                act: '',
                child: [
                    { name: '全部', val: '' },
                    { name: '云场景', val: '2001' },
                    { name: '自定义', val: '2002' }
                ]
            }
        ]

    }
    changeFilter(index, val) {
        this.props.changeFilter(index, val);
    }
    renderItem() {
        let { data } = this.props
        return data.map((item, index) => {
            let childData = item.child
            let btnArr = []
            for (let i = 0; i < childData.length; i++) {
                let btnType = item.act === childData[i].val ? 'primary' : 'default'
                let btn = <Button type={btnType} size="small" onClick={this.changeFilter.bind(this, index, childData[i].val)}>{childData[i].name}</Button>
                btnArr.push(btn)

            }
            return (
                <div className="filter-item">
                    <span className="title">{item.name}</span>
                    {btnArr}
                </div>
            );
        });
    }
    render() {

        return (
            <div className="scenes-filter">

                {this.renderItem()}
            </div>
        )
    }
}
export default SceneFilter;
