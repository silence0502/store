import { Table, Icon, Divider } from 'antd';
import React from 'react';


export interface ChartTableProps {
    data?
    columns?
}

/**
 * 折线图
 * 
 * @export
 * @class LineChart
 * @extends {React.PureComponent<LineChartProps, any>}
 */

export default class ChartTable extends React.PureComponent<ChartTableProps, any> {
  constructor(props){
    super(props);
    this.state ={
    }
  }

  render(){
    return(
      <Table columns={this.props.columns} dataSource={this.props.data} pagination={false}/>
    )
  }
}