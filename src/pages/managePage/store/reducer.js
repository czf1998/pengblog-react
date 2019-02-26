import { fromJS } from 'immutable'
import {
    DELIVER_ARTICLE_FILING_DATA_TO_MANAGE_PAGE,
    DELIVER_ARTICLE_LABEL_DATA_TO_MANAGE_PAGE,
    DELIVER_ARTICLE_LIST_DATA_TO_MANAGE_PAGE
} from "../../../store/actionTypesWithSaga";
import {
    GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_FILING,
    GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_KEY_WORD,
    GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_LABEL,
    RESET_CENTRAL_CONTROLLER_OF_MANAGE_PAGE,
    TRIGGER_ISLOADING_MANAGE_PAGE_ARTICLE_LIST_DATA
} from "./actionType";
import {APPOINT_CURRENT_LABEL} from "../components/articleClassification/store/actionTypes";
import {
    APPOINT_CURRENT_ARTICLE_DETAIL_OF_MANAGE_PAGE,
    TRIGGER_SHOW_ARTICLE_DETAIL_OF_MANAGE_PAGE
} from "../components/articleItem/store/actionTypes";

export const COMMON_CONTEXT = 'common'
export const SEARCH_CONTEXT = 'search'
export const FILING_CONTENT = 'filing'
export const LABEL_CONTEXT = 'label'

const defaultState = fromJS({
    articleList: undefined,
    isLoading: false,
    articleFilingObj: undefined,
    articleLabelObjList: undefined,
    currentLabel: undefined,
    currentContext: COMMON_CONTEXT,
    dataIsReady: false,
    showArticleDetail: false,
    currentArticleDetail: undefined
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
            articleListDataIsReady: true,
            dataIsReady: true
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

    if(action.type === GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_FILING){
        return state.merge({
            currentContext: FILING_CONTENT
        })
    }

    if(action.type === GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_LABEL){
        return state.merge({
            currentContext: LABEL_CONTEXT
        })
    }

    if(action.type === APPOINT_CURRENT_LABEL){
        return state.merge({
            currentLabel: action.value
        })
    }

    if(action.type === RESET_CENTRAL_CONTROLLER_OF_MANAGE_PAGE){
        if(action.value !== LABEL_CONTEXT){
            return state.merge({
                currentLabel: defaultState.get('currentLabel')
            })
        }
    }

    if(action.type === TRIGGER_SHOW_ARTICLE_DETAIL_OF_MANAGE_PAGE){
        return state.merge({
            showArticleDetail: action.value
        })
    }

    if(action.type === APPOINT_CURRENT_ARTICLE_DETAIL_OF_MANAGE_PAGE){
        return state.merge({
            currentArticleDetail: action.value
        })
    }
    return state
}