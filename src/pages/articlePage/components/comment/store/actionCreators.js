import { GET_SUB_COMMENT_LIST_DATA,
        APPOINT_SHOW_SUB_COMMENT_EDITOR_MANAGER,
        DELETE_COMMENT_FROM_ARTICLE_PAGE,BAN_IP_COMMENT_SAGA,LIFTED_IP_IPITEM_and_COMMENT_SAGA } from './actionTypes'

export const createGetSubCommentListDataAction = (value) => ({
    type: GET_SUB_COMMENT_LIST_DATA,
    value
})

export const createAppointShowSubCommentEditorManagerAction = (value) => ({
    type: APPOINT_SHOW_SUB_COMMENT_EDITOR_MANAGER,
    value
})

export const createDeleteCommentFromArticlePageAction = (value) => ({
    type: DELETE_COMMENT_FROM_ARTICLE_PAGE,
    value
})

export const createBanIPAction = (value) => ({
    type: BAN_IP_COMMENT_SAGA,
    value
})

export const createLiftedIPAction = (value) => ({
    type: LIFTED_IP_IPITEM_and_COMMENT_SAGA,
    value
})