import { fromJS } from 'immutable'
import {
    APPEND_COMMENT_JUST_SUBMIT,
    DELIVER_ARTICLE_DATA_TO_ARTICLE_PAGE,
    DELIVER_COMMENT_LIST_DATA_TO_ARTICLE_PAGE, GET_COMMENT_LIST_DATA,
    RESET_ARTICLE_PAGE_STORE
} from '../../../store/actionTypesWithSaga'
import {LOAD_ARTICLE_CACHE, RECORD_SCROLL_TOP_OF_ARTICLE_PAGE} from "./actionType";


const defaultState = fromJS({
    cache: {},
    article: {},
    startIndex: 0,
    pageScale: 5,
    maxPage: 1,
    currentPage: 0,
    countOfAllComment: 0,
    commentList: [],
    dataReady: false,
    isLoadingMoreComment: false,
    scrollPosition: 0
})

const resetState = fromJS({
    article: {},
    startIndex: 0,
    pageScale: 3,
    maxPage: 1,
    currentPage: 0,
    countOfAllComment: 0,
    commentList: [],
    dataReady: false
})





export default (state = defaultState, action) => {
    if(action.type === RECORD_SCROLL_TOP_OF_ARTICLE_PAGE) {
        return state.merge({
            scrollPosition: action.value.scrollPosition
        })
    }
    if(action.type === GET_COMMENT_LIST_DATA) {
        return state.merge({
            isLoadingMoreComment: true
        })
    }

    if(action.type === DELIVER_ARTICLE_DATA_TO_ARTICLE_PAGE) {
        return state.merge({
            cache: state.get('cache').merge(fromJS({
                article: fromJS(handleImgLabelWidth(action.value))
            })),
            article: fromJS(handleImgLabelWidth(action.value)),
            dataReady: true,
            scrollPosition: 0
        })
    }

    if(action.type === RESET_ARTICLE_PAGE_STORE) {
        return state.merge(resetState)
    }

    if(action.type === DELIVER_COMMENT_LIST_DATA_TO_ARTICLE_PAGE) {
       // console.log(state.get('commentList').concat(fromJS(action.value.commentList)))
        //console.log(uniqueCommentList(state.get('commentList').concat(fromJS(action.value.commentList))))
        return state.merge({
            cache: state.get('cache').merge(fromJS({
                commentList: uniqueCommentList(state.get('commentList').concat(fromJS(action.value.commentList))),
                countOfAllComment: action.value.countOfComment,
                startIndex: state.get('startIndex'),
                maxPage: state.get('maxPage'),
                currentPage: state.get('currentPage'),
            })),
            commentList: uniqueCommentList(state.get('commentList').concat(fromJS(action.value.commentList))),
            countOfAllComment: action.value.countOfComment,
            maxPage: action.value.maxPage,
            currentPage: state.get('currentPage') + 1,
            startIndex: (state.get('currentPage') + 1) * state.get('pageScale'),
            isLoadingMoreComment: false
        })
    }

    if(action.type === LOAD_ARTICLE_CACHE) {
        return state.merge({
            article: state.get('cache').get('article'),
            commentList: state.get('cache').get('commentList'),
            countOfAllComment: state.get('cache').get('countOfAllComment'),
            startIndex: state.get('cache').get('startIndex'),
            maxPage: state.get('cache').get('maxPage'),
            currentPage: state.get('cache').get('currentPage'),
            dataReady: true
        })
    }

    if(action.type === APPEND_COMMENT_JUST_SUBMIT) {
        return state.merge({
            commentList: state.get('commentList').push(constructComment(action.value.commentJustSubmit,action.value.commentIdJustSubmit)),
            countOfAllComment: state.get('countOfAllComment') + 1
        })
    }
    return state
}

const handleImgLabelWidth = (article) => {
    var el = document.createElement('html')
    el.innerHTML = article.article_content
    let imgs = el.getElementsByTagName('img')
    for(let i = 0; i < imgs.length; i++) {
        if(imgs[i].attributes['width'] === undefined || window.innerWidth <= 750){
            imgs[i].style.width = '100%'
        }
    }
    article.article_content = el.innerHTML
    return article
}

const constructComment = (commentData,commentId) => {
    const date = new Date()
    const comment = {
        comment_author: {
            visitor_name: commentData.visitorName,
            visitor_siteAddress: commentData.visitorSiteAddress,
            visitor_email: commentData.visitorEmail
        },
        comment_id: commentId,
        comment_content: commentData.commentContent,
        comment_releaseTime: date.toString()
    }
    return fromJS(comment)
}

const uniqueCommentList = (commentList) => {

    let uniqueCommentList = []

    commentList.forEach((listItem) => {
        if(uniqueCommentList.every((uniqueListItem) => {
            return uniqueListItem.get('comment_id') !== listItem.get('comment_id')
        })){
            uniqueCommentList.push(listItem)
            //console.log(uniqueCommentList)
        }
    })
    //console.log(uniqueCommentList)
    return fromJS(uniqueCommentList)
}