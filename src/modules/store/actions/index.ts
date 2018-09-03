import { get_photo_list, get_photo_info, delete_photo } from './store'

const HomeActionCreatorsMap = {
    get_photo_list, get_photo_info, delete_photo
}

export interface StoreActions {
    get_photo_list: Function
    get_photo_info: Function
    delete_photo: Function
}

export default HomeActionCreatorsMap;