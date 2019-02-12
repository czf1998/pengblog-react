import { fromJS } from 'immutable'
import {TRIGGER_SHOW_SAVE_TAG} from "../../../pages/articleEditPage/store/actionTypes";
import {TRIGGER_IS_SAVING_ARTICLE} from "./actionTypes";

const defaultState = fromJS({
    height: '70px',
    backgroundColor: 'white',
    metaColor: '#3367d6',
    articleEditPageHeader: fromJS({
        showSaveTag: false,
        isSavingArticle: false
    })
})

export default (state = defaultState, action) => {
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

