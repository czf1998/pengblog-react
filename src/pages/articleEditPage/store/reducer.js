import {fromJS} from 'immutable'
import {APPOINT_ARTICLE_EDIT_INFO} from "./actionTypes";
import {TRIGGER_IS_SAVING_ARTICLE} from "../../../router/navItem/articleEidtPageNav/store/actionTypes";

const defaultState = fromJS({
    title:'',
    label:'',
    author: '',
    maxTitleLength: 50,
    isSaving: false
})

export default (state = defaultState, action) => {
    if(action.type === APPOINT_ARTICLE_EDIT_INFO){
       return state.set(action.value.infoType, action.value.infoValue)
    }
    if(action.type === TRIGGER_IS_SAVING_ARTICLE){
        return state.set('isSaving',action.value)
    }
    return state
}