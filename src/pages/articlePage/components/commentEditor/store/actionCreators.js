import {TRIGGER_SHOW_EMOJIPICKER,
        APPOINT_INPUT_VALUE,
        APPOINT_INPUT_WARN,
        TRIGGER_HAS_ONCE_TRY_TO_SUBMIT,
        SUBMIT_COMMENT,
        TRIGGER_COMMENT_EDITOR_LOADING} from './actionType'

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

export const createTriggerHasOnceTryToSubmitAction = () => ({
    type: TRIGGER_HAS_ONCE_TRY_TO_SUBMIT
})

export const createSubmitCommentAction = (value) => ({
    type: SUBMIT_COMMENT,
    value
})

export const createTriggerCommentEditorLoadingAction = (value) => ({
    type: TRIGGER_COMMENT_EDITOR_LOADING,
    value
})