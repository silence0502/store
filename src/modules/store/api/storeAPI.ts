import axios from 'axios'
import { stringify } from 'querystringify'

export interface StoreParams {
    page_size?: string,
    page_num?: string,
    store?: string,
}

class StoreAPI {
    photo_list(params?: StoreParams) {
        return axios.get(`/api/photos?${stringify(params)}`)
    }
    photo_info(photo_id) {
        return axios.get(`/api/photos/${photo_id}`)
    }
}

export default new StoreAPI();