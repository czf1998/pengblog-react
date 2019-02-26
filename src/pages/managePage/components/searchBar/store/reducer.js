import { fromJS } from 'immutable'
import {APPOINT_KEYWORD_OF_SEARCH_BAR, TRIGGER_SEARCH_INPUT_IS_FOCUS} from "./actionTypes";
import {RESET_CENTRAL_CONTROLLER_OF_MANAGE_PAGE} from "../../../store/actionType";
import {LABEL_CONTEXT, SEARCH_CONTEXT} from "../../../store/reducer";

const defaultState = fromJS({
    managePage: fromJS({
        isFocus: false,
        searchBarValue: ''
    })
})

export default (state = defaultState, action) => {
    if(action.type === TRIGGER_SEARCH_INPUT_IS_FOCUS){
        let searchBarId = action.value.searchBarId
        return state.set(searchBarId,state.get(searchBarId).merge({
            isFocus: action.value.isFocus
        }))
    }
    if(action.type === APPOINT_KEYWORD_OF_SEARCH_BAR){
        let searchBarId = action.value.searchBarId
        return state.set(searchBarId,state.get(searchBarId).merge({
            searchBarValue: action.value.searchBarValue
        }))
    }

    if(action.type === RESET_CENTRAL_CONTROLLER_OF_MANAGE_PAGE){
        if(action.value !== SEARCH_CONTEXT){
            return state.merge({
                managePage: state.get('managePage').set('searchBarValue','')
            })
        }
    }
    return state
}



