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
}

export default new UserAPI();