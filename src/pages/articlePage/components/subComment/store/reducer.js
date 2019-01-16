import { fromJS } from 'immutable'
import {DELIVER_SUB_COMMENT_LIST_DATA} from "../../../../../store/actionTypesWithSaga";

const defaultState = fromJS({
    subCommentMapper: fromJS({}),
    pageScale: 5,
})

export default (state = defaultState, action) => {
    if(action.type === DELIVER_SUB_COMMENT_LIST_DATA){
        const referCommentId = action.value.referCommentId
        const mergeObj = {}
        mergeObj[referCommentId] = action.value.subCommentList
        return state.merge({
            subCommentMapper: state.get('subCommentMapper').merge(fromJS(mergeObj))
        })
    }
    return state
}