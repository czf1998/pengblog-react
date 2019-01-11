import {
    GET_ARTICLE_DATA_FOR_ARTICLE_PAGE_DATA,
    RESET_ARTICLE_PAGE_STORE,
    GET_COMMENT_LIST_DATA,
    PUSH_PROGRASS_TO_END,
} from '../../../store/actionTypesWithSaga'
import { LOAD_ARTICLE_CACHE, RECORD_SCROLL_TOP_OF_ARTICLE_PAGE } from './actionType'

export const createRecordScrollTopOfArticlePageAction = () => {
    let scrollPosition = document.body.scrollTop === 0 ? document.documentElement.scrollTop : document.body.scrollTop
    const action = {
        type: RECORD_SCROLL_TOP_OF_ARTICLE_PAGE,
        value: {
            scrollPosition: scrollPosition
        }
    }
    return action
}


export const createPushPrograssToEndAction = (value) => ({
    type: PUSH_PROGRASS_TO_END,
    value
})

export function createLoadArticleCacheAction() {
    return {
        type: LOAD_ARTICLE_CACHE
    }
}


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
