import { fromJS } from 'immutable'
import {
    APPOINT_NANOBAR_MANAGER,
    RECORD_NANOBAR_TIMER,
} from "./actionType";

const defaultState = fromJS({
    nanobarManager: {},
    nanobarGo: undefined
})

export default (state = defaultState, action) => {
    if(action.type === APPOINT_NANOBAR_MANAGER) {
        return state.merge({
            nanobarManager: fromJS(action.value)
        })
    }
    if(action.type === RECORD_NANOBAR_TIMER) {
        return state.merge({
            nanobarManager: state.get('nanobarManager').merge({
                nanobarTimer: action.value
            })
        })
    }
    return state
}