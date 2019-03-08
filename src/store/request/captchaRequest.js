import axios from "axios";
import * as Api from "../apiConstant";

export function RequestCaptchaImage(captchaId) {
    let config = {
        params: {
            captchaId: captchaId
        }
    }
    return axios.get(Api.API_GET_CAPTCHA, config)
}

export function RequestCheck(value){
    let config = {
        params: {
            captchaId: value.captchaId,
            uncheckCaptchaCode: value.uncheckCaptchaCode
        }
    }
    return axios.get(Api.API_CHECK_CAPTCHA, config)
}