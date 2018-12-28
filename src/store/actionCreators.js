import { DELIVER_ARTICLE_LIST_DATA_TO_HOME } from './actionTypesWithSaga'

export const createDeliverArticleDataToHomeAction = (value) => ({
    type: DELIVER_ARTICLE_LIST_DATA_TO_HOME,
    value
})