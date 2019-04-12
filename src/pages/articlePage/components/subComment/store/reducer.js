import { fromJS,Map } from 'immutable'
import {
    APPEND_COMMENT_JUST_SUBMIT,
    DELIVER_SUB_COMMENT_LIST_DATA,
    RECORD_SUB_COMMENT_HAS_BEEN_DELETED
} from "../../../../../store/actionTypesWithSaga";
import {constructComment, uniqueCommentList} from "../../../store/reducer";
import {GET_SUB_COMMENT_LIST_DATA} from "../../comment/store";
import {TRIGGER_IS_LOADING_MORE_SUB_COMMENT} from "../../comment/store/actionTypes";

const defaultState = fromJS({
    subCommentMaxPageMananger:Map(),
    subCommentList:fromJS([]),
    pageScale: 4,
    isLoadingMoreSubComment: false
})

export default (state = defaultState, action) => {
    const subCommentList = state.get('subCommentList')
    const subCommentMaxPageMananger = state.get('subCommentMaxPageMananger')

    if(action.type === GET_SUB_COMMENT_LIST_DATA){
        return state.set('isLoadingMoreSubComment',true)
    }

    if(action.type === DELIVER_SUB_COMMENT_LIST_DATA){
        return state.merge({
            subCommentList: uniqueCommentList(subCommentList.concat(fromJS(action.value.subCommentList))),
            subCommentMaxPageMananger: subCommentMaxPageMananger.set(action.value.referCommentId, action.value.maxPage),
            isLoadingMoreSubComment: false
        })
    }

    if(action.type === APPEND_COMMENT_JUST_SUBMIT){

        const commentJustSubmit = constructComment(action.value)

        if(commentJustSubmit.get('comment_referComment').get('comment_id')){
            return state.merge({
                subCommentList: subCommentList.push(commentJustSubmit),
            })
        }
    }

    if(action.type === RECORD_SUB_COMMENT_HAS_BEEN_DELETED){
        let subCommentListToJS = subCommentList.toJS()

        subCommentListToJS.forEach((item,index) => {
            item.comment_id === action.value.comment_id && subCommentListToJS.splice(index,1)
        })

        return state.merge({
            subCommentList: fromJS(subCommentListToJS),
            subCommentMaxPageMananger: subCommentMaxPageMananger.set(action.value.refer_comment_id,action.value.maxPage)
        })
    }


    return state
}