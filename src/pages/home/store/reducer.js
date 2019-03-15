import { fromJS } from 'immutable'
import {
    DELIVER_ARTICLE_LIST_DATA_TO_HOME,
    GET_HOME_ARTICLE_LIST_DATA,
    NOTICE_HOME_STORE_JUMBOTRON_DATA_READY,
    ROADED_AND_SHOW_JUMBOTRON,
    DELIVER_COUNT_OF_COMMENT_DATA_TO_HOME
} from '../../../store/actionTypesWithSaga'

import {
    GET_HOME_ARTICLE_LIST_DATA_BY_KEYWORD,
    RESET_HOME_PAGE_INDEX,
    TRIGGER_HAS_BEEN_MOUNT_ONCE,
    TRIGGER_ISLOADING_HOME_ARTICLE_LIST
} from "./actionType";
import {COMMON_CONTEXT, SEARCH_CONTEXT} from "../../managePage/store/reducer";

const defaultState = fromJS({
    startIndex: 0,
    pageScale: 8,
    maxPage: 1,
    currentPage: 0,
    articleList: [],
    isLoading: false,
    articleListDataIsReady: false,
    hasBeenMountOnce: false,
    context: COMMON_CONTEXT
})

export default (state = defaultState, action) => {
    if(action.type === DELIVER_ARTICLE_LIST_DATA_TO_HOME) {
        return state.merge({
            articleList: state.get('articleList').concat(fromJS(action.value.articleList)),
            maxPage: action.value.maxPage,
            currentPage: state.get('currentPage') + 1,
            startIndex: state.get('startIndex') + state.get('pageScale'),
            isLoading: false,
            articleListDataIsReady: true
        })
    }
    if(action.type === DELIVER_COUNT_OF_COMMENT_DATA_TO_HOME) {
        return state.merge({
            articleList: state.get('articleList').map((item) => {
                if(item.get('article_id') === action.value.article_id) {
                     return item.set('countOfAllComment', action.value.countOfAllComment)
                }
                return item
            })
        })
    }
    if(action.type === NOTICE_HOME_STORE_JUMBOTRON_DATA_READY) {
        return state.merge({
            jumbotronDataIsReady: true
        })
    }
    if(action.type === GET_HOME_ARTICLE_LIST_DATA) {
        return state.merge({
            isLoading: true,
            context: COMMON_CONTEXT
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
    if(action.type === TRIGGER_ISLOADING_HOME_ARTICLE_LIST){
        return state.merge({
            isLoading: action.value
        })
    }
    if(action.type === RESET_HOME_PAGE_INDEX){
        return defaultState
    }
    if(action.type === GET_HOME_ARTICLE_LIST_DATA_BY_KEYWORD){
        return state.merge({
            isLoading: true,
            context: SEARCH_CONTEXT
        })
    }
    return state
}