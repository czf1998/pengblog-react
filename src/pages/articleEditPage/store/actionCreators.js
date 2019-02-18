import {APPOINT_ARTICLE_EDIT_INFO,
        GET_DRAFT_DATA,
        SAVE_ARTICLE_ACTION,
        TRIGGER_ARTICLE_SUBMITABLE,
        TRIGGER_SHOW_SAVE_TAG,
        TRIGGER_IS_SAVING_DRAFT,
        UPDATE_DRAFT_CACHE} from './actionTypes'

export const createAppointArticleEditInfoAction = (value) => ({
    type: APPOINT_ARTICLE_EDIT_INFO,
    value
})

export const createGetDraftDataAction = () => ({
    type: GET_DRAFT_DATA
})

export const createSaveArticleAction = (value) => ({
    type: SAVE_ARTICLE_ACTION,
    value
})

export const createTriggerArticleSubmitableAction = (value) => ({
    type: TRIGGER_ARTICLE_SUBMITABLE,
    value
})

export const createTriggerShowSaveTagAction = (value) => ({
    type: TRIGGER_SHOW_SAVE_TAG,
    value
})

export const createTriggerIsSavingDraftAction = (value) => ({
    type: TRIGGER_IS_SAVING_DRAFT,
    value
})

export const createUpdateDraftCacheAction = (value) => ({
    type: UPDATE_DRAFT_CACHE,
    value
})