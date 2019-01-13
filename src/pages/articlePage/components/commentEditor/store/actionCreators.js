import {TRIGGER_SHOW_EMOJIPICKER,
        REFRESH_COMMENT_CONTENT,
        APPOINT_INPUT_VALUE,
        APPOINT_INPUT_WARN } from './actionType'

export const createRefreshCommentContentAction = (value) => ({
    type: REFRESH_COMMENT_CONTENT,
    value
})

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