import { put, takeEvery, takeLatest, select } from 'redux-saga/effects'

import {
    GET_ARTICLE_DATA_FOR_ARTICLE_PAGE_DATA,
    GET_COMMENT_LIST_DATA, GET_COUNT_OF_COMMENT,
    GET_HOME_ARTICLE_LIST_DATA,
    GET_JUMBOTRON_ARTICLE_DATA,
    OBSERVE_SCROLL_TOP_OF_ELEMENT_EL
} from './actionTypesWithSaga'
import {
    createAppointShowSubCommentEditorManagerAction,
    GET_SUB_COMMENT_LIST_DATA
} from "../pages/articlePage/components/comment/store";
import {createDeliverArticleDataToHomeAction,
        createRecordScrollTopOfElementElAction,
        createDeliverArticleDataToJumbotronAction,
        createDeliverArticleDataToArticlePage,
        createNoticeHomeStoreArticleListDataReadyAction,
        createNoticeHomeStoreJumbotronDataReadyAction,
        createDeliverCommentListDataToArticlePageAction,
        createDeliverCountOfCommentDataToHomeAction,
        createPushPrograssToEndAction,
        createDeliverSubCommentListDataAction,
        createAppointNoticeContent,
        createAppendCommentJustSubmitAction,
        createDeliverDraftDataAction,
        createDeliverTitleImageUrlAction} from './actionCreators'
import {ArticleRequest,
        CommentRequest,
        ImageRequest} from './request'
import {SUBMIT_COMMENT} from "../pages/articlePage/components/commentEditor/store/actionType";
import {
    createAppointInputValueAction,
    createTriggerCommentEditorLoadingAction
} from "../pages/articlePage/components/commentEditor/store";
import {COMMENT_CONTENT} from "../pages/articlePage/components/commentEditor/constant";
import {GET_DRAFT_DATA, SAVE_ARTICLE_ACTION} from "../pages/articleEditPage/store/actionTypes";
import {createTriggerIsSavingDraftAction} from "../pages/articleEditPage/store";
import {createTriggerIsSavingArticleAction} from "../common/header/store";
import {UPLOAD_TITLE_IMAGE} from "../pages/articleEditPage/components/titleImage/store/actionTypes";


function* mySaga() {
    yield takeEvery(GET_HOME_ARTICLE_LIST_DATA, ajaxHomeArticleListData)
    yield takeLatest(OBSERVE_SCROLL_TOP_OF_ELEMENT_EL, recordScrollTopOfElementEl)
    yield takeEvery(GET_JUMBOTRON_ARTICLE_DATA, ajaxJumbotronArticleData)
    yield takeEvery(GET_ARTICLE_DATA_FOR_ARTICLE_PAGE_DATA, ajaxArticleDataForArticlePageData)
    yield takeEvery(GET_COMMENT_LIST_DATA, ajaxCommentListData)
    yield takeEvery(GET_COUNT_OF_COMMENT, ajaxCountOfComment)
    yield takeEvery(GET_SUB_COMMENT_LIST_DATA, ajaxSubCommentListData)
    yield takeEvery(SUBMIT_COMMENT, ajaxSubmitComment)
    yield takeEvery(GET_DRAFT_DATA, ajaxDraft)
    yield takeEvery(SAVE_ARTICLE_ACTION, ajaxSaveArticle)
    yield takeEvery(UPLOAD_TITLE_IMAGE, ajaxUploadImage)
}

function* ajaxUploadImage(action) {
    try{
        const res = yield ImageRequest.UploadImage(action.value)
        let appointTitleImageUrlAction = createDeliverTitleImageUrlAction(res.data.imgUrl)
        yield put(appointTitleImageUrlAction)
    }catch (err) {
        console.log('ERR IN ACTION: GET_COUNT_OF_COMMENT  ERR: ' + err)
    }
}

function* ajaxSaveArticle(action) {
    try{
        yield ArticleRequest.SaveArticle(action.value)
        const triggerIsSavingDraftAction = createTriggerIsSavingDraftAction(false)
        yield put(triggerIsSavingDraftAction)
        const triggerIsSavingArticleAction = createTriggerIsSavingArticleAction(false)
        yield put(triggerIsSavingArticleAction)

        if(action.value.article_type === 'article'){
            /*通知窗口提示提交成功*/
            const appointNoticeContent = createAppointNoticeContent('文章发布成功！即将跳转')
            yield put(appointNoticeContent)
            setTimeout(() => {
                action.value.goTo('/article/' + action.value.article_id)
            },2000)
        }
    }catch (err) {
        console.log('ERR IN ACTION: SAVE_ARTICLE  ERR: ' + err)
        /*通知窗口提示提交成功*/
        const appointNoticeContent = createAppointNoticeContent('文章发布失败: ' + err)
        yield put(appointNoticeContent)
    }
}

function* ajaxDraft() {
    try{
        const res = yield ArticleRequest.RequestDraftData()
        let appointDataAction = createDeliverDraftDataAction(res.data)
        yield put(appointDataAction)

        //推进进度条
        let pushPrograssBarToEndAction = createPushPrograssToEndAction({page: 'edit'})
        yield put(pushPrograssBarToEndAction)
    }catch (err) {
        console.log('ERR IN ACTION: GET_COUNT_OF_COMMENT  ERR: ' + err)
    }
}

