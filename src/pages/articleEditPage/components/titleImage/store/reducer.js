import {fromJS} from 'immutable'
import {APPOINT_SIZE_OF_TITLE_IMAGE, APPOINT_TITLE_IMAGE_URL_BASE64} from "./actionTypes";
import {DELIVER_DRAFT_DATA, DELIVER_TITLE_IMAGE_URL} from "../../../../../store/actionTypesWithSaga";

const defaultState = fromJS({
    imageUrlBase64:undefined,
    sizeOfTitleImageFrame: fromJS({width: 700, height: 220})
})

export default (state = defaultState, action) => {
    if(action.type === APPOINT_TITLE_IMAGE_URL_BASE64){
        return state.merge({
            imageUrlBase64: action.value.fileReaderResult,
            sizeOfTitleImageFrame: fromJS(action.value.sizeOfTitleImageFrame)
        })
    }
    if(action.type === DELIVER_TITLE_IMAGE_URL){
        return state.merge({
            imageUrl: action.value
        })
    }
    if(action.type === DELIVER_DRAFT_DATA) {

        return state.merge({
            imageUrl: action.value.article_titleImageUrl
        })
    }
    if(action.type === APPOINT_SIZE_OF_TITLE_IMAGE){
        return state.merge({
            sizeOfTitleImageFrame: state.get('sizeOfTitleImageFrame').merge({
                width: action.value.width,
                heigth: action.value.height
            })
        })
    }
    return state
}