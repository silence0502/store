import ActionTypes from '../constants/actionTypes'

const merge = require('lodash/merge')

class StatisticsState {
    name: string;
    constructor() {
        this.name = 'DEMO'
    }
}

let statisticsReducer = (state = new StatisticsState(), action = null) => {
    switch (action.type) {
        case ActionTypes.STATISCS_SAY_HELLO:
            return merge({}, state, action)
        default:
            return state
    }
}

export {
    StatisticsState,
    statisticsReducer
}