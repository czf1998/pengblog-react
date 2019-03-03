import { put, takeEvery, takeLatest,select } from 'redux-saga/effects'

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
        createNoticeHomeStoreJumbotronDataReadyAction,
        createDeliverCommentListDataToArticlePageAction,
        createDeliverCountOfCommentDataToHomeAction,
        createPushPrograssToEndAction,
        createDeliverSubCommentListDataAction,
        createAppointNoticeContent,
        createAppendCommentJustSubmitAction,
        createDeliverDraftDataAction,
        createDeliverTitleImageUrlAction,
        createDeliverArticleListDataToManagePageAction,
        createDeliverArticleFilingDataToManagePageAction,
        createDeliverArticleLabelDataToManagePageAction,
        createRecordArticleHasBeenDeletedAction,
        createRecordArticleListHasBeenDeletedAction,
        createResetManagePageArticleListAction,
        createTriggerAlreadyLoggedInAction,
        createAppointFreshCommentsDataAction} from './actionCreators'
import {ArticleRequest,
        CommentRequest,
        ImageRequest,
        LoginRequest} from './request'
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
import {
    DELETE_ARTICLE_LIST,
    GET_MANAGE_PAGE_ARTICLE_FILING_DATA,
    GET_MANAGE_PAGE_ARTICLE_LABEL_DATA,
    GET_MANAGE_PAGE_ARTICLE_LIST_DATA,
    GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_FILING,
    GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_KEY_WORD, GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_LABEL
} from "../pages/managePage/store/actionType";
import {DELETE_ARTICLE} from "../pages/managePage/components/articleItem/store/actionTypes";
import {createTriggerShowModalAction} from "../common/modal/store";
import {
    createTiggerIsMultipleSelectingInManagePageAction,
    createTriggerIsLoadingManagePageArticleListDataAction
} from "../pages/managePage/store";
import {LOGIN} from "../pages/loginPage/store/actionTypes";
import {createTriggerIsLoggingInAction} from "../pages/loginPage/store";
import {GET_FRESH_COMMENTS_DATA} from "../pages/managePage/components/freshComments/store/actionTypes";


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
    yield takeEvery(GET_MANAGE_PAGE_ARTICLE_LIST_DATA, ajaxManagePageArticleListData)
    yield takeEvery(GET_MANAGE_PAGE_ARTICLE_FILING_DATA, ajaxManagePageArticleFilingData)
    yield takeEvery(GET_MANAGE_PAGE_ARTICLE_LABEL_DATA, ajaxManagePageArticleLabelData)
    yield takeEvery(GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_KEY_WORD, ajaxManagePageArticleListDataByKeyWord)
    yield takeEvery(GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_FILING, ajaxManagePageArticleListDataByFiling)
    yield takeEvery(GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_LABEL, ajaxManagePageArticleListDataByLabel)
    yield takeEvery(DELETE_ARTICLE, ajaxDeleteArticle)
    yield takeEvery(DELETE_ARTICLE_LIST, ajaxDeleteArticleList)
    yield takeEvery(LOGIN, ajaxLogin)
    yield takeEvery(GET_FRESH_COMMENTS_DATA, ajaxGetFreshCommentsData)
}

function* ajaxGetFreshCommentsData(action) {
    try{
        const res = yield CommentRequest.RequestFreshCommentListData(action.value)

        const appointFreshCommentsDataAction = createAppointFreshCommentsDataAction(res.data)
        yield put(appointFreshCommentsDataAction)
    }catch (err) {

    }
}

function* ajaxLogin(action) {
    try{
        const res = yield LoginRequest.RequestLogin(action.value)
        //console.log(res.data)

        //登录成功
        if(res.data.loginStatus === 1){
            //本地存储token以及过期时间
            let validTime = res.data.validTimeMillis
            let expTime = new Date().getTime() + validTime
            localStorage.setItem('token', JSON.stringify({token: res.data.token, expTime: expTime, username:action.value.username}))

            //更新reducer为已登录
            const triggerAlreadyLoggedInAction = createTriggerAlreadyLoggedInAction(true)
            yield put(triggerAlreadyLoggedInAction)

            /*通知窗口提示登录成功*/
            const appointNoticeContent = createAppointNoticeContent('登录成功')
            yield put(appointNoticeContent)

            return
        }

        //登陆失败
        if(res.data.loginStatus === 0){
            /*通知窗口提示登录失败*/
            const appointNoticeContent = createAppointNoticeContent('登录失败: ' + res.data.loginMsg)
            yield put(appointNoticeContent)

            //更新loginPage.reducer的isLoggingIn
            const triggerIsLoggingInAction = createTriggerIsLoggingInAction(false)
            yield put(triggerIsLoggingInAction)
        }


    }catch (err) {
        console.log('ERR IN ACTION: LOGIN  ERR: ' + err)

        /*通知窗口提示登录失败*/
        const appointNoticeContent = createAppointNoticeContent('登录失败: ' + err)
        yield put(appointNoticeContent)
    }
}

