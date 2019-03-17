import {fromJS} from 'immutable'
import {} from "./actionTypes";
import {APPOINT_CURRENTPAGE_OF_PAGINATION} from "./actionTypes";
import {
    DELIVER_ARTICLE_LIST_DATA_TO_MANAGE_PAGE,
    RESET_MANAGE_PAGE_ARTICLE_LIST
} from "../../../store/actionTypesWithSaga";
import {
    APPOINT_MANAGE_PAGE_PAGINATION,
    RESET_PAGE_INDEX_OF_PAGINATION
} from "../../../pages/managePage/store/actionType";

//根据浏览器显示高度初始化managePage的pageScale
let pageScaleDefault = window.innerWidth < 800 ? 8 : parseInt((window.innerHeight - 300)/54)
pageScaleDefault = pageScaleDefault < 8 ? 8 : pageScaleDefault
const startIndexDefault = -pageScaleDefault


const defaultState = fromJS({
    managePage: fromJS({
        currentPage: 0,
        maxPage: 1,
        startIndex: startIndexDefault,
        pageScale: pageScaleDefault,
    })
})

const resetState = fromJS({
    managePage: fromJS({
        currentPage: 1,
        maxPage: 1,
        startIndex: startIndexDefault + pageScaleDefault,
        pageScale: pageScaleDefault,
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

    if(action.type === RESET_PAGE_INDEX_OF_PAGINATION){
        return state.set(action.value, resetState.get(action.value))
    }
    return state
}