import {APPOINT_CURRENT_PATH} from './actionTypes'

export const createAppointCurrentPathAction = (value) => ({
    type: APPOINT_CURRENT_PATH,
    value
})