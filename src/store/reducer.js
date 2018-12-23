import { reducer as headerReducer }from '../common/header/store'
import { combineReducers } from 'redux'

const defaultState = {
    rootStatus: 1
}

export default combineReducers({
    header: headerReducer,
    rootState:(state = defaultState, action) => {
        return null
    }
})
