import { fromJS } from 'immutable'
import {
    DELIVER_ARTICLE_FILING_DATA_TO_MANAGE_PAGE, DELIVER_ARTICLE_LABEL_DATA_TO_MANAGE_PAGE,
    DELIVER_ARTICLE_LIST_DATA_TO_MANAGE_PAGE
} from "../../../store/actionTypesWithSaga";

const defaultState = fromJS({
    articleList: undefined,
    isLoading: false,
    articleFilingObj: undefined,
    articleLabelObjList: undefined
})

export default (state = defaultState, action) => {
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
    return state
}