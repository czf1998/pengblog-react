import {fromJS} from 'immutable'
import {
    APPOINT_ARTICLE_EDIT_INFO,
    TRIGGER_ARTICLE_SUBMITABLE,
    TRIGGER_SHOW_SAVE_TAG,
    UPDATE_DRAFT_CACHE
} from "./actionTypes";
import {TRIGGER_IS_SAVING_DRAFT} from "./actionTypes";
import {
    DELIVER_DRAFT_DATA,
    RECORD_EDITING_ARTICLE_ID_saga_articleEditPage,
    RESET_ARTICLE_EDIT_PAGE_saga_articleEditPage
} from "../../../store/actionTypesWithSaga";
import {TRIGGER_IS_SAVING_ARTICLE} from "../../../common/header/store/actionTypes";

const defaultState = fromJS({
    title:undefined,
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
            label: action.value.article_label ? action.value.article_title : '',
            author: action.value.article_author ? action.value.article_title : '',
            id: action.value.article_id,
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
    if(action.type === UPDATE_DRAFT_CACHE){
        return state.merge({
            draftCache: fromJS(action.value)
        })
    }
    if(action.type === RESET_ARTICLE_EDIT_PAGE_saga_articleEditPage){
        return defaultState
    }
    if(action.type === RECORD_EDITING_ARTICLE_ID_saga_articleEditPage){
        return state.merge({
            id: action.value
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