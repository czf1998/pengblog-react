import { fromJS } from 'immutable'
import { DELIVER_ARTICLE_DATA_TO_JUMBOTRON } from '../../../../../store/actionTypesWithSaga'

const defaultState = fromJS({
    article:{},
    articleSummary: '',
    articlePreviewImages: []
})

export default (state = defaultState, action) => {
    if(action.type === DELIVER_ARTICLE_DATA_TO_JUMBOTRON){
        return state.merge({
            article: fromJS(action.value),
            articleSummary: handleJumbotronSummary(action.value.article_summary),
            articlePreviewImages: fromJS(extractImageUrl(action.value.article_content))
        })
    }
    return state
}

const handleJumbotronSummary = (article_summary) => {
    let idx = article_summary.indexOf('。') < 0 ? article_summary.indexOf('.') : article_summary.indexOf('。')
    idx = idx < 0 ? 15 : idx
    return article_summary.substring(0, idx + 1)
}

const extractImageUrl = (article_content) => {
    var el = document.createElement('html')
    el.innerHTML = article_content
    let articlePreviewImages = []
    for(let i = 0; i < el.getElementsByTagName('img').length; i++) {
        if(i < 3) {
            articlePreviewImages = articlePreviewImages.concat(el.getElementsByTagName('img')[i].src)
        }
    }
    return articlePreviewImages
}