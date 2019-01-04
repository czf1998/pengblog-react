import { GET_ARTICLE_PAGE_DATA } from '../../../store/actionTypesWithSaga'

export function createGetArticlePageDataAction(value) {

    return {
        type: GET_ARTICLE_PAGE_DATA,
        value
    }
}
