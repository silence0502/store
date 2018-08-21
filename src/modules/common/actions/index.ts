import { login } from './user'
import { get_store_list } from './common'

const HomeActionCreatorsMap = {
    login, get_store_list
}

export interface CommonActions {
    login: Function
    get_store_list: Function
}

export default HomeActionCreatorsMap;