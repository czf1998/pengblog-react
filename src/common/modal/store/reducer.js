import {fromJS} from 'immutable'
import {TRIGGER_SHOW_MODAL} from "./actionTypes";
import {APPOINT_MODAL_MSG} from "../store";

const defaultState = fromJS({
    showModal: false,
    modalTitle: '提示',
    modalContent: '这是一个通知',
    onlyQrcode: false,
    postProcessor: () => {}
})

export default (state = defaultState, action) => {
    if(action.type === TRIGGER_SHOW_MODAL){
        return state.merge({
            showModal: action.value
        })
    }
    if(action.type === APPOINT_MODAL_MSG){
        return state.merge({
            modalTitle: action.value.modalTitle,
            modalContent: action.value.modalContent,
            onlyQrcode: action.value.onlyQrcode
        })
    }
    return state
}