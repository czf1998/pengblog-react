import { fromJS } from 'immutable'
import {
    DELIVER_ARTICLE_LIST_DATA_TO_HOME,
    GET_HOME_ARTICLE_LIST_DATA, NOTICE_HOME_STORE_ARTICLE_LIST_DATA_READY, NOTICE_HOME_STORE_JUMBOTRON_DATA_READY,
    ROADED_AND_SHOW_JUMBOTRON
} from '../../../store/actionTypesWithSaga'

import { TRIGGER_HAS_BEEN_MOUNT_ONCE } from "./actionType";

const defaultState = fromJS({
    startIndex: 0,
    pageScale: 7,
    maxPage: 1,
    currentPage: 0,
    articleList: [],
    jumbotronArticleIdDefault: 0,
    jumbotronArticleId: 0,
    isLoading: false,
    loadedAndShowJumbotron: false,
    jumbotronDataIsReady: false,
    articleListDataIsReady: false,
    hasBeenMountOnce: false
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
    if(action.type === NOTICE_HOME_STORE_ARTICLE_LIST_DATA_READY) {
        return state.merge({
            articleListDataIsReady: true
        })
    }
    if(action.type === NOTICE_HOME_STORE_JUMBOTRON_DATA_READY) {
        return state.merge({
            jumbotronDataIsReady: true
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
    if(action.type === TRIGGER_HAS_BEEN_MOUNT_ONCE) {
        return state.merge({
            hasBeenMountOnce: true
        })
    }
    return state
}