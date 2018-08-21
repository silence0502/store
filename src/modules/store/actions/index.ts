import { get_photo_list, get_photo_info } from './store'

const HomeActionCreatorsMap = {
    get_photo_list, get_photo_info
}

export interface StoreActions {
    get_photo_list: Function
    get_photo_info: Function
}

export default HomeActionCreatorsMap;