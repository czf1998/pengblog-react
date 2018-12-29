import { reducer as headerReducer } from '../common/header/store'
import { reducer as homeReducer } from '../pages/home/store'
import { fromJS } from 'immutable'
import { RECORD_SCROLL_TOP_OF_ELEMENT_EL } from './actionTypesWithSaga'

import { combineReducers } from 'redux-immutable'

const defaultState = fromJS({
    rootStatus: 1,
    basicUIFeatures: {
        borderRadius: '4px',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
        widthOfMainArea: '750px'
    },
    scrollTopOfElementEl: 0
})

export default combineReducers({
    header: headerReducer,
    home: homeReducer,
    rootState:(state = defaultState, action) => {
        if(action.type === RECORD_SCROLL_TOP_OF_ELEMENT_EL){
            return state.set('scrollTopOfElementEl', action.value)
        }
        return state
    }
})
