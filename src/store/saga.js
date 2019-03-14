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
        createAppointFreshCommentsDataAction,
        createRecordCommentHasBeenDeletedAction,
        createRecordSubCommentHasBeenDeletedAction,
        createDeliverCaptchaImageBase64Action,
        createTriggerShowCaptchaInputWarnAction,
    createTriggerIsGettingSmsAction} from './actionCreators'
import {ArticleRequest,
        CommentRequest,
        ImageRequest,
        LoginRequest,
        CaptchaRequest,
        SmsRequest} from './request'
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
import {GET_SMS, LOGIN, LOGIN_WITH_DYNAMIC_PASSWORD} from "../pages/loginPage/store/actionTypes";
import {createTriggerIsLoggingInAction} from "../pages/loginPage/store";
import {GET_FRESH_COMMENTS_DATA} from "../pages/managePage/components/freshComments/store/actionTypes";
import {DELETE_COMMENT_FROM_FRESH_COMMENTS} from "../pages/managePage/components/freshComments/components/freshCommentItem/store/actionTypes";
import {DELETE_COMMENT_FROM_ARTICLE_PAGE} from "../pages/articlePage/components/comment/store/actionTypes";
import {DELETE_SUB_COMMENT_FROM_ARTICLE_PAGE} from "../pages/articlePage/components/subComment/store/actionTypes";
import {GET_CAPTCHA_IMAGE} from "../common/captcha/store/actionTypes";


const NO_MORE_ITEM_AVAILABLE = 'noMoreItemAvailable'

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
    yield takeEvery(LOGIN_WITH_DYNAMIC_PASSWORD, ajaxLoginWithDynamicPassword)
    yield takeEvery(GET_FRESH_COMMENTS_DATA, ajaxGetFreshCommentsData)
    yield takeEvery(DELETE_COMMENT_FROM_FRESH_COMMENTS, ajaxDeleteCommentFromFreshComments)
    yield takeEvery(DELETE_COMMENT_FROM_ARTICLE_PAGE, ajaxDeleteCommentFromArticlePage)
    yield takeEvery(DELETE_SUB_COMMENT_FROM_ARTICLE_PAGE, ajaxDeleteSubCommentFromArticlePage)
    yield takeEvery(GET_CAPTCHA_IMAGE, ajaxGetCaptchaImage)
    yield takeEvery(GET_SMS, ajaxGetSms)
}

