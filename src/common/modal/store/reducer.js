import {fromJS} from 'immutable'
import {TRIGGER_MODAL_IS_LOADING, TRIGGER_SHOW_MODAL} from "./actionTypes";
import {APPOINT_MODAL_MSG} from "../store";

export const COMMON_MODAL = 'common'
export const SHARE_TO_WECHAT_MODAL = 'shareToWechat'
export const CONTACT_ME_MODAL = 'contactMe'
export const CAPTCHA_MODAL = 'captcha'

const defaultState = fromJS({
    showModal: false,
    modalTitle: '提示',
    modalContent: '这是一个通知',
    postProcessor: () => {},
    isLoading: false,
    context: COMMON_MODAL,
    notifyOnly: false
})

export default (state = defaultState, action) => {
    if(action.type === TRIGGER_SHOW_MODAL){

        if(!action.value){
            return defaultState
        }

        return state.merge({
            showModal: action.value
        })
    }
    if(action.type === APPOINT_MODAL_MSG){
        return state.merge({
            modalTitle: action.value.modalTitle ? action.value.modalTitle : state.get('modalTitle'),
            modalContent: action.value.modalContent ? action.value.modalContent : state.get('modalContent'),
            postProcessor: action.value.postProcessor ? action.value.postProcessor : () => {},
            context: action.value.context ? action.value.context : state.get('context'),
            notifyOnly: action.value.notifyOnly ? action.value.notifyOnly : state.get('notifyOnly')
        })
    }
    if(action.type === TRIGGER_MODAL_IS_LOADING){
        return state.merge({
            isLoading: action.value
        })
    }
    return state
}