import {APPOINT_LOGIN_PAGE_INPUT_VALUE,
        TRIGGER_IS_LOGGING_IN,
        LOGIN,
        TRIGGER_SHOW_WARN_OF_INPUT_OF_LOGIN_PAGE,
        GET_SMS,
        COUNT_DOWN_SMS_SECOUND} from './actionTypes'

export const createAppointLoginPageInputValueAction = (value) => ({
    type: APPOINT_LOGIN_PAGE_INPUT_VALUE,
    value
})

export const createTriggerIsLoggingInAction = (value) => ({
    type: TRIGGER_IS_LOGGING_IN,
    value
})

export const createLoginAction = (value) => ({
    type: LOGIN,
    value
})

export const createTriggerShowWarnOfInputOfLoginPageAction = (value) => ({
    type: TRIGGER_SHOW_WARN_OF_INPUT_OF_LOGIN_PAGE,
    value
})

export const createGetSmsAction = () => ({
    type: GET_SMS
})

export const createCountDownSmsSecondAction = () => ({
    type: COUNT_DOWN_SMS_SECOUND
})