function* ajaxDeleteArticleList(action) {

    yield checkToken()

    try{
        yield ArticleRequest.RequestDeleteArticleList(action.value)

        //标记已删除的文章条目
        const recordArticleListHasBeenDeletedAction = createRecordArticleListHasBeenDeletedAction(action.value)
        yield put(recordArticleListHasBeenDeletedAction)

        //关闭modal
        const triggerShowModalAction = createTriggerShowModalAction(false)
        yield put(triggerShowModalAction)

        //关闭多选状态
        const triggerIsMultipleSelectingAction = createTiggerIsMultipleSelectingInManagePageAction(false)
        yield put(triggerIsMultipleSelectingAction)

        const delay = (ms) => new Promise((resolve) => {
            setTimeout(resolve, ms);
        })
        yield delay(500);

        //刷新managePage数据前先trigger页面为loading状态
        const triggerIsLoadingManagePageArticleListDataAction = createTriggerIsLoadingManagePageArticleListDataAction(true)
        yield put(triggerIsLoadingManagePageArticleListDataAction)

        //清空managePage页面数据articleList
        const resetManagePageArticleListAction = createResetManagePageArticleListAction()
        yield put(resetManagePageArticleListAction)

    }catch (err) {
        console.log('ERR IN ACTION: DELETE_ARTICLE_LIST  ERR: ' + err)

        //关闭modal
        const triggerShowModalAction = createTriggerShowModalAction(false)
        yield put(triggerShowModalAction)

        /*通知窗口提示异常*/
        const appointNoticeContent = createAppointNoticeContent('ERR IN ACTION: DELETE_ARTICLE_LIST  ERR: ' + err)
        yield put(appointNoticeContent)
    }
}

function* ajaxDeleteArticle(action) {

    yield checkToken()

    try{
        yield ArticleRequest.RequestDeleteArticle(action.value)

        //标记已删除的文章条目
        const recordArticleHasBeenDeletedAction = createRecordArticleHasBeenDeletedAction(action.value)
        yield put(recordArticleHasBeenDeletedAction)

        //关闭modal
        const triggerShowModalAction = createTriggerShowModalAction(false)
        yield put(triggerShowModalAction)

        //关闭多选状态
        const triggerIsMultipleSelectingAction = createTiggerIsMultipleSelectingInManagePageAction(false)
        yield put(triggerIsMultipleSelectingAction)

        const delay = (ms) => new Promise((resolve) => {
            setTimeout(resolve, ms);
        })
        yield delay(500);

        //刷新managePage数据前先trigger页面为loading状态
        const triggerIsLoadingManagePageArticleListDataAction = createTriggerIsLoadingManagePageArticleListDataAction(true)
        yield put(triggerIsLoadingManagePageArticleListDataAction)

        //清空managePage页面数据articleList
        const resetManagePageArticleListAction = createResetManagePageArticleListAction()
        yield put(resetManagePageArticleListAction)

    }catch (err) {
        console.log('ERR IN ACTION: DELETE_ARTICLE  ERR: ' + err)

        //关闭modal
        const triggerShowModalAction = createTriggerShowModalAction(false)
        yield put(triggerShowModalAction)

        /*通知窗口提示异常*/
        const appointNoticeContent = createAppointNoticeContent('ERR IN ACTION: DELETE_ARTICLE_LIST  ERR: ' + err)
        yield put(appointNoticeContent)
    }
}

function* ajaxManagePageArticleListDataByLabel(action) {
    try{
        const res = yield ArticleRequest.RequestArticleListDataByLabel(action.value)
        let appointDataAction = createDeliverArticleListDataToManagePageAction(res.data)
        yield put(appointDataAction)
    }catch (err) {
        console.log('ERR IN ACTION: GET_MANAGE_PAGE_ARTICLE_LIST  ERR: ' + err)
    }
}

function* ajaxManagePageArticleListDataByFiling(action) {
    try{
        const res = yield ArticleRequest.RequestArticleListDataByFiling(action.value)
        let appointDataAction = createDeliverArticleListDataToManagePageAction(res.data)
        yield put(appointDataAction)
    }catch (err) {
        console.log('ERR IN ACTION: GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_FILING  ERR: ' + err)
    }
}

