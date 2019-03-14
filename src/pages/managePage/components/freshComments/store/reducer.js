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
        let newCommentList = []
        console.log(commentList)

        commentList.map((item) => {

            if(item.comment_id === action.value.comment_id){
                return
            }

            if(item.comment_referComment !== null
                &&
                item.comment_referComment !== undefined
                &&
                item.comment_referComment.comment_id === action.value.comment_id){
                return
            }

            newCommentList.push(item)
        })

        return state.merge({
            commentList: fromJS(newCommentList),
            startIndex: startIndex - (commentList.length - newCommentList.length),
            maxPage: action.value.maxPage
        })
    }

    return state
}


