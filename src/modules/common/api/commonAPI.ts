import axios from 'axios'

export interface CommonParams {

}

class CommonAPI {
    store_list(user_id) {
        return axios.get(`/api/stores/${user_id}`)
    }
}

export default new CommonAPI();