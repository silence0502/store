import ActionTypes from '../constants/actionTypes'
import userAPI from '../api/userAPI'

export const login = (params, cb) => (dispatch) => {
    return userAPI.login(params).then((res) => {
        let action = { type: ActionTypes.COMMON_SAY_HELLO, currentUser: res.data }
        dispatch(action);
        if (cb) {
            cb(res.data)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.COMMON_SAY_HELLO, currentUser: null }
        dispatch(action);
        if (cb) {
            cb(null)
        }
    })
};