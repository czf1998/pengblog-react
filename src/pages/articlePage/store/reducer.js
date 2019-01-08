import { fromJS } from 'immutable'
import {
    DELIVER_ARTICLE_DATA_TO_ARTICLE_PAGE,
    DELIVER_COMMENT_LIST_DATA_TO_ARTICLE_PAGE,
    RESET_ARTICLE_PAGE_STORE
} from '../../../store/actionTypesWithSaga'
import {LOAD_ARTICLE_CACHE} from "./actionType";


const defaultState = fromJS({
    cache: {},
    article: {},
    startIndex: 0,
    pageScale: 5,
    maxPage: 1,
    currentPage: 0,
    countOfAllComment: 0,
    commentList: [],
    dataReady: false
})

const resetState = fromJS({
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
            cache: state.get('cache').merge(fromJS({
                article: fromJS(handleImgLabelWidth(action.value))
            })),
            article: fromJS(handleImgLabelWidth(action.value)),
            dataReady: true
        })
    }
    if(action.type === RESET_ARTICLE_PAGE_STORE) {
        return state.merge(resetState)
    }
    if(action.type === DELIVER_COMMENT_LIST_DATA_TO_ARTICLE_PAGE) {
        return state.merge({
            cache: state.get('cache').merge(fromJS({
                commentList: fromJS(action.value.commentList),
                countOfAllComment: action.value.countOfComment
            })),
            commentList: fromJS(action.value.commentList),
            countOfAllComment: action.value.countOfComment
        })
    }
    if(action.type === LOAD_ARTICLE_CACHE) {
        return state.merge({
            article: state.get('cache').get('article'),
            commentList: state.get('cache').get('commentList'),
            countOfAllComment: state.get('cache').get('countOfAllComment'),
            dataReady: true
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