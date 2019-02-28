import {APPOINT_ARTICLE_BEING_SELECTED_IN_MANAGE_PAGE,DELETE_ARTICLE} from './actionTypes'

export const createAppointArticleBeingSelectedInManagePage = (value) => ({
    type: APPOINT_ARTICLE_BEING_SELECTED_IN_MANAGE_PAGE,
    value
})

export const createDeleteArticleAction = (value) => ({
    type: DELETE_ARTICLE,
    value
})