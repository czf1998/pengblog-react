import { APPOINT_PROGRASS_BAR_HANDLER, RESET_PROGRASS_BAR } from './actionType'

export const createAppointPrograssBarHandlerAction = (value) => ({
    type: APPOINT_PROGRASS_BAR_HANDLER,
    value
})

export const createResetPrograssBarAction = () => ({
    type: RESET_PROGRASS_BAR
})