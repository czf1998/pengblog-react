import {fromJS} from 'immutable'
import {
    APPOINT_LOGIN_PAGE_INPUT_VALUE,
    COUNT_DOWN_SMS_SECOUND,
    TRIGGER_SHOW_WARN_OF_INPUT_OF_LOGIN_PAGE
} from "./actionTypes";
import {TRIGGER_IS_LOGGING_IN} from "./actionTypes";
import {
    TRIGGER_ALREADY_LOGGED_IN,
    TRIGGER_IS_GETTING_SMS
} from "../../../store/actionTypesWithSaga";

const defaultState = fromJS({
    username: fromJS({
        value: '',
        warnMsg: '尚未填写',
        showWarn: false
    }),
    phoneNumber: fromJS({
        value: '',
        warnMsg: '尚未填写',
        showWarn: false
    }),
    password: fromJS({
        value: '',
        warnMsg: '尚未填写',
        showWarn: false
    }),
    isLogging: false,
    alreadyLoggedIn: false,
    isGettingSms: false,
    haveGotSmsOnce: false,
    currentSecond: -1
})

export default (state = defaultState, action) => {

    if(action.type === APPOINT_LOGIN_PAGE_INPUT_VALUE){
        const target = state.get(action.value.inputId)
        return state.set(action.value.inputId, target.merge({
            value: action.value.inputValue
        }))
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

    if(action.type === TRIGGER_SHOW_WARN_OF_INPUT_OF_LOGIN_PAGE) {
        const target = state.get(action.value.inputId)

        return state.set(action.value.inputId, target.merge({
            showWarn: action.value.showWarn
        }))

    }
    if(action.type === TRIGGER_IS_GETTING_SMS){
        return state.merge({
            isGettingSms: action.value,
            haveGotSmsOnce: true,
            currentSecond: action.value ? 59 : -1
        })
    }

    if(action.type === COUNT_DOWN_SMS_SECOUND){
        return state.merge({
            currentSecond: state.get('currentSecond') - 1
        })
    }
    return state
}

