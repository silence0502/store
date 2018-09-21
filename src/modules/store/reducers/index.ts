import ActionTypes from '../constants/actionTypes'

const merge = require('lodash/merge')

class StoreState {
    name: string;
    store_list: Object
    photo_list: Object
    photo_info: Object
    report_info: Object
    constructor() {
        this.name = 'STORE'
        this.store_list = {}
        this.photo_list = {}
        this.photo_info = {}
        this.report_info = []
    }
}

let storeReducer = (state = new StoreState(), action = null) => {
    switch (action.type) {
        case ActionTypes.STORE_SAY_HELLO:
            return merge({}, state, action)
        default:
            return state
    }
}

export {
    StoreState,
    storeReducer
}