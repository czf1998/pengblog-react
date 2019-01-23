import {fromJS} from 'immutable'
import {APPOINT_ARTICLE_EDIT_TITLE} from "./actionTypes";

const defaultState = fromJS({
    title:'',
    remnantTitleLength: 50
})

export default (state = defaultState, action) => {
    if(action.type === APPOINT_ARTICLE_EDIT_TITLE){
        return state.merge({
            title:action.value,
            remnantTitleLength: 50 - action.value.length
        })
    }
    return state
}