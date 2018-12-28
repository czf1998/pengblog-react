import { fromJS } from 'immutable'
import { DELIVER_ARTICLE_LIST_DATA_TO_HOME } from '../../../store/actionTypesWithSaga'

const defaultState = fromJS({
    startIndex: 0,
    pageScale: 4,
    articleList: []
})

export default (state = defaultState, action) => {
    if(action.type === DELIVER_ARTICLE_LIST_DATA_TO_HOME) {
        return state.set('articleList', fromJS(action.value.articleList))
    }
    return state
}