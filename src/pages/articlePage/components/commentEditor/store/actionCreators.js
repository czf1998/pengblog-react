import {TRIGGER_SHOW_EMOJIPICKER,
        APPOINT_INPUT_VALUE,
        APPOINT_INPUT_WARN,
        TRIGGER_HAS_ONCE_TRY_TO_SUBMIT} from './actionType'

export const createTriggerShowEmojiPickerAction = () => ({
    type: TRIGGER_SHOW_EMOJIPICKER
})

export const createAppointInputWarnAction = (value) => ({
    type: APPOINT_INPUT_WARN,
    value
})

export const createAppointInputValueAction = (value) => ({
    type: APPOINT_INPUT_VALUE,
    value
})

export const createTriggerHasOnceTryToSubmitActionn = () => ({
    type: TRIGGER_HAS_ONCE_TRY_TO_SUBMIT
})