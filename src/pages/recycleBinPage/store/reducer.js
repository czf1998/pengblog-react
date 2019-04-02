import {fromJS} from 'immutable'
import {
    DELIVER_ARTICLE_LIST_DATA_saga_recycleBinPage
} from "../../../store/actionTypesWithSaga";
import {TRIGGER_IS_LOADING} from "./actionTypes";


const defaultState = fromJS({
    articleList: undefined,
    isLoading: true,
    dataIsReady: false,
    recycleBinIsNull: false
})

export default (state = defaultState, action) => {

    if(action.type === DELIVER_ARTICLE_LIST_DATA_saga_recycleBinPage) {

        if(!action.value){
            return state.merge({
                recycleBinIsNull: true,
                dataIsReady: true,
                isLoading: false
            })
        }

        return state.merge({
            articleList: fromJS(action.value.articleList),
            dataIsReady: true,
            isLoading: false
        })
    }

    if(action.type === TRIGGER_IS_LOADING) {
        if(action.value.isLoadingId === 'recycleBinPage'){
            return state.merge({
                isLoading: action.value.isLoading
            })
        }
    }

    return state
}

