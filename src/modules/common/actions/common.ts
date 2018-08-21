import ActionTypes from '../constants/actionTypes'
import commonAPI from '../api/commonAPI'

export const get_store_list = (user_id, cb) => (dispatch) => {
    return commonAPI.store_list(user_id).then((res) => {
        let action = { type: ActionTypes.COMMON_SAY_HELLO, store_list: res.data }
        dispatch(action);
        if (cb) {
            cb(res.data)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.COMMON_SAY_HELLO, store_list: null }
        dispatch(action);
        if (cb) {
            cb(null)
        }
    })
};