import {fromJS} from 'immutable'
import {APPOINT_ARTICLE_EDIT_INFO, TRIGGER_ARTICLE_SUBMITABLE} from "./actionTypes";
import {TRIGGER_IS_SAVING_DRAFT} from "./actionTypes";
import {DELIVER_DRAFT_DATA} from "../../../store/actionTypesWithSaga";

const defaultState = fromJS({
    title:'',
    label:'',
    author: '',
    maxTitleLength: 50,
    isSaving: false,
    submitable: false
})

export default (state = defaultState, action) => {
    if(action.type === APPOINT_ARTICLE_EDIT_INFO){
       return state.set(action.value.infoType, action.value.infoValue)
    }
    if(action.type === TRIGGER_IS_SAVING_DRAFT){
        return state.set('isSaving',action.value)
    }
    if(action.type === DELIVER_DRAFT_DATA){
        setTimeout(() => {
            dispatchKeyupForMetaInput()
        }, 100)
        return state.merge({
            title: action.value.article_title,
            label: action.value.article_label,
            author: action.value.article_author,
            id: action.value.article_id
        })
    }
    if(action.type === TRIGGER_ARTICLE_SUBMITABLE){
        return state.merge({
            submitable: action.value
        })
    }
    return state
}

const dispatchKeyupForMetaInput = () => {
    let labelInput = document.getElementById('labelInput')
    let authorInput = document.getElementById('authorInput')
    let e = document.createEvent('UIEvent')
    e.initUIEvent("keyup", true, true, window, 1)
    labelInput && labelInput.dispatchEvent(e)
    labelInput && authorInput.dispatchEvent(e)
}