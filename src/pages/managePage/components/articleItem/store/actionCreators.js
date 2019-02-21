import {TRIGGER_SEARCH_INPUT_IS_FOCUS} from './actionTypes'

export const createTriggerSearchInputIsFocusAction = (value) => ({
    type: TRIGGER_SEARCH_INPUT_IS_FOCUS,
    value
})