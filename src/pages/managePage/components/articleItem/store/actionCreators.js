import {TRIGGER_SHOW_ARTICLE_DETAIL_OF_MANAGE_PAGE,
        APPOINT_CURRENT_ARTICLE_DETAIL_OF_MANAGE_PAGE} from './actionTypes'

export const createTriggerShowArticleDetailOfManagePageAction = (value) => ({
    type: TRIGGER_SHOW_ARTICLE_DETAIL_OF_MANAGE_PAGE,
    value
})

export const createAppointCurrentArticleDetailOfManagePage = (value) => ({
    type: APPOINT_CURRENT_ARTICLE_DETAIL_OF_MANAGE_PAGE,
    value
})