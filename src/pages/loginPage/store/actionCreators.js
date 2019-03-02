import {APPOINT_LOGIN_PAGE_INPUT_VALUE,
        TRIGGER_IS_LOGGING_IN,
        LOGIN} from './actionTypes'

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