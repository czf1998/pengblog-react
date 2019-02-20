import {fromJS} from 'immutable'
import {APPOINT_ARTICLE_EDITOR, APPOINT_ARTICLE_EDITOR_CONTENT} from "./actionTypes";
import {DELIVER_DRAFT_DATA} from "../../../../../store/actionTypesWithSaga";

const defaultState = fromJS({
    content:'',
    editor: undefined
})

export default (state = defaultState, action) => {
    if(action.type === APPOINT_ARTICLE_EDITOR_CONTENT){
        return state.merge({
            content: action.value
        })
    }
    if(action.type === DELIVER_DRAFT_DATA){
        if(state.get('editor') !== undefined){
            state.get('editor').cmd.do('insertHTML',  action.value.article_content)
        }
        return state.merge({
            content: action.value.article_content
        })
    }
    if(action.type === APPOINT_ARTICLE_EDITOR){
        if(state.get('content') !== ''){
            action.value && action.value.cmd.do('insertHTML', state.get('content'))
        }
        return state.merge({
            content:'',
            editor: action.value
        })
    }
    return state
}