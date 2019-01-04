import { GET_ARTICLE_PAGE_DATA, RESET_ARTICLE_PAGE_STORE } from '../../../store/actionTypesWithSaga'

export function createResetArticlePageStoreAction() {
    return {
        type: RESET_ARTICLE_PAGE_STORE
    }
}


export function createGetArticlePageDataAction(value) {

    return {
        type: GET_ARTICLE_PAGE_DATA,
        value
    }
}
