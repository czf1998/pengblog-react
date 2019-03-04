import { fromJS } from 'immutable'
import {} from "./actionTypes";
import {TRIGGER_IS_LOADING_FRESH_COMMENTS} from "./actionTypes";
import {APPOINT_FRESH_COMMENTS_DATA, RECORD_COMMENT_HAS_BEEN_DELETED} from "../../../../../store/actionTypesWithSaga";

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
            commentList: state.get('commentList').concat(fromJS(action.value.commentList)),
            maxPage: action.value.maxPage,
            currentPage: state.get('currentPage') + 1,
            startIndex: state.get('startIndex') + state.get('pageScale'),
            isLoading: false
        })
    }

    if(action.type === RECORD_COMMENT_HAS_BEEN_DELETED){
        let commentList = state.get('commentList').toJS()
        let startIndex = state.get('startIndex')

        commentList.map((item, index) => {
            if(item.comment_id === action.value.comment_id){
                commentList.splice(index,1)
                startIndex = startIndex - 1
                return
            }
            if(item.comment_referComment !== null
                &&
                item.comment_referComment !== undefined
                &&
                item.comment_referComment.comment_id === action.value.comment_id){
                commentList.splice(index,1)
                startIndex = startIndex - 1
            }
        })

        return state.merge({
            commentList: fromJS(commentList),
            startIndex: startIndex,
            maxPage: action.value.maxPage
        })
    }

    return state
}



