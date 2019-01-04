import { reducer as headerReducer } from '../common/header/store'
import { reducer as homeReducer } from '../pages/home/store'
import { reducer as jumbotronReducer } from '../pages/home/components/jumbotrion/store'
import { reducer as articleReducer } from '../pages/article/store'
import { fromJS } from 'immutable'
import { RECORD_SCROLL_TOP_OF_ELEMENT_EL } from './actionTypesWithSaga'

import { combineReducers } from 'redux-immutable'

const defaultState = fromJS({
    rootStatus: 1,
    basicUIFeatures: {
        borderRadius: '4px',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
        widthOfMainArea: '750px',
        animateTime: 1000
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
    article: articleReducer,
    rootState:(state = defaultState, action) => {
        if(action.type === RECORD_SCROLL_TOP_OF_ELEMENT_EL){
            return state.merge({
                scrollTopOfElementEl: action.value,
                offsetTopOfElementEl: document.body.offsetHeight,
                heightOfBrowser: window.innerHeight,
                widthOfBrowser: window.innerWidth,
                basicUIFeatures: window.innerWidth > 750 ?
                    fromJS(state.get('basicUIFeatures').merge({
                    widthOfMainArea: '750px'
                }))
                    :
                    fromJS(state.get('basicUIFeatures').merge({
                    widthOfMainArea: '100%'
                })),
                isMobile: window.innerWidth > 750 ? false : true
            })
        }
        return state
    }
})
