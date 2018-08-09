import * as React from 'react';
import Charts from './charts'
import { Button, Row, Col, Tree } from 'antd'
import LineChart from '../../../components/line-chart/index'
import PieChart from '../../../components/pie-chart/index'
import TagCloud from '../../../components/tag-cloud/index'
import SectionHeader from '../../../components/section-header/index'
import SplitPane from 'react-split-pane'
import '../style/index'

const TreeNode = Tree.TreeNode

class Home extends React.Component<any, any> {
    mapContain: any
    constructor(props: any) {
        super(props);
        this.state = {

        };
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
        let { match } = this.props
        return (
            <div className='charts'>
                <SplitPane
                    split="vertical"
                    minSize={100}
                    maxSize={500}
                    style={{ position: 'relative' }}
                    defaultSize={250}
                >
                    <div className="leftBg">
                        {this.renderLeftNav()}
                    </div>
                    <div className='main' style={{ height: window.innerHeight - 104, overflowY: 'scroll' }}>
                        <Charts />
                    </div>
                </SplitPane>
            </div>
        )

    }
}

export default Home;