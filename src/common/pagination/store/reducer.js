import {fromJS} from 'immutable'
import {} from "./actionTypes";
import {APPOINT_CURRENTPAGE_OF_PAGINATION} from "./actionTypes";
import {DELIVER_ARTICLE_LIST_DATA_TO_MANAGE_PAGE} from "../../../store/actionTypesWithSaga";

const defaultState = fromJS({
    managePage: fromJS({
        currentPage: 1,
        maxPage: 1,
        startIndex: 3,
        pageScale: 3,
    })
})

export default (state = defaultState, action) => {
    if(action.type === APPOINT_CURRENTPAGE_OF_PAGINATION){

        let paginationId = action.value.paginationId
        let currentPage = action.value.currentPage
        let startIndex = state.get(paginationId).get('startIndex') + (currentPage - state.get(paginationId).get('currentPage')) * state.get(paginationId).get('pageScale')

        if(currentPage === state.get(paginationId).get('currentPage')){
            return state
        }

        return state.set(paginationId, state.get(paginationId).merge({
            currentPage: currentPage,
            startIndex: startIndex
        }))

    }

    if(action.type === DELIVER_ARTICLE_LIST_DATA_TO_MANAGE_PAGE){

        return state.merge({
            managePage: state.get('managePage').merge({
                maxPage: action.value.maxPage
            })
        })
    }
    return state
}