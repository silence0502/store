const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../actions/index'

import Info from '../views/info'

function mapProps(state) {
    return {
        name: state.deviceReducer.name,
        device_info: state.deviceReducer.device_info,
        device_scene_info: state.deviceReducer.device_scene_info,
        device_noscene_list: state.deviceReducer.device_noscene_list,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(Info)