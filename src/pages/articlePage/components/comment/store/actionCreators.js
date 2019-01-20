import { GET_SUB_COMMENT_LIST_DATA,APPOINT_SHOW_SUB_COMMENT_EDITOR_MANAGER } from './actionTypes'

export const createGetSubCommentListDataAction = (value) => ({
    type: GET_SUB_COMMENT_LIST_DATA,
    value
})

export const createAppointShowSubCommentEditorManagerAction = (value) => ({
    type: APPOINT_SHOW_SUB_COMMENT_EDITOR_MANAGER,
    value
})