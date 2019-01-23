import {fromJS} from 'immutable'
import {APPOINT_TITLE_IMAGE_URL} from "./actionTypes";

const defaultState = fromJS({
    imageUrl:''
})

export default (state = defaultState, action) => {
    if(action.type === APPOINT_TITLE_IMAGE_URL){
        return state.merge({
            imageUrl: action.value
        })
    }
    return state
}