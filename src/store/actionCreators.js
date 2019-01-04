import { DELIVER_ARTICLE_LIST_DATA_TO_HOME,
         DELIVER_ARTICLE_DATA_TO_JUMBOTRON,
         RECORD_SCROLL_TOP_OF_ELEMENT_EL,
         OBSERVE_SCROLL_TOP_OF_ELEMENT_EL,
         DELIVER_ARTICLE_DATA_TO_ARTICLE_PAGE } from './actionTypesWithSaga'

export const createDeliverArticleDataToHomeAction = (value) => ({
    type: DELIVER_ARTICLE_LIST_DATA_TO_HOME,
    value
})

export const createRecordScrollTopOfElementElAction = (value) => ({
    type: RECORD_SCROLL_TOP_OF_ELEMENT_EL,
    value
})

export const createObserveScrollTopOfElementElAction = () => {
    let scrollTopOfDocumentEl = document.body.scrollTop === 0 ? document.documentElement.scrollTop : document.body.scrollTop
    const action = {
        type: OBSERVE_SCROLL_TOP_OF_ELEMENT_EL,
        scrollTopOfDocumentEl
    }
    return action
}

export const createDeliverArticleDataToJumbotronAction = (value) => ({
    type: DELIVER_ARTICLE_DATA_TO_JUMBOTRON,
    value
})

export const createDeliverArticleDataToArticlePage = (value) => ({
    type: DELIVER_ARTICLE_DATA_TO_ARTICLE_PAGE,
    value
})