function* ajaxLoginWithDynamicPassword() {

    try{

        const state = yield select()

        const phoneNumber = state.get('loginPage').get('phoneNumber').get('value')
        const password = state.get('loginPage').get('password').get('value')

        const loginData = {
            phoneNumber: phoneNumber,
            password: password,
        }


        const res = yield LoginRequest.RequestLoginWithDynamicPassword(loginData)

        //登录成功
        if(res.data.loginStatus === 'success'){
            //本地存储token以及过期时间
            let validTime = res.data.validTimeMillis
            let expTime = new Date().getTime() + validTime
            localStorage.setItem('token', JSON.stringify({token: res.data.token, expTime: expTime, phoneNumber:phoneNumber}))

            //更新reducer为已登录
            const triggerAlreadyLoggedInAction = createTriggerAlreadyLoggedInAction(true)
            yield put(triggerAlreadyLoggedInAction)

            /*通知窗口提示登录成功*/
            const appointNoticeContent = createAppointNoticeContent('登录成功')
            yield put(appointNoticeContent)

            return
        }

        //登陆失败
        if(res.data.loginStatus === 'fail'){
            /*通知窗口提示登录失败*/
            const appointNoticeContent = createAppointNoticeContent('登录失败: ' + res.data.message)
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

function* ajaxGetSms() {
    try{

        const state = yield select()

        const phoneNumber = state.get('loginPage').get('phoneNumber').get('value')


        const res = yield SmsRequest.RequestSms(phoneNumber)

        if(res.data.success === true){

            const triggerIsGettingSmsAction = createTriggerIsGettingSmsAction(true)

            yield put(triggerIsGettingSmsAction)

            return
        }

        /*通知窗口提示异常*/
        const appointNoticeContent = createAppointNoticeContent('获取动态密码失败: ' + res.data.message)

        yield put(appointNoticeContent)


    }catch (err) {
        console.log('ERR IN ACTION: GET_SMS  ERR: ' + err)
    }
}

function* ajaxGetCaptchaImage(action) {

    try{
        const res = yield CaptchaRequest.RequestCaptchaImage(action.value.captchaId)

        const deliverImageActionValue = {
            captchaImage: res.data,
            captchaHost: action.value.captchaHost
        }

        const deliverImageAction = createDeliverCaptchaImageBase64Action(deliverImageActionValue)

        yield put(deliverImageAction)

    }catch (err) {
        console.log('ERR IN ACTION: GET_CAPTCHA_IMAGE  ERR: ' + err)
    }
}

function* ajaxLogin(action) {

    const captchaPass = yield checkCaptchaCode('loginPage')

    if(!captchaPass){

        const triggerIsLoggingInAction = createTriggerIsLoggingInAction(false)
        yield put(triggerIsLoggingInAction)

        return
    }

    try{

        const state = yield select()

        const username = state.get('loginPage').get('username').get('value')
        const password = state.get('loginPage').get('password').get('value')
        const captchaId = state.get('captcha').get('loginPage').get('captchaId')
        const captchaCode = state.get('captcha').get('loginPage').get('captchaCode')

        const loginData = {
            username: username,
            password: password,
            captchaId: captchaId,
            captchaCode: captchaCode,
        }


        const res = yield LoginRequest.RequestLogin(loginData)

        //登录成功
        if(res.data.loginStatus === 'success'){
            //本地存储token以及过期时间
            let validTime = res.data.validTimeMillis
            let expTime = new Date().getTime() + validTime
            localStorage.setItem('token', JSON.stringify({token: res.data.token, expTime: expTime, username:username}))

            //更新reducer为已登录
            const triggerAlreadyLoggedInAction = createTriggerAlreadyLoggedInAction(true)
            yield put(triggerAlreadyLoggedInAction)

            /*通知窗口提示登录成功*/
            const appointNoticeContent = createAppointNoticeContent('登录成功')
            yield put(appointNoticeContent)

            return
        }

        //登陆失败
        if(res.data.loginStatus === 'fail'){
            /*通知窗口提示登录失败*/
            const appointNoticeContent = createAppointNoticeContent('登录失败: ' + res.data.message)
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

function* ajaxDeleteSubCommentFromArticlePage(action) {
    yield checkToken()

    try{
        yield CommentRequest.RequestDeleteComment(action.value.comment_id)


        const delay = (ms) => new Promise((resolve) => {
            setTimeout(resolve, ms);
        })
        yield delay(500);


        const state = yield select()

        const res = yield CommentRequest.RequestSubCommentListData({
            comment_id: action.value.refer_comment_id,
            startIndex: 0,
            pageScale: state.get('subComment').get('pageScale')
        })

        const value = {
            comment_id: action.value.comment_id,
            refer_comment_id: action.value.refer_comment_id,
            maxPage: res.data.maxPage
        }

        const recordSubCommentHasBeenDeletedAction = createRecordSubCommentHasBeenDeletedAction(value)
        yield put(recordSubCommentHasBeenDeletedAction)

    }catch (err) {
        console.log('ERR IN ACTION: DELETE_COMMENT  ERR: ' + err)

        /*通知窗口提示异常*/
        const appointNoticeContent = createAppointNoticeContent('ERR IN ACTION: DELETE_COMMENT  ERR: ' + err)
        yield put(appointNoticeContent)
    }
}

function* ajaxDeleteCommentFromArticlePage(action) {
    yield checkToken()

    try{
        yield CommentRequest.RequestDeleteComment(action.value.comment_id)

        //刷新页面指数
        const state = yield select()
        const pageScale = state.get('articlePage').get('pageScale')
        const res = yield CommentRequest.RequestTopLevelCommentListData({article_id: action.value.article_id,
                                                                            startIndex: 0,
                                                                            pageScale: pageScale})

        const delay = (ms) => new Promise((resolve) => {
            setTimeout(resolve, ms);
        })
        yield delay(500);

        //标记已删除的评论条目并刷新页面指数
        const value = {
            comment_id: action.value.comment_id,
            maxPage: res.data.maxPage
        }

        const recordCommentHasBeenDeletedAction = createRecordCommentHasBeenDeletedAction(value)
        yield put(recordCommentHasBeenDeletedAction)


    }catch (err) {
        console.log('ERR IN ACTION: DELETE_COMMENT  ERR: ' + err)

        /*通知窗口提示异常*/
        const appointNoticeContent = createAppointNoticeContent('ERR IN ACTION: DELETE_COMMENT  ERR: ' + err)
        yield put(appointNoticeContent)
    }
}

function* ajaxDeleteCommentFromFreshComments(action) {

    yield checkToken()

    try{
        yield CommentRequest.RequestDeleteComment(action.value)

        //刷新页面指数
        const state = yield select()
        const pageScale = state.get('freshComments').get('pageScale')
        const res = yield CommentRequest.RequestFreshCommentListData({startIndex: 0, pageScale:pageScale})

        const delay = (ms) => new Promise((resolve) => {
            setTimeout(resolve, ms);
        })
        yield delay(500);

        //标记已删除的文章条目并刷新页面指数
        const value = {
            comment_id: action.value,
            maxPage: res.data.maxPage
        }

        const recordCommentHasBeenDeletedAction = createRecordCommentHasBeenDeletedAction(value)
        yield put(recordCommentHasBeenDeletedAction)


    }catch (err) {
        console.log('ERR IN ACTION: DELETE_COMMENT  ERR: ' + err)

        /*通知窗口提示异常*/
        const appointNoticeContent = createAppointNoticeContent('ERR IN ACTION: DELETE_COMMENT  ERR: ' + err)
        yield put(appointNoticeContent)
    }
}

function* ajaxGetFreshCommentsData(action) {
    try{

        const res = yield CommentRequest.RequestFreshCommentListData(action.value)

        const appointFreshCommentsDataAction = createAppointFreshCommentsDataAction(res.data)
        yield put(appointFreshCommentsDataAction)
    }catch (err) {

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

function* checkCaptchaCode(captchaHost) {
    try{

        const state = yield select()

        const captchaId = state.get('captcha').get(captchaHost).get('captchaId')
        const uncheckCaptchaCode = state.get('captcha').get(captchaHost).get('captchaCode')

        if(uncheckCaptchaCode === '' || uncheckCaptchaCode == null){

            //验证码input显示警告
            const value = {
                captchaHost: captchaHost,
                showWarn: true
            }

            const action = createTriggerShowCaptchaInputWarnAction(value)
            yield put(action)

            return false
        }

        const value = {
            captchaId: captchaId,
            uncheckCaptchaCode: uncheckCaptchaCode
        }

        const res = yield CaptchaRequest.RequestCheck(value)

        /*通知窗口提示提交验证码验证失败*/
        if(res.data.pass !== true){
            if(res.data.message === 'wrong'){
                const appointNoticeContent = createAppointNoticeContent('验证码填写错误')
                yield put(appointNoticeContent)
            }else if(res.data.message === 'overdue'){
                const appointNoticeContent = createAppointNoticeContent('验证码已过期')
                yield put(appointNoticeContent)
            }

            return false
        }

        return true
    }catch (err) {
        console.log('ERR IN ACTION: CHECK_CAPTCHA_CODE  ERR: ' + err)
    }
}