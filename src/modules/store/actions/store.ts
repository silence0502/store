import ActionTypes from '../constants/actionTypes'
import storeAPI from '../api/storeAPI'

export const get_photo_list = (params, cb) => (dispatch) => {
    return storeAPI.photo_list(params).then((res) => {
        dispatch({ type: ActionTypes.STORE_SAY_HELLO, photo_list: null });
        let action = { type: ActionTypes.STORE_SAY_HELLO, photo_list: res.data }
        dispatch(action);
        if (cb) {
            cb(res.data)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.STORE_SAY_HELLO, photo_list: null }
        dispatch(action);
        if (cb) {
            cb(null)
        }
    })
};

export const get_photo_info = (photo_id, cb) => (dispatch) => {
    return storeAPI.photo_info(photo_id).then((res) => {
        let action = { type: ActionTypes.STORE_SAY_HELLO, photo_info: res.data }
        dispatch(action);
        if (cb) {
            cb(res.data)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.STORE_SAY_HELLO, photo_info: null }
        dispatch(action);
        if (cb) {
            cb(null)
        }
    })
};

export const get_report_info = (photo_id, cb) => (dispatch) => {
    return storeAPI.report_info(photo_id).then((res) => {
        let action = { type: ActionTypes.STORE_SAY_HELLO, report_info: res.data }
        dispatch(action);
        if (cb) {
            cb(res.data)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.STORE_SAY_HELLO, report_info: null }
        dispatch(action);
        if (cb) {
            cb(null)
        }
    })
};

export const delete_photo = (photo_id, cb) => (dispatch) => {
    return storeAPI.photo_delete(photo_id).then((res) => {
        let action = { type: ActionTypes.STORE_SAY_HELLO, id: photo_id }
        dispatch(action);
        if (cb) {
            cb(null, res.data)
        }
    }).catch((err) => {
        if (cb) {
            cb(err, null)
        }
    })
};

export const get_impurity_info = (photo_id, cb) => (dispatch) => {
    return storeAPI.impurity_info(photo_id).then((res) => {
        let action = { type: ActionTypes.STORE_SAY_HELLO, impurity_info: res.data }
        dispatch(action);
        if (cb) {
            cb(res.data)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.STORE_SAY_HELLO, impurity_info: null }
        dispatch(action);
        if (cb) {
            cb(null)
        }
    })
};

export const reset_report_info = () => (dispatch) => {
    return dispatch({ type: ActionTypes.STORE_SAY_HELLO, report_info: null })
}

export const reset_impurity_info = () => (dispatch) => {
    return dispatch({ type: ActionTypes.STORE_SAY_HELLO, impurity_info: null })
}