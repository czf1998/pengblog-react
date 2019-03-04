import { fromJS } from 'immutable'
import {
    APPEND_COMMENT_JUST_SUBMIT,
    DELIVER_ARTICLE_DATA_TO_ARTICLE_PAGE,
    DELIVER_COMMENT_LIST_DATA_TO_ARTICLE_PAGE, GET_COMMENT_LIST_DATA, RECORD_COMMENT_HAS_BEEN_DELETED,
    RESET_ARTICLE_PAGE_STORE
} from '../../../store/actionTypesWithSaga'
import {LOAD_ARTICLE_CACHE, RECORD_SCROLL_TOP_OF_ARTICLE_PAGE} from "./actionType";
import {APPOINT_SIZE_OF_TITLE_IMAGE} from "../../articleEditPage/components/titleImage/store/actionTypes";


const defaultState = fromJS({
    cache: {},
    article: {},
    titleImageSize: fromJS({}),
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
    article: fromJS({}),
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
                article: fromJS(action.value)
            })),
            article: fromJS(action.value),
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
            startIndex: state.get('startIndex') + state.get('pageScale'),
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
        if(action.value.referCommentId !== ''
            &&
            action.value.referCommentId !== undefined
            &&
            action.value.referCommentId !== null ){
            return state.merge({
                countOfAllComment: state.get('countOfAllComment') + 1
            })
        }
        return state.merge({
            commentList: state.get('commentList').push(constructComment(action.value)),
            countOfAllComment: state.get('countOfAllComment') + 1
        })
    }
    if(action.type === APPOINT_SIZE_OF_TITLE_IMAGE){
        return state.merge({
            titleImageSize: state.get('titleImageSize').merge({
                width: action.value.width,
                height: action.value.height
            })
        })
    }
    if(action.type === RECORD_COMMENT_HAS_BEEN_DELETED){
        let commentList = state.get('commentList').toJS()
        let startIndex = state.get('startIndex')
        let newCommentList = []

        commentList.map((item) => {

            if(item.comment_id === action.value.comment_id){
                return
            }
            newCommentList.push(item)
        })

        return state.merge({
            commentList: fromJS(newCommentList),
            startIndex: startIndex - (commentList.length - newCommentList.length),
            maxPage: action.value.maxPage,
            countOfAllComment: state.get('countOfAllComment') - (commentList.length - newCommentList.length)
        })
    }
    return state
}



export const constructComment = (commentData) => {
    const date = new Date()
    const comment = {
        comment_author: {
            visitor_name: commentData.visitorName,
            visitor_siteAddress: commentData.visitorSiteAddress,
            visitor_email: commentData.visitorEmail
        },
        comment_hostArticle: {
            article_id: commentData.article_id,
        },
        comment_referComment: {
            comment_id: commentData.referCommentId
        },
        comment_id: commentData.commentId,
        comment_content: commentData.commentContent,
        comment_releaseTime: date.toString()
    }
    return fromJS(comment)
}

export const uniqueCommentList = (commentList) => {

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