import { fromJS } from 'immutable'
import {
    DELIVER_ARTICLE_LIST_DATA_TO_HOME,
    GET_HOME_ARTICLE_LIST_DATA,
    ROADED_AND_SHOW_JUMBOTRON
} from '../../../store/actionTypesWithSaga'

const defaultState = fromJS({
    startIndex: 0,
    pageScale: 4,
    maxPage: 1,
    currentPage: 0,
    articleList: [],
    jumbotronArticleIdDefault: 0,
    jumbotronArticleId: 0,
    isLoading: false,
    loadedAndShowJumbotron: false
})

export default (state = defaultState, action) => {
    if(action.type === DELIVER_ARTICLE_LIST_DATA_TO_HOME) {
        return state.merge({
            articleList: state.get('articleList').concat(fromJS(action.value.articleList)),
            maxPage: action.value.maxPage,
            currentPage: state.get('currentPage') + 1,
            startIndex: (state.get('currentPage') + 1) * state.get('pageScale'),
            jumbotronArticleId: state.get('articleList').get(0) ? state.get('articleList').get(0).get('article_id') : action.value.articleList[0].article_id,
            isLoading: false
        })
    }
    if(action.type === GET_HOME_ARTICLE_LIST_DATA) {
        return state.merge({
            isLoading: true
        })
    }
    if(action.type === ROADED_AND_SHOW_JUMBOTRON) {
        return state.merge({
            loadedAndShowJumbotron: true
        })
    }
    return state
}