import {TRIGGER_SHOW_MODAL,
    APPOINT_MODAL_MSG,
    TRIGGER_MODAL_IS_LOADING,
    CLEAN_RECYCLE_BIN_modal_saga,
    SUBMIT_COMMENT_WITH_CAPTCHA} from './actionTypes'

export const createTriggerShowModalAction = (value) => ({
    type: TRIGGER_SHOW_MODAL,
    value
})

export const createAppointModalMsgAction = (value) => ({
    type: APPOINT_MODAL_MSG,
    value
})

export const createTriggerModalIsLoadingAction = (value) => ({
    type: TRIGGER_MODAL_IS_LOADING,
    value
})

export const createSubmitCommentWithCaptchaAction = (value) => ({
    type: SUBMIT_COMMENT_WITH_CAPTCHA,
    value
})

export const createCleanRecycleBinAction = (value) => ({
    type: CLEAN_RECYCLE_BIN_modal_saga,
    value
})