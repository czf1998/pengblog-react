import * as Api from '../apiConstant'
import axios from 'axios'

export function RequestLogin(value) {
    let loginInfo = {
        username: value.username,
        password: value.password
    }
    return axios.post(Api.API_LOGIN, loginInfo)
}

