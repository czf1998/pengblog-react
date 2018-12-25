import { reducer as headerReducer }from '../common/header/store'
import { combineReducers } from 'redux'

const defaultState = {
    rootStatus: 1,
    widthOfMainArea: '750px'
}

export default combineReducers({
    header: headerReducer,
    rootState:(state = defaultState, action) => {
        return state
    }
})
