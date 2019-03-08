import * as Api from '../apiConstant'
import axios from 'axios'

export function RequestLogin(value) {
    let loginInfo = {
        username: value.username,
        password: value.password,
        captchaId: value.captchaId,
        captchaCode: value.captchaCode
    }
    return axios.post(Api.API_LOGIN, loginInfo)
}

