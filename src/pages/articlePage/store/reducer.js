import { fromJS } from 'immutable'
import {
    DELIVER_ARTICLE_DATA_TO_ARTICLE_PAGE,
    DELIVER_COMMENT_LIST_DATA_TO_ARTICLE_PAGE,
    RESET_ARTICLE_PAGE_STORE
} from '../../../store/actionTypesWithSaga'

const defaultState = fromJS({
    article: {},
    startIndex: 0,
    pageScale: 5,
    maxPage: 1,
    currentPage: 0,
    countOfAllComment: 0,
    commentList: [],
    dataReady: false
})

export default (state = defaultState, action) => {
    if(action.type === DELIVER_ARTICLE_DATA_TO_ARTICLE_PAGE) {
        return state.merge({
            article: fromJS(handleImgLabelWidth(action.value)),
            dataReady: true
        })
    }
    if(action.type === RESET_ARTICLE_PAGE_STORE) {
        return state.merge({
            article: fromJS({}),
            dataReady: false
        })
    }
    if(action.type === DELIVER_COMMENT_LIST_DATA_TO_ARTICLE_PAGE) {
        return state.merge({
            commentList: fromJS(action.value.commentList),
            countOfAllComment: action.value.countOfComment
        })
    }
    return state
}

const handleImgLabelWidth = (article) => {
    var el = document.createElement('html')
    el.innerHTML = article.article_content
    let imgs = el.getElementsByTagName('img')
    for(let i = 0; i < imgs.length; i++) {
        if(imgs[i].attributes['width'] === undefined){
            imgs[i].style.width = '100%'
        }
    }
    article.article_content = el.innerHTML
    return article
}