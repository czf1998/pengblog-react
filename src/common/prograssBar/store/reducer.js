import { fromJS } from 'immutable'
import {APPOINT_PROGRASS_BAR_HANDLER, RESET_PROGRASS_BAR} from "./actionType";

const defaultState = fromJS({
    prograssBarHandler: undefined,
    prograssBarStatus: 0
})

export default (state = defaultState, action) => {
    if(action.type === APPOINT_PROGRASS_BAR_HANDLER) {
        return state.merge({
            prograssBarHandler: action.value
        })
    }
    if(action.type === RESET_PROGRASS_BAR) {
        return state.merge({
            prograssBarStatus: state.get('prograssBarStatus') + 1
        })
    }
    return state
}