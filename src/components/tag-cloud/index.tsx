import React from 'react';

import './style/index';
declare let tagcloud: any;
export interface TagCloudProps {
    data?: any
    goInfo?
}

export default class TagCloud extends React.PureComponent<TagCloudProps, any> {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    goInfo(id) {
        if (this.props.goInfo) {
            this.props.goInfo(id)
        }
    }
    componentDidMount() {
        tagcloud({
            selector: ".tagcloud",  //元素选择器
            fontsize: 14,       //基本字体大小, 单位px
            radius: 80,         //滚动半径, 单位px
            mspeed: "normal",   //滚动最大速度, 取值: slow, normal(默认), fast
            ispeed: "normal",   //滚动初速度, 取值: slow, normal(默认), fast
            direction: 180,     //初始滚动方向, 取值角度(顺时针360): 0对应top, 90对应left, 135对应right-bottom(默认)...
            keep: false          //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
        })

    }
    renderTag() {
        let { data } = this.props
        return data.map(item => {
            return <a title={item.word} onClick={this.goInfo.bind(this, item.sceneId)}>{item.word}</a>
        })
    }
    render() {
        return (
            <div className="tag-wrapper">
                <div className="tagcloud">
                    {this.renderTag()}
                </div>
            </div>
        );
    }
}