import {fromJS} from 'immutable'
import {APPOINT_TITLE_IMAGE_URL} from "./actionTypes";

const defaultState = fromJS({
    imageUrl:'',
    sizeOfTitleImageFrame: fromJS({width: 700, height: 220})
})

export default (state = defaultState, action) => {
    if(action.type === APPOINT_TITLE_IMAGE_URL){
        return state.merge({
            imageUrl: action.value.fileReaderResult,
            sizeOfTitleImageFrame: fromJS(action.value.sizeOfTitleImageFrame)
        })
    }
    return state
}