function* ajaxManagePageArticleListDataByKeyWord(action) {
    try{
        const res = yield ArticleRequest.RequestArticleListDataByKeyWord(action.value)
        let appointDataAction = createDeliverArticleListDataToManagePageAction(res.data)
        yield put(appointDataAction)
    }catch (err) {
        console.log('ERR IN ACTION: GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_KEYWORD  ERR: ' + err)
    }
}

function* ajaxManagePageArticleLabelData() {
    try{
        const res = yield ArticleRequest.RequestArticleLabelData()
        let appointDataAction = createDeliverArticleLabelDataToManagePageAction(res.data)
        yield put(appointDataAction)
    }catch (err) {
        console.log('ERR IN ACTION: GET_MANAGE_PAGE_ARTICLE_LABEL_DATA  ERR: ' + err)
    }
}

function* ajaxManagePageArticleFilingData() {
    try{
        const res = yield ArticleRequest.RequestArticleFilingData()
        let appointDataAction = createDeliverArticleFilingDataToManagePageAction(res.data)
        yield put(appointDataAction)
    }catch (err) {
        console.log('ERR IN ACTION: GET_MANAGE_PAGE_ARTICLE_FILING_DATA  ERR: ' + err)
    }
}

function* ajaxManagePageArticleListData(action) {
    try{
        const res = yield ArticleRequest.RequestArticleListData(action.value)
        let appointDataAction = createDeliverArticleListDataToManagePageAction(res.data)
        yield put(appointDataAction)
    }catch (err) {
        console.log('ERR IN ACTION: GET_MANAGE_PAGE_ARTICLE_LIST_DATA  ERR: ' + err)
    }
}

function* ajaxUploadImage(action) {

    yield checkToken()

    try{
        const res = yield ImageRequest.UploadImage(action.value)
        let appointTitleImageUrlAction = createDeliverTitleImageUrlAction(res.data.imgUrl)
        yield put(appointTitleImageUrlAction)
    }catch (err) {
        console.log('ERR IN ACTION: UPLOAD_IMAGE  ERR: ' + err)

        /*通知窗口提示异常*/
        const appointNoticeContent = createAppointNoticeContent('ERR IN ACTION: UPLOAD_IMAGE  ERR: ' + err)
        yield put(appointNoticeContent)
    }
}

function* ajaxSaveArticle(action) {

    yield checkToken()

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
                action.value.goTo('/home/article/' + action.value.article_id)
            },2000)
        }
    }catch (err) {
        console.log('ERR IN ACTION: SAVE_ARTICLE  ERR: ' + err)

        /*通知窗口提示异常*/
        const appointNoticeContent = createAppointNoticeContent('文章发布失败: ' + err)
        yield put(appointNoticeContent)

    }
}

function* ajaxDraft() {

    yield checkToken()

    try{
        const res = yield ArticleRequest.RequestDraftData()
        let appointDataAction = createDeliverDraftDataAction(res.data)
        yield put(appointDataAction)

    }catch (err) {
        console.log('ERR IN ACTION: GET_DRAFT_DATA  ERR: ' + err)

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
        console.log('ERR IN ACTION: SUBMIT_COMMENT  ERR: ' + err)
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
        console.log('ERR IN ACTION: GET_COMMENT_LIST_DATA  ERR: ' + err)
    }
}

function* ajaxHomeArticleListData(action) {
    try{
        const res = yield ArticleRequest.RequestArticleListData(action.value)
        let appointDataAction = createDeliverArticleDataToHomeAction(res.data)
        yield put(appointDataAction)
     /*   const state = yield select();
      /!*  const isMobile = state.get('rootState').get('isMobile')
       /!* if(isMobile) {
            let pushPrograssBarToEndAction = createPushPrograssToEndAction({page: 'home-mobile'})
            yield put(pushPrograssBarToEndAction)
        }*!/!*!/*/
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
      /*  let pushPrograssBarToEndAction = createPushPrograssToEndAction({page: 'articlePage'})
        yield put(pushPrograssBarToEndAction)*/
    }catch (err) {
        console.log('ERR IN ACTION: GET_ARTICLE_PAGE_DATA  ERR: ' + err)
    }
}

export default mySaga;

function* checkToken(){
    const state = yield select();

    const goTo = state.get('router').get('goTo')

    if(localStorage.getItem('token') === undefined || localStorage.getItem('token') === null){
        goTo('/login')
        return
    }

    if(localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null){
        let tokenObj = JSON.parse(localStorage.getItem('token'))
        let expTime = tokenObj.expTime

        if(expTime < new Date().getTime()){
            goTo('/login')
        }
    }
}