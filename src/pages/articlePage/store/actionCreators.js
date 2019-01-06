import { GET_ARTICLE_DATA_FOR_ARTICLE_PAGE_DATA, RESET_ARTICLE_PAGE_STORE, GET_COMMENT_LIST_DATA } from '../../../store/actionTypesWithSaga'

export function createGetCommentListDataAction(value) {
    return {
        type: GET_COMMENT_LIST_DATA,
        value
    }
}


export function createResetArticlePageStoreAction() {
    return {
        type: RESET_ARTICLE_PAGE_STORE
    }
}


export function createGetArticlePageDataAction(value) {
    return {
        type: GET_ARTICLE_DATA_FOR_ARTICLE_PAGE_DATA,
        value
    }
}
