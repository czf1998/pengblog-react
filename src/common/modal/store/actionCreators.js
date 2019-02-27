import {TRIGGER_SHOW_MODAL,APPOINT_MODAL_MSG,TRIGGER_MODAL_IS_LOADING} from './actionTypes'

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