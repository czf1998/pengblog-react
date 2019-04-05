import { fromJS } from 'immutable'
import {
    DELIVER_ARTICLE_FILING_DATA_TO_MANAGE_PAGE,
    DELIVER_ARTICLE_LABEL_DATA_TO_MANAGE_PAGE,
    DELIVER_ARTICLE_LIST_DATA_TO_MANAGE_PAGE,
    RECORD_ARTICLE_HAS_BEEN_DELETE,
    RECORD_ARTICLE_LIST_HAS_BEEN_DELETE,
    RESET_MANAGE_PAGE_ARTICLE_LIST
} from "../../../store/actionTypesWithSaga";
import {
    GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_FILING,
    GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_KEY_WORD,
    GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_LABEL,
    RESET_CENTRAL_CONTROLLER_OF_MANAGE_PAGE, TRIGGER_IS_MULTIPLE_SELECTING_IN_MANAGE_PAGE,
    TRIGGER_ISLOADING_MANAGE_PAGE_ARTICLE_LIST_DATA
} from "./actionType";
import {APPOINT_CURRENT_LABEL} from "../components/articleClassification/store/actionTypes";
import {
    APPOINT_ARTICLE_BEING_SELECTED_IN_MANAGE_PAGE
} from "../components/articleItem/store/actionTypes";

export const COMMON_CONTEXT = 'common'
export const SEARCH_CONTEXT = 'search'
export const FILING_CONTENT = 'filing'
export const LABEL_CONTEXT = 'label'

const defaultState = fromJS({
    articleList: undefined,
    isLoading: false,
    articleFilingObj: undefined,
    articleLabelObjList: undefined,
    currentLabel: undefined,
    currentContext: COMMON_CONTEXT,
    dataIsReady: false,
    isMultipleSelecting: false,
    articleListBeingSelected: [],
    articleHasBeenDeleteList: []
})

export default (state = defaultState, action) => {
    if(action.type === TRIGGER_ISLOADING_MANAGE_PAGE_ARTICLE_LIST_DATA){
        return state.merge({
            isLoading: action.value
        })
    }
    if(action.type === DELIVER_ARTICLE_LIST_DATA_TO_MANAGE_PAGE){
        return state.merge({
            articleList: fromJS(action.value.articleList),
            maxPage: action.value.maxPage,
            isLoading: false,
            articleListDataIsReady: true,
            dataIsReady: true
        })
    }

    if(action.type === DELIVER_ARTICLE_FILING_DATA_TO_MANAGE_PAGE){
        return state.merge({
            articleFilingObj: fromJS(action.value)
        })
    }

    if(action.type === DELIVER_ARTICLE_LABEL_DATA_TO_MANAGE_PAGE){
        return state.merge({
            articleLabelObjList: fromJS(action.value)
        })
    }

    if(action.type === GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_KEY_WORD){
        return state.merge({
            currentContext: SEARCH_CONTEXT
        })
    }

    if(action.type === GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_FILING){
        return state.merge({
            currentContext: FILING_CONTENT
        })
    }

    if(action.type === GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_LABEL){
        return state.merge({
            currentContext: LABEL_CONTEXT
        })
    }

    if(action.type === APPOINT_CURRENT_LABEL){
        return state.merge({
            currentLabel: action.value
        })
    }

    if(action.type === RESET_CENTRAL_CONTROLLER_OF_MANAGE_PAGE){
        if(action.value !== LABEL_CONTEXT){
            return state.merge({
                currentLabel: defaultState.get('currentLabel')
            })
        }
    }


    if(action.type === TRIGGER_IS_MULTIPLE_SELECTING_IN_MANAGE_PAGE){

        if(!action.value){
            return state.merge({
                isMultipleSelecting: action.value,
                articleListBeingSelected:fromJS([])
            })
        }

        return state.merge({
            isMultipleSelecting: action.value
        })
    }

    if(action.type === APPOINT_ARTICLE_BEING_SELECTED_IN_MANAGE_PAGE){

        let articleListBeingSelected = state.get('articleListBeingSelected').toJS()

        const articleHasBeingSelectedAlready = articleListBeingSelected.some((item) => {
            return item === action.value.article_id
        })

        if(!articleHasBeingSelectedAlready && action.value.isSelected){
            return state.merge({
                articleListBeingSelected:fromJS(articleListBeingSelected).push(action.value.article_id)
            })
        }

        if(!action.value.isSelected){
            articleListBeingSelected.forEach((item,index) => {
                if(item === action.value.article_id){
                    articleListBeingSelected.splice(index,1)
                }
            })
            return state.merge({
                articleListBeingSelected:fromJS(articleListBeingSelected)
            })
        }
    }

    if(action.type === RECORD_ARTICLE_HAS_BEEN_DELETE){
        let articleHasBeenDeleteList = state.get('articleHasBeenDeleteList')
        return state.merge({
            articleHasBeenDeleteList: fromJS(articleHasBeenDeleteList.push(action.value))
        })
    }

    if(action.type === RECORD_ARTICLE_LIST_HAS_BEEN_DELETE){
        let articleHasBeenDeleteList = state.get('articleHasBeenDeleteList')
        return state.merge({
            articleHasBeenDeleteList: fromJS(articleHasBeenDeleteList.concat(action.value))
        })
    }

    if(action.type === RESET_MANAGE_PAGE_ARTICLE_LIST){
        return state.merge({
            articleList: fromJS([])
        })
    }
    return state
}