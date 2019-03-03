import { fromJS } from 'immutable'
import {} from "./actionTypes";
import {TRIGGER_IS_LOADING_FRESH_COMMENTS} from "./actionTypes";
import {APPOINT_FRESH_COMMENTS_DATA} from "../../../../../store/actionTypesWithSaga";

const defaultState = fromJS({
    currentPage: 0,
    maxPage: 1,
    pageScale: 3,
    startIndex: 0,
    isLoading: false,
    commentList: fromJS([])
})

export default (state = defaultState, action) => {

    if(action.type === TRIGGER_IS_LOADING_FRESH_COMMENTS){
        return state.merge({
            isLoading: action.value
        })
    }

    if(action.type === APPOINT_FRESH_COMMENTS_DATA){
        return state.merge({
            commentList: fromJS(action.value.commentList),
            maxPage: action.value.maxPage,
            currentPage: state.get('currentPage') + 1,
            startIndex: state.get('startIndex') + state.get('pageScale'),
            isLoading: false
        })
    }

    return state
}