function* ajaxSubmitComment(action) {
    try{
        const res = yield CommentRequest.SubmitCommentListData(action.value)
        if(res.status === 200){

            /*结束submit按钮加载状态*/
            const triggerCommentEditorLoadingActionValue = {
                isLoading: false,
                editorId: action.value.editorId
            }
            const triggerCommentEditorLoadingAction = createTriggerCommentEditorLoadingAction(triggerCommentEditorLoadingActionValue)
            yield put(triggerCommentEditorLoadingAction)

            /*通知窗口提示提交成功*/
            const appointNoticeContent = createAppointNoticeContent('评论提交成功！')
            yield put(appointNoticeContent)


            /*重置文本编辑框正文value*/
            const appointInputValue = {
                editorId: action.value.editorId,
                input: COMMENT_CONTENT,
                inputValue: ''
            }
            const appointInputValueAction = createAppointInputValueAction(appointInputValue)
            yield put(appointInputValueAction)

            /*挂载刚刚提交的留言*/
            const appendCommentJustSubmitValue = {
                commentId: res.data.commentIdJustSubmit,
                ...action.value
            }
            const appendCommentJustSubmitAction = createAppendCommentJustSubmitAction(appendCommentJustSubmitValue)
            yield put(appendCommentJustSubmitAction)

            //关闭subCommentEditor
            const appointShowSubCommentEditorManagerActionValue = {
                hostTopLevelCommentId: 0,
                triggerFromCommentId: 0,
                replyingVisitorName:''
            }
            const appointShowSubCommentEditorManagerAction = createAppointShowSubCommentEditorManagerAction(appointShowSubCommentEditorManagerActionValue)
            yield put(appointShowSubCommentEditorManagerAction)
        }
    }catch (err) {
        const appointNoticeContent = createAppointNoticeContent('评论提交失败: ' + err.response.data.msg)
        yield put(appointNoticeContent)

        /*结束submit按钮加载状态*/
        const triggerCommentEditorLoadingActionValue = {
            isLoading: false,
            editorId: action.value.editorId
        }
        const triggerCommentEditorLoadingAction = createTriggerCommentEditorLoadingAction(triggerCommentEditorLoadingActionValue)
        yield put(triggerCommentEditorLoadingAction)
    }
}

function* ajaxSubCommentListData(action) {
    try{
        const res = yield CommentRequest.RequestSubCommentListData(action.value)
        const value = {
            referCommentId: action.value.comment_id,
            ...res.data
        }
        let appointDataAction = createDeliverSubCommentListDataAction(value)
        yield put(appointDataAction)
    }catch (err) {
        console.log('ERR IN ACTION: GET_COUNT_OF_COMMENT  ERR: ' + err)
    }
}

function* ajaxCountOfComment(action) {
    try{
        const res = yield CommentRequest.RequestCountOfComment(action.value)
        let appointDataAction = createDeliverCountOfCommentDataToHomeAction(action.value, res.data)
        yield put(appointDataAction)
    }catch (err) {
        console.log('ERR IN ACTION: GET_COUNT_OF_COMMENT  ERR: ' + err)
    }

}

function* ajaxCommentListData(action) {
    try{
        const res = yield CommentRequest.RequestTopLevelCommentListData(action.value)
        let appointDataAction = createDeliverCommentListDataToArticlePageAction(res.data)
        yield put(appointDataAction)
    }catch (err) {
        console.log('ERR IN ACTION: GET_HOME_ARTICLE_LIST_DATA  ERR: ' + err)
    }
}

function* ajaxHomeArticleListData(action) {
    try{
        const res = yield ArticleRequest.RequestArticleListData(action.value)
        let appointDataAction = createDeliverArticleDataToHomeAction(res.data)
        yield put(appointDataAction)
        let noticeAction = createNoticeHomeStoreArticleListDataReadyAction()
        yield put(noticeAction)
        const state = yield select();
        const isMobile = state.get('rootState').get('isMobile')
        if(isMobile) {
            let pushPrograssBarToEndAction = createPushPrograssToEndAction({page: 'home-mobile'})
            yield put(pushPrograssBarToEndAction)
        }
    }catch (err) {
        console.log('ERR IN ACTION: GET_HOME_ARTICLE_LIST_DATA  ERR: ' + err)
    }
}

function* ajaxJumbotronArticleData(action) {
    try{
        const res = yield ArticleRequest.RequestArticleData(action.value.article_id)
        let appointDataAction = createDeliverArticleDataToJumbotronAction(res.data)
        yield put(appointDataAction)
        let noticeAction = createNoticeHomeStoreJumbotronDataReadyAction()
        yield put(noticeAction)
        let pushPrograssBarToEndAction = createPushPrograssToEndAction({page: 'home'})
        yield put(pushPrograssBarToEndAction)
    }catch (err) {
        console.log('ERR IN ACTION: GET_JUMBOTRON_ARTICLE_DATA  ERR: ' + err)
    }
}

function* recordScrollTopOfElementEl(action) {
    let nextAction = createRecordScrollTopOfElementElAction(action.value)
    yield put(nextAction)
}


function* ajaxArticleDataForArticlePageData(action) {
    try{
        const res = yield ArticleRequest.RequestArticleData(action.value.article_id)
        let appointDataAction = createDeliverArticleDataToArticlePage(res.data)
        yield put(appointDataAction)
        let pushPrograssBarToEndAction = createPushPrograssToEndAction({page: 'articlePage'})
        yield put(pushPrograssBarToEndAction)
    }catch (err) {
        console.log('ERR IN ACTION: GET_ARTICLE_PAGE_DATA  ERR: ' + err)
    }
}

export default mySaga;