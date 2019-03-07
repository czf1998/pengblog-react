import {fromJS} from 'immutable'
import {} from "./actionTypes";
import {APPOINT_LOGIN_PAGE_INPUT_VALUE} from "./actionTypes";
import {TRIGGER_IS_LOGGING_IN} from "./actionTypes";
import {DELIVER_CAPTCHA_IMAGE_BASE64, TRIGGER_ALREADY_LOGGED_IN} from "../../../store/actionTypesWithSaga";
import {GET_CAPTCHA_IMAGE} from "./actionTypes";

const defaultState = fromJS({
    username: '',
    password: '',
    isLogging: false,
    alreadyLoggedIn: false,
    captcha: '',
    captchaImage: '',
    captchaId: undefined
})

export default (state = defaultState, action) => {

    if(action.type === APPOINT_LOGIN_PAGE_INPUT_VALUE){
        return state.set(action.value.inputId, action.value.inputValue)
    }

    if(action.type === TRIGGER_IS_LOGGING_IN){
        return state.merge({
            isLogging: action.value
        })
    }

    if(action.type === TRIGGER_ALREADY_LOGGED_IN){
        return state.merge({
            alreadyLoggedIn: action.value
        })
    }

    if(action.type === GET_CAPTCHA_IMAGE){
        return state.merge({
            captchaId: action.value
        })
    }

    if(action.type === DELIVER_CAPTCHA_IMAGE_BASE64){
        return state.merge({
            captchaImage: action.value
        })
    }
    return state
}

