import { fromJS } from 'immutable'
import {APPOINT_SELECT_CONTENT} from "./actionTypes";
import {RESET_CENTRAL_CONTROLLER_OF_MANAGE_PAGE} from "../../../pages/managePage/store/actionType";
import {FILING_CONTENT, SEARCH_CONTEXT} from "../../../pages/managePage/store/reducer";


const defaultState = fromJS({
    year: undefined,
    month: undefined
})

export default (state = defaultState, action) => {
    if(action.type === APPOINT_SELECT_CONTENT){
        //console.log(action)
        return state.set(action.value.selectId, action.value.selectValue)
    }
    if(action.type === RESET_CENTRAL_CONTROLLER_OF_MANAGE_PAGE){
        if(action.value !== FILING_CONTENT){
            return state.merge({
                year: defaultState.get('year'),
                month: defaultState.get('month')
            })
        }
    }
    return state
}

