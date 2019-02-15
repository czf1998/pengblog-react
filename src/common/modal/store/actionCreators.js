import {TRIGGER_SHOW_MODAL,APPOINT_MODAL_MSG} from './actionTypes'

export const createTriggerShowModalAction = (value) => ({
    type: TRIGGER_SHOW_MODAL,
    value
})

export const createAppointModalMsgAction = (value) => ({
    type: APPOINT_MODAL_MSG,
    value
})