import {fromJS} from 'immutable'
import {} from "./actionTypes";
import {APPOINT_LOGIN_PAGE_INPUT_VALUE} from "./actionTypes";
import {TRIGGER_IS_LOGGING_IN} from "./actionTypes";

const defaultState = fromJS({
    username: '',
    password: '',
    isLoggingIn: false
})

export default (state = defaultState, action) => {

    if(action.type === APPOINT_LOGIN_PAGE_INPUT_VALUE){
        return state.set(action.value.inputId, action.value.inputValue)
    }

    if(action.type === TRIGGER_IS_LOGGING_IN){
        return state.merge({
            isLoggingIn: action.value
        })
    }
    return state
}

