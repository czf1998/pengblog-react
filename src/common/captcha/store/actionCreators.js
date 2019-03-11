import {GET_CAPTCHA_IMAGE,APPOINT_CAPTCHA_CODE,TRIGGER_IS_LOADING_CAPTCHA_IMAGE} from "./actionTypes";


export const createGetCaptchaImageAction = (value) => ({
    type: GET_CAPTCHA_IMAGE,
    value
})

export const createAppointCaptchaCodeAction = (value) => ({
    type: APPOINT_CAPTCHA_CODE,
    value
})

export const createTriggerIsLoadingCaptchaImageAction = (value) => ({
    type: TRIGGER_IS_LOADING_CAPTCHA_IMAGE,
    value
})