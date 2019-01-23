import {fromJS} from 'immutable'
import {APPOINT_ARTICLE_EDITOR_CONTENT} from "./actionTypes";

const defaultState = fromJS({
    content:''
})

export default (state = defaultState, action) => {
    if(action.type === APPOINT_ARTICLE_EDITOR_CONTENT){
        return state.merge({
            content: action.value
        })
    }
    return state
}