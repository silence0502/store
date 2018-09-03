import { login, logout, touch } from './user'
import { get_store_list } from './common'

const HomeActionCreatorsMap = {
    login, get_store_list, logout, touch
}

export interface CommonActions {
    login: Function
    logout: Function
    touch: Function
    get_store_list: Function
}

export default HomeActionCreatorsMap;