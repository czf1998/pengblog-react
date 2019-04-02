import {GET_ARTICLE_LIST_DATA_recycleBinPage_saga,TRIGGER_IS_LOADING} from './actionTypes'

export const createGetArticleListDataOfRecycleBinPageAction = (value) => ({
    type: GET_ARTICLE_LIST_DATA_recycleBinPage_saga,
    value
})

export const createTriggerIsLoadingAction = (value) => ({
    type: TRIGGER_IS_LOADING,
    value
})