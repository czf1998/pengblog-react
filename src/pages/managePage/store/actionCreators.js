import {GET_MANAGE_PAGE_ARTICLE_LIST_DATA,
        TRIGGER_ISLOADING_MANAGE_PAGE_ARTICLE_LIST_DATA,
        GET_MANAGE_PAGE_ARTICLE_FILING_DATA,
        GET_MANAGE_PAGE_ARTICLE_LABEL_DATA,
        GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_KEY_WORD,
        APPOINT_MANAGE_PAGE_PAGINATION,
        GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_FILING,
        GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_LABEL,
        RESET_CENTRAL_CONTROLLER_OF_MANAGE_PAGE,
        TRIGGER_IS_MULTIPLE_SELECTING_IN_MANAGE_PAGE} from './actionType'

export const createGetManagePageArticleListDataAction = (value) => ({
    type: GET_MANAGE_PAGE_ARTICLE_LIST_DATA,
    value
})

export const createTriggerIsLoadingManagePageArticleListDataAction = (value) => ({
    type: TRIGGER_ISLOADING_MANAGE_PAGE_ARTICLE_LIST_DATA,
    value
})

export const createGetManagePageArticleFilingDataAction = () => ({
    type: GET_MANAGE_PAGE_ARTICLE_FILING_DATA
})

export const createGetManagePageArticleLabelDataAction = () => ({
    type: GET_MANAGE_PAGE_ARTICLE_LABEL_DATA
})

export const createGetManagePageArticleListDataByKeyWordAction = (value) => ({
    type: GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_KEY_WORD,
    value
})

export const createAppointManagePagePaginationAction = (value) => ({
    type: APPOINT_MANAGE_PAGE_PAGINATION,
    value
})

export const createGetManagePageArticleListDataByFilingAction = (value) => ({
    type: GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_FILING,
    value
})

export const createGetManagePageArticleListDataByLabelAction = (value) => ({
    type: GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_LABEL,
    value
})

export const createResetCentralControllerOfManagePage = (value) => ({
    type: RESET_CENTRAL_CONTROLLER_OF_MANAGE_PAGE,
    value
})

export const createTiggerIsMultipleSelectingInManagePageAction = (value) => ({
    type: TRIGGER_IS_MULTIPLE_SELECTING_IN_MANAGE_PAGE,
    value
})