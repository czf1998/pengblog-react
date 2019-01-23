import { reducer as headerReducer } from '../common/header/store'
import { reducer as homeReducer } from '../pages/home/store'
import { reducer as jumbotronReducer } from '../pages/home/components/jumbotrion/store'
import { reducer as articlePageReducer } from '../pages/articlePage/store'
import { reducer as prograssBarReducer } from '../common/prograssBar/store'
import { reducer as commentEditorReducer } from '../pages/articlePage/components/commentEditor/store'
import { reducer as commentReducer } from '../pages/articlePage/components/comment/store'
import { reducer as subCommentReducer } from '../pages/articlePage/components/subComment/store'
import { reducer as noticeReducer } from '../common/notice/store'
import { reducer as articleEditPageReducer } from '../pages/articleEditPage/store'
import { reducer as articleEditorReducer } from '../pages/articleEditPage/components/articleEditor/store'
import { fromJS } from 'immutable'
import { RECORD_SCROLL_TOP_OF_ELEMENT_EL } from './actionTypesWithSaga'

import { combineReducers } from 'redux-immutable'

const defaultState = fromJS({
    rootStatus: 1,
    basicUIFeatures: {
        borderRadius: '4px',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
        widthOfMainArea: 750,
        animateTime: 1000,
        placeholderSpeed: 1,
        metaColor: '#3367d6'
    },
    scrollTopOfElementEl: 0,
    offsetTopOfElementEl: 0,
    heightOfBrowser: 0,
    widthOfBrowser: 0,
    isMobile: false
})

export default combineReducers({
    header: headerReducer,
    home: homeReducer,
    jumbotron: jumbotronReducer,
    articlePage: articlePageReducer,
    prograssBar: prograssBarReducer,
    commentEditor: commentEditorReducer,
    comment: commentReducer,
    subComment: subCommentReducer,
    notice: noticeReducer,
    articleEditor: articleEditorReducer,
    articleEditPage: articleEditPageReducer,
    rootState:(state = defaultState, action) => {
        if(action.type === RECORD_SCROLL_TOP_OF_ELEMENT_EL){
            return state.merge({
                scrollTopOfElementEl: action.value,
                offsetTopOfElementEl: document.body.offsetHeight,
                heightOfBrowser: window.innerHeight,
                widthOfBrowser: window.innerWidth,
                isMobile: window.innerWidth > 750 ? false : true
            })
        }
        return state
    }
})
