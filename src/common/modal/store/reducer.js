import {fromJS} from 'immutable'
import {TRIGGER_MODAL_IS_LOADING, TRIGGER_SHOW_MODAL} from "./actionTypes";
import {APPOINT_MODAL_MSG} from "../store";

const defaultState = fromJS({
    showModal: false,
    modalTitle: '提示',
    modalContent: '这是一个通知',
    onlyQrcode: false,
    postProcessor: () => {},
    isLoading: false
})

export default (state = defaultState, action) => {
    if(action.type === TRIGGER_SHOW_MODAL){
        if(action.value === false){
            return defaultState
        }
        return state.merge({
            showModal: action.value
        })
    }
    if(action.type === APPOINT_MODAL_MSG){
        return state.merge({
            modalTitle: action.value.modalTitle,
            modalContent: action.value.modalContent,
            onlyQrcode: action.value.onlyQrcode,
            postProcessor: action.value.postProcessor ? action.value.postProcessor : () => {}
        })
    }
    if(action.type === TRIGGER_MODAL_IS_LOADING){
        return state.merge({
            isLoading: action.value
        })
    }
    return state
}