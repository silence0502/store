const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../actions/index'

import Home from '../views/home'

function mapProps(state) {
    return {
        name: state.demoReducer.name,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(Home)