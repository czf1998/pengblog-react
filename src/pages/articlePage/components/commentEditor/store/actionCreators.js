import { TRIGGER_SHOW_EMOJIPICKER, REFRESH_COMMENT_CONTENT } from './actionType'

export const createRefreshCommentContentAction = (value) => ({
    type: REFRESH_COMMENT_CONTENT,
    value
})


export const createTriggerShowEmojiPickerAction = () => ({
    type: TRIGGER_SHOW_EMOJIPICKER
})

