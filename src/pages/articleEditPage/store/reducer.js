import {fromJS} from 'immutable'
import {APPOINT_ARTICLE_EDIT_INFO, TRIGGER_ARTICLE_SUBMITABLE, TRIGGER_SHOW_SAVE_TAG} from "./actionTypes";
import {TRIGGER_IS_SAVING_DRAFT} from "./actionTypes";
import {DELIVER_DRAFT_DATA} from "../../../store/actionTypesWithSaga";
import {TRIGGER_IS_SAVING_ARTICLE} from "../../../common/header/store/actionTypes";

const defaultState = fromJS({
    title:'',
    label:'',
    author: '',
    maxTitleLength: 50,
    isSaving: false,
    submitable: false,
    articleEditPageHeader: fromJS({
        showSaveTag: false,
        isSavingArticle: false
    }),
    draftCache: undefined
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
            title: action.value.article_title ? action.value.article_title : '',
            label: action.value.article_label ? action.value.article_label : '',
            author: action.value.article_author ? action.value.article_author : '',
            id: action.value.article_id ? action.value.article_id : undefined,
            draftCache: fromJS(action.value)
        })
    }
    if(action.type === TRIGGER_ARTICLE_SUBMITABLE){
        return state.merge({
            submitable: action.value
        })
    }
    if(action.type === TRIGGER_SHOW_SAVE_TAG) {
        return state.merge({
            articleEditPageHeader: state.get('articleEditPageHeader').set('showSaveTag',action.value)
        })
    }
    if(action.type === TRIGGER_IS_SAVING_ARTICLE){
        return state.merge({
            articleEditPageHeader: state.get('articleEditPageHeader').set('isSavingArticle',action.value)
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