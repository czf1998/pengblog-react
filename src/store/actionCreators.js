import { DELIVER_ARTICLE_LIST_DATA_TO_HOME,
         RECORD_SCROLL_TOP_OF_ELEMENT_EL,
         OBSERVE_SCROLL_TOP_OF_ELEMENT_EL } from './actionTypesWithSaga'

export const createDeliverArticleDataToHomeAction = (value) => ({
    type: DELIVER_ARTICLE_LIST_DATA_TO_HOME,
    value
})

export const createRecordScrollTopOfElementElAction = (value) => ({
    type: RECORD_SCROLL_TOP_OF_ELEMENT_EL,
    value
})

export const createObserveScrollTopOfElementElAction = (value) => ({
    type: OBSERVE_SCROLL_TOP_OF_ELEMENT_EL,
    value
})