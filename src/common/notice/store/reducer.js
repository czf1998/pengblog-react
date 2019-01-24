import {fromJS} from 'immutable'
import {TRIGGER_SHOW_NOTICE} from "./actionTypes";
import {APPOINT_NOTICE_CONTENT} from "../../../store/actionTypesWithSaga";

const defaultState = fromJS({
    showNotice: false,
    noticeContent: 'normal notice'
})

export default (state = defaultState, action) => {
    if(action.type === TRIGGER_SHOW_NOTICE){
        return state.merge({
            showNotice: action.value
        })
    }
    if(action.type === APPOINT_NOTICE_CONTENT){
        return state.merge({
            showNotice: true,
            noticeContent: action.value
        })
    }
    return state
}