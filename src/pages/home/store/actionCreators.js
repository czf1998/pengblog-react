import {GET_HOME_ARTICLE_LIST_DATA } from '../../../store/actionTypesWithSaga'

export const createGetHomeDataAction = (value) => ({
    type: GET_HOME_ARTICLE_LIST_DATA,
    value
})

