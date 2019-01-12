import { APPEND_EMOJI_TO_COMMENT_CONTENT } from './actionType'

export const createAppendEmojiToCommentContentAction = (value) => ({
    type: APPEND_EMOJI_TO_COMMENT_CONTENT,
    value
})