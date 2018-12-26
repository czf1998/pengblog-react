import { reducer as headerReducer }from '../common/header/store'
import { combineReducers } from 'redux'

const defaultState = {
    rootStatus: 1,
    basicUIFeatures: {
        borderRadius: '4px',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
        widthOfMainArea: '750px'
    }
}

export default combineReducers({
    header: headerReducer,
    rootState:(state = defaultState, action) => {
        return state
    }
})
