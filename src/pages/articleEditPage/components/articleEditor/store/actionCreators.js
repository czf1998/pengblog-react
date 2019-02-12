import {APPOINT_ARTICLE_EDITOR_CONTENT,APPOINT_ARTICLE_EDITOR} from './actionTypes'

export const createAppointArticleEditorContent = (value) => ({
    type: APPOINT_ARTICLE_EDITOR_CONTENT,
    value
})

export const createAppointArticleEditorAction = (value) => ({
    type: APPOINT_ARTICLE_EDITOR,
    value
})