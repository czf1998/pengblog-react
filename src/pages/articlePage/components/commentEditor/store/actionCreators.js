import { TRIGGER_SHOW_EMOJIPICKER,
         REFRESH_COMMENT_CONTENT,
         REFRESH_VISITOR_NAME,
         REFRESH_VISITOR_EMAIL,
         REFRESH_VISITOR_SITE_ADDRESS } from './actionType'

export const createRefreshCommentContentAction = (value) => ({
    type: REFRESH_COMMENT_CONTENT,
    value
})

export const createTriggerShowEmojiPickerAction = () => ({
    type: TRIGGER_SHOW_EMOJIPICKER
})

export const createRefreshVisitorNameAction = (value) => ({
    type: REFRESH_VISITOR_NAME,
    value
})

export const createRefreshVisitorEmailAction = (value) => ({
    type: REFRESH_VISITOR_EMAIL,
    value
})

export const createRefreshVisitorSiteAddressAction = (value) => ({
    type: REFRESH_VISITOR_SITE_ADDRESS,
    value
})