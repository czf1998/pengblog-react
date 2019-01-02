import {GET_JUMBOTRON_ARTICLE_DATA, ROADED_AND_SHOW_JUMBOTRON} from '../../../../../store/actionTypesWithSaga'

export const createGetJumbotronDataAction = (value) => ({
    type: GET_JUMBOTRON_ARTICLE_DATA,
    value
})

export const createRoadedAndShowJumbotronAction = () => ({
    type: ROADED_AND_SHOW_JUMBOTRON
})