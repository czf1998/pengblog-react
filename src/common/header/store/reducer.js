import { fromJS } from 'immutable'
import {TRIGGER_SHOW_MENU_LIST_OF_MOBILE_HEADER} from "./actionTypes";


const defaultState = fromJS({
    height: '70px',
    backgroundColor: 'white',
    metaColor: '#3367d6',
    showMenuList: false
})

export default (state = defaultState, action) => {

    if(action.type === TRIGGER_SHOW_MENU_LIST_OF_MOBILE_HEADER){
        return state.merge({
            showMenuList: action.value
        })
    }
    return state
}

