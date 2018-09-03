import axios from 'axios'

export interface LoginParams {
    email: string,
    password: string
}

class UserAPI {
    login(params: LoginParams) {
        return axios.post(`/store_api/login`, params, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }
    touch(user_id) {
        return axios.get(`/store_api/users/${user_id}`)
    }
}

export default new UserAPI();