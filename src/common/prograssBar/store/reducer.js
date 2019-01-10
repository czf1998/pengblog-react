import { fromJS } from 'immutable'
import {
    APPOINT_NANOBAR_MANAGER,
    RECORD_NANOBAR_TIMER,
} from "./actionType";

const defaultState = fromJS({
    prograssBarManager: {},
    nanobarGo: undefined
})

export default (state = defaultState, action) => {
    if(action.type === APPOINT_NANOBAR_MANAGER) {
        return state.merge({
            prograssBarManager: fromJS(action.value)
        })
    }
    if(action.type === RECORD_NANOBAR_TIMER) {
        return state.merge({
            prograssBarManager: state.get('prograssBarManager').merge({
                prograssTimer: action.value
            })
        })
    }
    return state
}