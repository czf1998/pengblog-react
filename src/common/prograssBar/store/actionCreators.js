import { APPOINT_NANOBAR_GO_HANDLER, RESET_PROGRASS_BAR, APPOINT_NANOBAR_MANAGER, RECORD_NANOBAR_TIMER } from './actionType'

export const createRecordNanobarTimerAction = (value) => ({
    type: RECORD_NANOBAR_TIMER,
    value
})


export const createAppointNanobarManagerAction = (value) => ({
    type: APPOINT_NANOBAR_MANAGER,
    value
})


export const createResetPrograssBarAction = () => ({
    type: RESET_PROGRASS_BAR
})


export const createAppointNanobarGoAction = (value) => ({
    type: APPOINT_NANOBAR_GO_HANDLER,
    value
})

