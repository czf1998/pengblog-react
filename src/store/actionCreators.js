import { DELIVER_ARTICLE_LIST_DATA_TO_HOME,
         DELIVER_ARTICLE_DATA_TO_JUMBOTRON,
         RECORD_SCROLL_TOP_OF_ELEMENT_EL,
         OBSERVE_SCROLL_TOP_OF_ELEMENT_EL,
         DELIVER_ARTICLE_DATA_TO_ARTICLE_PAGE,
         NOTICE_HOME_STORE_ARTICLE_LIST_DATA_READY,
         NOTICE_HOME_STORE_JUMBOTRON_DATA_READY,
         DELIVER_COMMENT_LIST_DATA_TO_ARTICLE_PAGE,
         DELIVER_COUNT_OF_COMMENT_DATA_TO_HOME,
         PUSH_PROGRASS } from './actionTypesWithSaga'

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

export const createNoticeHomeStoreArticleListDataReadyAction = () => ({
    type: NOTICE_HOME_STORE_ARTICLE_LIST_DATA_READY
})

export const createNoticeHomeStoreJumbotronDataReadyAction = () => ({
    type: NOTICE_HOME_STORE_JUMBOTRON_DATA_READY
})

export const createDeliverCommentListDataToArticlePageAction = (value) => ({
    type: DELIVER_COMMENT_LIST_DATA_TO_ARTICLE_PAGE,
    value
})

export const createDeliverCountOfCommentDataToHomeAction = (article_id, countOfAllComment) => ({
    type: DELIVER_COUNT_OF_COMMENT_DATA_TO_HOME,
    value: {
        article_id: article_id,
        countOfAllComment: countOfAllComment
    }
})

export const createPushPrograssAction = () => ({
    type: PUSH_PROGRASS
})