import { fromJS } from 'immutable'
import {
    APPOINT_NANOBAR_MANAGER,
    RECORD_NANOBAR_TIMER,
} from "./actionType";
import {PUSH_PROGRASS_TO_END} from "../../../store/actionTypesWithSaga";
import {PUSH_PROGRASS_TO_MILEPOST_STARTUP_PROGRASSBAR} from "../../startup/store/actionTypes";

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

    if(action.type === PUSH_PROGRASS_TO_END) {
        const prograssBarManager = state.get('prograssBarManager')
        prograssBarManager.get('prograssBarGoToTheEnd')(prograssBarManager.get('prograssTimer'), action.value)
    }

    return state
}