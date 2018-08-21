import { login, logout } from './user'
import { get_store_list } from './common'

const HomeActionCreatorsMap = {
    login, get_store_list, logout
}

export interface CommonActions {
    login: Function
    logout: Function
    get_store_list: Function
}

export default HomeActionCreatorsMap;