import { fromJS } from 'immutable'
import {TRIGGER_SEARCH_INPUT_IS_FOCUS} from "./actionTypes";

const defaultState = fromJS({
    isFocus:false
})

export default (state = defaultState, action) => {
    if(action.type === TRIGGER_SEARCH_INPUT_IS_FOCUS){
        return state.merge({
            isFocus: action.value
        })
    }
    return state
}



