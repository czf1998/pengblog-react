import {fromJS} from 'immutable'
import {} from "./actionTypes";
import {APPOINT_CURRENTPAGE_OF_PAGINATION} from "./actionTypes";
import {
    APPOINT_MAX_PAGE_SAGA_PAGINATION,
    DELIVER_ARTICLE_LIST_DATA_TO_MANAGE_PAGE,
    RESET_MANAGE_PAGE_ARTICLE_LIST
} from "../../../store/actionTypesWithSaga";
import {
    APPOINT_MANAGE_PAGE_PAGINATION,
    RESET_PAGE_INDEX_OF_PAGINATION
} from "../../../pages/managePage/store/actionType";

//根据浏览器显示高度初始化managePage的pageScale


const defaultState = fromJS({
    managePage: fromJS({
        currentPage: 0,
        maxPage: 1,
        startIndex: window.innerWidth < 500 ? - 8 : - parseInt((window.innerHeight - 200)/54),
        pageScale: window.innerWidth < 500 ? 8 : parseInt((window.innerHeight - 200)/54),
    }),
    ipManagePage:fromJS({
        currentPage: 0,
        maxPage: 1,
        startIndex: window.innerWidth < 500 ? - 8 : - parseInt((window.innerHeight - 200)/50),
        pageScale: window.innerWidth < 500 ? 8 : parseInt((window.innerHeight - 200)/50),
    }),
    recycleBinPage:fromJS({
        currentPage: 0,
        maxPage: 1,
        startIndex: window.innerWidth < 500 ? - 8 : - parseInt((window.innerHeight - 200)/50),
        pageScale: window.innerWidth < 500 ? 8 : parseInt((window.innerHeight - 200)/50),
    })
})


export default (state = defaultState, action) => {
    if(action.type === APPOINT_CURRENTPAGE_OF_PAGINATION){

        let paginationId = action.value.paginationId
        let currentPage = action.value.currentPage
        let startIndex = state.get(paginationId).get('startIndex') + (currentPage - state.get(paginationId).get('currentPage')) * state.get(paginationId).get('pageScale')

        if(currentPage > 0) {
            startIndex = startIndex < 0 ? 0 : startIndex
        }

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

    if(action.type === APPOINT_MAX_PAGE_SAGA_PAGINATION){

        const target = state.get(action.value.paginationId)

        return state.set(action.value.paginationId, target.merge({
            maxPage: action.value.maxPage
        }))
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