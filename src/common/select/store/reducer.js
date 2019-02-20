import { fromJS } from 'immutable'
import {APPOINT_SELECT_CONTENT} from "./actionTypes";


const defaultState = fromJS({
    year: undefined,
    month: undefined
})

export default (state = defaultState, action) => {
    if(action.type === APPOINT_SELECT_CONTENT){
        //console.log(action)
        return state.set(action.value.selectId, action.value.selectValue)
    }
    return state
}

