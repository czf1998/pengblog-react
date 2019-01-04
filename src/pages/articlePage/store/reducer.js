import { fromJS } from 'immutable'
import { DELIVER_ARTICLE_DATA_TO_ARTICLE_PAGE } from '../../../store/actionTypesWithSaga'

const defaultState = fromJS({
    article: {}
})

export default (state = defaultState, action) => {
    if(action.type === DELIVER_ARTICLE_DATA_TO_ARTICLE_PAGE) {
        return state.merge({
            article: fromJS(action.value)
        })
    }
    return state
}