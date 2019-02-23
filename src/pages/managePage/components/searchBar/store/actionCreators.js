import {TRIGGER_SEARCH_INPUT_IS_FOCUS,APPOINT_KEYWORD_OF_SEARCH_BAR} from './actionTypes'

export const createTriggerSearchInputIsFocusAction = (value) => ({
    type: TRIGGER_SEARCH_INPUT_IS_FOCUS,
    value
})

export const createAppointKeyWordOfSearchBarAction = (value) => ({
    type: APPOINT_KEYWORD_OF_SEARCH_BAR,
    value
})