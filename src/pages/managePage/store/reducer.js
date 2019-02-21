import { fromJS } from 'immutable'
import {DELIVER_ARTICLE_LIST_DATA_TO_MANAGE_PAGE} from "../../../store/actionTypesWithSaga";

const defaultState = fromJS({
    startIndex: 0,
    pageScale: 7,
    maxPage: 1,
    currentPage: 0,
    articleList: undefined,
    isLoading: false
})

export default (state = defaultState, action) => {
    if(action.type === DELIVER_ARTICLE_LIST_DATA_TO_MANAGE_PAGE){
        return state.merge({
            articleList: fromJS(action.value.articleList),
            maxPage: action.value.maxPage,
            currentPage: state.get('currentPage') + 1,
            startIndex: (state.get('currentPage') + 1) * state.get('pageScale'),
            isLoading: false,
            articleListDataIsReady: true
        })
    }
    return state
}