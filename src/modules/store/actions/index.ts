import { get_photo_list, get_photo_info, delete_photo, get_report_info, reset_report_info, get_impurity_info, reset_impurity_info } from './store'

const HomeActionCreatorsMap = {
    get_photo_list, get_photo_info, delete_photo, get_report_info, reset_report_info, get_impurity_info, reset_impurity_info
}

export interface StoreActions {
    get_photo_list: Function
    get_photo_info: Function
    delete_photo: Function
    get_report_info: Function
    reset_report_info: Function
    get_impurity_info: Function
    reset_impurity_info: Function
}

export default HomeActionCreatorsMap;