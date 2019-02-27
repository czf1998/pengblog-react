import {TRIGGER_IS_SAVING_ARTICLE,
        TRIGGER_SHOW_MENU_LIST_OF_MOBILE_HEADER} from "./actionTypes";


export const createTriggerIsSavingArticleAction = (value) => ({
    type: TRIGGER_IS_SAVING_ARTICLE,
    value
})

export const createTriggerShowMenuListOfMobileHeader = (value) => ({
    type: TRIGGER_SHOW_MENU_LIST_OF_MOBILE_HEADER,
    value
})