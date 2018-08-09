import ActionTypes from '../constants/actionTypes'

const merge = require('lodash/merge')

class DeviceState {
    name: string;
    device_list: null;
    device_info: null;
    device_scene_info: null;
    device_noscene_list: null;
    constructor() {
        this.name = 'DEVICE'
    }
}

let deviceReducer = (state = new DeviceState(), action = null) => {
    switch (action.type) {
        case ActionTypes.DEVICE_SAY_HELLO:
            return merge({}, state, action)
        default:
            return state
    }
}

export {
    DeviceState,
    deviceReducer
}