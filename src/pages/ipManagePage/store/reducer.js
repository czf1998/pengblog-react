import {fromJS} from 'immutable'
import {DELIVER_IP_LIST_DATA_SAGA_IPMANAGEPAGE} from "../../../store/actionTypesWithSaga";
import {TRIGGER_IS_LOADING} from "./actionTypes";


const defaultState = fromJS({
    ipList: undefined,
    isLoading: true,
    dataIsReady: false
})

export default (state = defaultState, action) => {

    if(action.type === DELIVER_IP_LIST_DATA_SAGA_IPMANAGEPAGE) {
        return state.merge({
            ipList: fromJS(action.value.ipList),
            dataIsReady: true,
            isLoading: false
        })
    }

    if(action.type === TRIGGER_IS_LOADING) {
        if(action.value.isLoadingId === 'ipManagePage'){
            return state.merge({
                isLoading: action.value.isLoading
            })
        }
    }

    return state
}

