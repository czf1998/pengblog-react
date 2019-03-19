import { fromJS } from 'immutable'
import {} from "./actionTypes";
import {DELIVER_CAPTCHA_IMAGE_BASE64, TRIGGER_SHOW_CAPTCHA_INPUT_WARN} from "../../../store/actionTypesWithSaga";
import {GET_CAPTCHA_IMAGE} from "./actionTypes";
import {APPOINT_CAPTCHA_CODE} from "./actionTypes";
import {TRIGGER_IS_LOADING_CAPTCHA_IMAGE} from "./actionTypes";


const defaultState = fromJS({
    loginPage:fromJS({
        captchaId: '',
        captchaCode: '',
        captchaImage: '',
        isLoading: true,
        showWarn: false,
        warnMsg: '尚未填写'
    }),
    topLevelCommentEditor:fromJS({
        captchaId: '',
        captchaCode: '',
        captchaImage: '',
        isLoading: true,
        showWarn: false,
        warnMsg: '尚未填写'
    }),
    modal:fromJS({
        captchaId: '',
        captchaCode: '',
        captchaImage: '',
        isLoading: true,
        showWarn: false,
        warnMsg: '尚未填写'
    })
})

export default (state = defaultState, action) => {
    if(action.type === GET_CAPTCHA_IMAGE){
        const target = state.get(action.value.captchaHost)

        return state.set(action.value.captchaHost,target.merge({
            captchaId: action.value.captchaId,
            isLoading: true
            })
        )
    }

    if(action.type === DELIVER_CAPTCHA_IMAGE_BASE64){

        let target = state.get(action.value.captchaHost)

       return state.set(action.value.captchaHost,
               target.merge({
               captchaImage: action.value.captchaImage,
               isLoading: false
           })
       )
    }

    if(action.type === APPOINT_CAPTCHA_CODE){

        let target = state.get(action.value.captchaHost)

        return state.set(action.value.captchaHost, target.merge({
                captchaCode: action.value.captchaCode
            })
        )
    }

    if(action.type === TRIGGER_SHOW_CAPTCHA_INPUT_WARN){

        const target = state.get(action.value.captchaHost)

        return state.set(action.value.captchaHost, target.merge({
                showWarn: action.value.showWarn
            })
        )
    }

    if(action.type === TRIGGER_IS_LOADING_CAPTCHA_IMAGE){
        const target = state.get(action.value.captchaHost)

        return state.set(action.value.captchaHost, target.merge({
            isLoading: action.value.isLoading
        }))
    }
    return state
}

