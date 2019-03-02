import {fromJS} from 'immutable'
import {} from "./actionTypes";
import {APPOINT_CURRENTPAGE_OF_PAGINATION} from "./actionTypes";
import {
    DELIVER_ARTICLE_LIST_DATA_TO_MANAGE_PAGE,
    RESET_MANAGE_PAGE_ARTICLE_LIST
} from "../../../store/actionTypesWithSaga";
import {APPOINT_MANAGE_PAGE_PAGINATION} from "../../../pages/managePage/store/actionType";

const defaultState = fromJS({
    managePage: fromJS({
        currentPage: 0,
        maxPage: 1,
        startIndex: -8,
        pageScale: 8,
    })
})

export default (state = defaultState, action) => {
    if(action.type === APPOINT_CURRENTPAGE_OF_PAGINATION){

        let paginationId = action.value.paginationId
        let currentPage = action.value.currentPage
        let startIndex = state.get(paginationId).get('startIndex') + (currentPage - state.get(paginationId).get('currentPage')) * state.get(paginationId).get('pageScale')
        startIndex = startIndex < 0 ? 0 : startIndex

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
                maxPage: action.value.maxPage,
            })
        })
    }

    if(action.type === APPOINT_MANAGE_PAGE_PAGINATION){
        return state.merge({
            managePage: state.get('managePage').merge({
                currentPage: action.value.currentPage,
                startIndex: action.value.startIndex
            })
        })
    }

    if(action.type === RESET_MANAGE_PAGE_ARTICLE_LIST){
        return defaultState
    }
    return state
}