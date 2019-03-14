import {fromJS} from 'immutable'
import {APPOINT_CURRENT_PATH} from "./actionTypes";
import history from '../history'

const defaultState = fromJS({
    lastPath: '',
    currentPath: '',
    history: history,
    goTo: (path) => {
        if(history.location.pathname === path){
            return
        }
        history.push({
            pathname: path,
        })
    }
})

export default (state = defaultState, action) => {
    if(action.type === APPOINT_CURRENT_PATH){
        return state.merge({
            lastPath: state.get('currentPath'),
            currentPath: action.value
        })
    }
    return state
}