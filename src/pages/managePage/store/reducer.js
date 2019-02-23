import { fromJS } from 'immutable'
import {
    DELIVER_ARTICLE_FILING_DATA_TO_MANAGE_PAGE,
    DELIVER_ARTICLE_LABEL_DATA_TO_MANAGE_PAGE,
    DELIVER_ARTICLE_LIST_DATA_TO_MANAGE_PAGE
} from "../../../store/actionTypesWithSaga";
import {
    GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_KEY_WORD,
    TRIGGER_ISLOADING_MANAGE_PAGE_ARTICLE_LIST_DATA
} from "./actionType";

const COMMON_CONTEXT = 'common'
const SEARCH_CONTEXT = 'search'

const defaultState = fromJS({
    articleList: undefined,
    isLoading: false,
    articleFilingObj: undefined,
    articleLabelObjList: undefined,
    currentContext: COMMON_CONTEXT
})

export default (state = defaultState, action) => {
    if(action.type === TRIGGER_ISLOADING_MANAGE_PAGE_ARTICLE_LIST_DATA){
        return state.merge({
            isLoading: action.value
        })
    }
    if(action.type === DELIVER_ARTICLE_LIST_DATA_TO_MANAGE_PAGE){
        return state.merge({
            articleList: fromJS(action.value.articleList),
            maxPage: action.value.maxPage,
            isLoading: false,
            articleListDataIsReady: true
        })
    }

    if(action.type === DELIVER_ARTICLE_FILING_DATA_TO_MANAGE_PAGE){
        return state.merge({
            articleFilingObj: fromJS(action.value)
        })
    }

    if(action.type === DELIVER_ARTICLE_LABEL_DATA_TO_MANAGE_PAGE){
        return state.merge({
            articleLabelObjList: fromJS(action.value)
        })
    }

    if(action.type === GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_KEY_WORD){
        return state.merge({
            currentContext: SEARCH_CONTEXT
        })
    }
    return state
}