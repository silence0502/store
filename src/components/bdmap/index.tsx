import React from 'react';
declare let BMap: any;

export interface BdMapProps {
    data?: any;
}

export default class BdMap extends React.PureComponent<BdMapProps, any> {
    mapContain: any
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        let { data } = this.props
        let map = new BMap.Map('mapContain')
        // 创建地图实例  
        // let point = new BMap.Point(116.404, 39.915)
        // 创建点坐标  
        //map.centerAndZoom(point, 5)
        map.centerAndZoom("河南", 5);
        // 禁用鼠标滚轮放大缩小
        // map.disableScrollWheelZoom()
        map.enableScrollWheelZoom(true)
        // 禁用双击发达地图
        map.disableDoubleClickZoom()
        // 添加覆盖物
        for (let i = 0; i < data.length; i++) {
            var myIcon = new BMap.Icon(require('./image/mapicon.png'), new BMap.Size(10, 10));
            map.addOverlay(new BMap.Marker(new BMap.Point(data[i][0], data[i][1]), { icon: myIcon }))
        }

    }

    render() {
        // 高度必须加，class 去水印
        return (
            <div id='mapContain'
                className='themap'
                ref={(node) => { this.mapContain = node }}
                style={{ height: '300px' }}>
            </div>
        );
    }

}
