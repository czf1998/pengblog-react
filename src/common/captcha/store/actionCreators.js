import {GET_CAPTCHA_IMAGE,APPOINT_CAPTCHA_CODE} from "./actionTypes";


export const createGetCaptchaImageAction = (value) => ({
    type: GET_CAPTCHA_IMAGE,
    value
})

export const createAppointCaptchaCodeAction = (value) => ({
    type: APPOINT_CAPTCHA_CODE,
    value
})