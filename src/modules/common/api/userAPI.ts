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
    logout() {
        return axios.get(`/store_api/logout`)
    }
    touch() {
        return axios.get(`/store_api/users/touch`)
    }
}

export default new UserAPI();