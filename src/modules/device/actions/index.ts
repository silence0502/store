import * as _ from 'lodash'
import ActionTypes from '../constants/actionTypes'
import axios from 'axios'
import { stringify } from 'querystringify'

/**
* 添加设备
*/
export function createDevice(data, cb) {
    return (dispatch => {
        axios.post(`/api/loudspeaker/device`, data).then((res) => {
            if (cb) {
                cb(null, res.data)
            }
        }).catch((err) => {
            if (cb) {
                cb(err, null)
            }
        })

    })
}

/**
* 设备列表
*/
export function deviceList(params, cb) {
    return (dispatch => {
        dispatch({ type: ActionTypes.DEVICE_SAY_HELLO, device_list: null })
        axios.get(`/api/loudspeaker/device`, {
            params: params
        }).then((res) => {
            let action = { type: ActionTypes.DEVICE_SAY_HELLO, device_list: res.data }
            if (cb) {
                cb(null, res.data)
            }
            dispatch(action)
        }).catch((err) => {
            if (cb) {
                cb(err, null)
            }
        })

    })
}

/**
* 设备详情
*/
export function deviceInfo(id, cb) {
    return (dispatch => {
        dispatch({ type: ActionTypes.DEVICE_SAY_HELLO, device_info: null })
        axios.get(`/api/loudspeaker/device/${id}`)
            .then((res) => {
                let action = { type: ActionTypes.DEVICE_SAY_HELLO, device_info: res.data }
                if (cb) {
                    cb(null, res.data)
                }
                dispatch(action)
            }).catch((err) => {
                if (cb) {
                    cb(err, null)
                }
            })

    })
}

/**
* 绑定场景
*/
export function deviceAddScene(data, cb) {
    return (dispatch => {
        axios.post(`/api/loudspeaker/device_add_scene`, data).then((res) => {
            if (cb) {
                cb(null, res.data)
            }
        }).catch((err) => {
            if (cb) {
                cb(err, null)
            }
        })

    })
}

/**
* 解绑场景
*/
export function deviceDelScene(data, cb) {
    return (dispatch => {
        axios.post(`/api/loudspeaker/device_del_scene`, data).then((res) => {
            if (cb) {
                cb(null, res.data)
            }
        }).catch((err) => {
            if (cb) {
                cb(err, null)
            }
        })

    })
}

/**
* 设备绑定场景详情
*/
export function deviceSceneInfo(id, params, cb) {
    return (dispatch => {
        dispatch({ type: ActionTypes.DEVICE_SAY_HELLO, device_scene_info: null })
        axios.get(`/api/loudspeaker/device/scene/${id}`, {
            params: params
        }).then((res) => {
            let action = { type: ActionTypes.DEVICE_SAY_HELLO, device_scene_info: res.data }
            if (cb) {
                cb(null, res.data)
            }
            dispatch(action)
        }).catch((err) => {
            if (cb) {
                cb(err, null)
            }
        })

    })
}

/**
* 设备未绑定场景列表
*/
export function deviceNoSceneList(id, params, cb) {
    return (dispatch => {
        dispatch({ type: ActionTypes.DEVICE_SAY_HELLO, device_noscene_list: null })
        axios.get(`/api/loudspeaker/device/scene/${id}`, {
            params: params
        }).then((res) => {
            let action = { type: ActionTypes.DEVICE_SAY_HELLO, device_noscene_list: res.data }
            if (cb) {
                cb(null, res.data)
            }
            dispatch(action)
        }).catch((err) => {
            if (cb) {
                cb(err, null)
            }
        })

    })
}

/**
* 修改设备
*/
export function editDevice(id, data, cb) {
    return (dispatch => {
        axios.put(`/api/loudspeaker/device/${id}`, data).then((res) => {
            if (cb) {
                cb(null, res.data)
            }
        }).catch((err) => {
            if (cb) {
                cb(err, null)
            }
        })

    })
}

/**
* 删除设备
*/
export function deleteDevice(id, cb) {
    return (dispatch => {
        axios.delete(`/api/loudspeaker/device/${id}`).then((res) => {
            if (cb) {
                cb(null, res.data)
            }
        }).catch((err) => {
            if (cb) {
                cb(err, null)
            }
        })

    })
}

/**
* 重置详情
*/
export function resetDeviceInfo() {
    return (dispatch => {
        dispatch({ type: ActionTypes.DEVICE_SAY_HELLO, device_info: null });
    })
}

/**
* 重置列表
*/
export function resetDeviceList() {
    return (dispatch => {
        dispatch({ type: ActionTypes.DEVICE_SAY_HELLO, device_list: null });
    })
}

const HomeActionCreatorsMap = {
    'createDevice': createDevice,
    'deviceList': deviceList,
    'deviceInfo': deviceInfo,
    'editDevice': editDevice,
    'deleteDevice': deleteDevice,
    'deviceSceneInfo': deviceSceneInfo,
    'deviceNoSceneList': deviceNoSceneList,
    'deviceAddScene': deviceAddScene,
    'deviceDelScene': deviceDelScene,
    'resetDeviceInfo': resetDeviceInfo,
    'resetDeviceList': resetDeviceList,
}

export default HomeActionCreatorsMap;