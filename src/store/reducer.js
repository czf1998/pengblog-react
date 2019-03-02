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
import { reducer as titleImageReducer } from '../pages/articleEditPage/components/titleImage/store'
import { reducer as routerReducer } from '../router/store'
import { reducer as modalReducer } from '../common/modal/store'
import { reducer as searchBarReducer } from '../pages/managePage/components/searchBar/store'
import { reducer as selectReducer } from '../common/select/store'
import { reducer as managePageReducer } from '../pages/managePage/store'
import { reducer as paginationReducer } from '../common/pagination/store'
import { reducer as loginPageRuducer } from '../pages/loginPage/store'
import { fromJS } from 'immutable'
import {RECORD_CURRENT_BROWSER_EDITION, RECORD_SCROLL_TOP_OF_ELEMENT_EL} from './actionTypesWithSaga'

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
    isMobile: false,
    browser: undefined
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
    titleImage: titleImageReducer,
    router: routerReducer,
    modal: modalReducer,
    searchBar: searchBarReducer,
    select: selectReducer,
    managePage: managePageReducer,
    pagination: paginationReducer,
    loginPage: loginPageRuducer,
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
        if(action.type === RECORD_CURRENT_BROWSER_EDITION){
            const userAgent =  window.navigator.userAgent
            if (userAgent.indexOf('Firefox') !== -1){
                return state.merge({
                    browser: 'Firefox'
                })
            }
            if (userAgent.indexOf('Edge') !== -1){
                return state.merge({
                    browser: 'Edge'
                })
            }
            if (userAgent.indexOf('Chrome') !== -1){
                return state.merge({
                    browser: 'Chrome'
                })
            }
            if (userAgent.indexOf('Safari') !== -1){
                return state.merge({
                    browser: 'Safari'
                })
            }
        }
        return state
    }
})
