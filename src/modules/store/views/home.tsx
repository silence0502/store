import * as React from 'react';
import SplitPane from 'react-split-pane'

import { Switch, Route, Redirect } from 'react-router-dom'

import Store from './store'

import { Tree } from 'antd';

const TreeNode = Tree.TreeNode;


import '../style/index'


export interface HomeProps {
    modalTitle?
    history?
    match?
    location?
}
class Home extends React.PureComponent<HomeProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }
    componentWillMount() {


    }
    componentWillUnmount() {

    }
    renderLeftNav() {
        return (
            <Tree
                defaultExpandedKeys={['0-0-0', '0-0-1']}
                defaultSelectedKeys={['0-0-0', '0-0-1']}
                defaultCheckedKeys={['0-0-0', '0-0-1']}
            >
                <TreeNode title="parent 1" key="0-0">
                    <TreeNode title="parent 1-0" key="0-0-0" >
                        <TreeNode title="leaf" key="0-0-0-0" />
                        <TreeNode title="leaf" key="0-0-0-1" />
                    </TreeNode>
                    <TreeNode title="parent 1-1" key="0-0-1">
                        <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
                    </TreeNode>
                </TreeNode>
            </Tree>
        )
    }
    render() {
        return (
            <div className='store'>
                <SplitPane
                    split="vertical"
                    minSize={100}
                    maxSize={300}
                    style={{ position: 'relative' }}
                    defaultSize={250}
                >
                    <div className="leftBg" >
                        {this.renderLeftNav()}
                    </div>
                    <div className='main' style={{ height: window.innerHeight - 104, overflowY: 'scroll' }}>
                        <Store />
                    </div>
                </SplitPane>
            </div>
        )
    }
}

export default Home;