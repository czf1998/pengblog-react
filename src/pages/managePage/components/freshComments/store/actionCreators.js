import {TRIGGER_IS_LOADING_FRESH_COMMENTS,GET_FRESH_COMMENTS_DATA} from './actionTypes'

export const createTriggerIsLoadingFreshCommentsAction = (value) => ({
    type: TRIGGER_IS_LOADING_FRESH_COMMENTS,
    value
})

export const createGetFreshCommentsDataAction = (value) => ({
    type: GET_FRESH_COMMENTS_DATA,
    value
})