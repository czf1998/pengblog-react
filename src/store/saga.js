import { put, takeEvery, takeLatest,select } from 'redux-saga/effects'

import {
    GET_ARTICLE_DATA_FOR_ARTICLE_PAGE,
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
        createRecordArticleListHasBeenDeletedAction,
        createTriggerAlreadyLoggedInAction,
        createAppointFreshCommentsDataAction,
        createRecordCommentHasBeenDeletedAction,
        createRecordSubCommentHasBeenDeletedAction,
        createDeliverCaptchaImageBase64Action,
        createTriggerShowCaptchaInputWarnAction,
        createMarkCommentWhichIPBeenBanAction,
        createMarkCommentWhichIPBeenLiftedAction,
        createDeliverIpListDataToIpManagePageAction,
        createResetArticleEditPageAction,
        createTriggerIsGettingSmsAction,
        createAppointCaptchaWarnMsgAction,
        createDeliverArticleListDataToRecycleBinPageAction,
        createRecordEditingArticleIdAction,
        createAppointMaxPageToPaginationAction} from './actionCreators'
import {ArticleRequest,
        CommentRequest,
        ImageRequest,
        LoginRequest,
        CaptchaRequest,IpRequest,
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
    GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_KEY_WORD,
    GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_LABEL
} from "../pages/managePage/store/actionType";
import {DELETE_ARTICLE} from "../pages/managePage/components/articleItem/store/actionTypes";
import {
    createAppointModalMsgAction,
    createTriggerModalIsLoadingAction,
    createTriggerShowModalAction
} from "../common/modal/store";
import {
    createTiggerIsMultipleSelectingInManagePageAction
} from "../pages/managePage/store";
import {GET_SMS, LOGIN, LOGIN_WITH_DYNAMIC_PASSWORD} from "../pages/loginPage/store/actionTypes";
import {createTriggerIsLoggingInAction} from "../pages/loginPage/store";
import {GET_FRESH_COMMENTS_DATA} from "../pages/managePage/components/freshComments/store/actionTypes";
import {DELETE_COMMENT_FROM_FRESH_COMMENTS} from "../pages/managePage/components/freshComments/components/freshCommentItem/store/actionTypes";
import {
    BAN_IP_COMMENT_SAGA,
    DELETE_COMMENT_FROM_ARTICLE_PAGE, LIFTED_IP_IPITEM_and_COMMENT_SAGA
} from "../pages/articlePage/components/comment/store/actionTypes";
import {DELETE_SUB_COMMENT_FROM_ARTICLE_PAGE} from "../pages/articlePage/components/subComment/store/actionTypes";
import {GET_CAPTCHA_IMAGE} from "../common/captcha/store/actionTypes";
import {GET_HOME_ARTICLE_LIST_DATA_BY_KEYWORD} from "../pages/home/store/actionType";
import {CAPTCHA_MODAL, COMMON_MODAL} from "../common/modal/store/reducer";
import {CLEAN_RECYCLE_BIN_modal_saga, SUBMIT_COMMENT_WITH_CAPTCHA} from "../common/modal/store/actionTypes";
import {GET_IP_LIST_DATA_OF_IP_MANAGE_PAGE_IPMANAGEPAGE_SAGA} from "../pages/ipManagePage/store/actionTypes";
import {createAppointCurrentPageOfPaginationAction} from "../common/pagination/store";
import {RECOVER_ARTICLE_deletedArticleItem_saga} from "../pages/recycleBinPage/components/articleItem/store/actionTypes";
import {GET_ARTICLE_LIST_DATA_recycleBinPage_saga} from "../pages/recycleBinPage/store/actionTypes";


function* mySaga() {
    yield takeEvery(GET_HOME_ARTICLE_LIST_DATA, ajaxHomeArticleListData)
    yield takeEvery(GET_HOME_ARTICLE_LIST_DATA_BY_KEYWORD, ajaxHomeArticleListDataByKeyword)
    yield takeLatest(OBSERVE_SCROLL_TOP_OF_ELEMENT_EL, recordScrollTopOfElementEl)
    yield takeEvery(GET_JUMBOTRON_ARTICLE_DATA, ajaxJumbotronArticleData)
    yield takeEvery(GET_ARTICLE_DATA_FOR_ARTICLE_PAGE, ajaxArticleDataForArticlePageData)
    yield takeEvery(GET_COMMENT_LIST_DATA, ajaxCommentListData)
    yield takeEvery(GET_COUNT_OF_COMMENT, ajaxCountOfComment)
    yield takeEvery(GET_SUB_COMMENT_LIST_DATA, ajaxSubCommentListData)
    yield takeEvery(SUBMIT_COMMENT, ajaxCheckWetherNeedCaptchaForSubmitComment)
    yield takeEvery(SUBMIT_COMMENT_WITH_CAPTCHA, ajaxSubmitCommentWithCaptcha)
    yield takeEvery(GET_DRAFT_DATA, ajaxDraft)
    yield takeEvery(SAVE_ARTICLE_ACTION, ajaxSaveArticle)
    yield takeEvery(UPLOAD_TITLE_IMAGE, ajaxUploadImage)
    yield takeEvery(GET_MANAGE_PAGE_ARTICLE_LIST_DATA, ajaxManagePageArticleListData)
    yield takeEvery(GET_MANAGE_PAGE_ARTICLE_FILING_DATA, ajaxManagePageArticleFilingData)
    yield takeEvery(GET_MANAGE_PAGE_ARTICLE_LABEL_DATA, ajaxManagePageArticleLabelData)
    yield takeEvery(GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_KEY_WORD, ajaxManagePageArticleListDataBykeyword)
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
    yield takeEvery(BAN_IP_COMMENT_SAGA, ajaxBanIP)
    yield takeEvery(LIFTED_IP_IPITEM_and_COMMENT_SAGA, ajaxLiftedIP)
    yield takeEvery(GET_IP_LIST_DATA_OF_IP_MANAGE_PAGE_IPMANAGEPAGE_SAGA, ajaxGetIpListDataOfIpManagePage)
    yield takeEvery(GET_ARTICLE_LIST_DATA_recycleBinPage_saga, ajaxGetRecycleBinPageArticleListData)
    yield takeEvery(RECOVER_ARTICLE_deletedArticleItem_saga, ajaxRecoverArticle)
    yield takeEvery(CLEAN_RECYCLE_BIN_modal_saga, ajaxCleanRecycleBin)
}

function* ajaxCleanRecycleBin() {
    try{

        yield ArticleRequest.RequestDestroyAllArticleDeleted()

        const triggerModalIsLoadingAction = createTriggerModalIsLoadingAction(false)

        yield put(triggerModalIsLoadingAction)

        const shutdownModalAction = createTriggerShowModalAction(false)

        yield put(shutdownModalAction)


        const value = {
            paginationId: 'recycleBinPage',
            currentPage: 0
        }

        yield delay(1000)

        const appointPagaAction = createAppointCurrentPageOfPaginationAction(value)

        yield put(appointPagaAction)

        const noticeAction = createAppointNoticeContent("清空回收站成功")

        yield put(noticeAction)

    }catch(err){

        goTo503(err)

        const value = {
            modalTitle: 'ERR',
            modalContent: err.response ? err.response.data : '未知错误',
            context: COMMON_MODAL,
            notifyOnly: true
        }

        const appointModalMsgAction = createAppointModalMsgAction(value)

        yield put(appointModalMsgAction)

    }

}

function* ajaxGetRecycleBinPageArticleListData(action) {

    try{

        const res = yield ArticleRequest.RequestDeletedArticleListData(action.value)

        const deliverDataAction = createDeliverArticleListDataToRecycleBinPageAction(res.data)

        yield put(deliverDataAction)

        const value = {
            paginationId: 'recycleBinPage',
            maxPage: res.data ? res.data.maxPage : 1
        }

        const appointMaxPageAction = createAppointMaxPageToPaginationAction(value)

        yield put(appointMaxPageAction)

    }catch(err){
        goTo503(err)

        const noticeAction = createAppointNoticeContent(err.response.data)

        yield put(noticeAction)
    }

}

function* ajaxRecoverArticle(action) {

    try{

        yield ArticleRequest.RequestRecoverArticle(action.value.article_id)

        action.value.postHandler()


        //重置recycleBinPage
        const value = {
            paginationId: 'recycleBinPage',
            currentPage: 0
        }

        yield delay(1000)

        const appointPagaAction = createAppointCurrentPageOfPaginationAction(value)

        yield put(appointPagaAction)

        const noticeAction = createAppointNoticeContent("还原成功")

        yield put(noticeAction)


    }catch(err){

        goTo503(err)

        const noticeAction = createAppointNoticeContent(err.response.data)

        yield put(noticeAction)
    }

}

function* ajaxGetIpListDataOfIpManagePage(action) {
    try{
        const res = yield IpRequest.RequestIpList(action.value)

        const deliverDataAction = createDeliverIpListDataToIpManagePageAction(res.data)

        yield put(deliverDataAction)

        const value = {
            paginationId: 'ipManagePage',
            maxPage: res.data.maxPage
        }

        const appointMaxPageAction = createAppointMaxPageToPaginationAction(value)

        yield put(appointMaxPageAction)

    }catch (err) {

        goTo503(err)

        const noticeAction = createAppointNoticeContent(err.response.data)

        yield put(noticeAction)
    }
}

function* ajaxLiftedIP(action) {
    try{

        yield IpRequest.RequestLiftedIP(action.value.ip)


        //关闭模态框
        const triggerShowModalAction = createTriggerShowModalAction(false);

        yield put(triggerShowModalAction)

        //标记已ban评论
        const markCommentWhichIPBeenLiftedAction = createMarkCommentWhichIPBeenLiftedAction(action.value.comment_id);

        yield put(markCommentWhichIPBeenLiftedAction)


        //重置ipManagePage

        const value = {
            paginationId: 'ipManagePage',
            currentPage: 0
        }

        yield delay(1000)

        const appointPagaAction = createAppointCurrentPageOfPaginationAction(value)

        yield put(appointPagaAction)

    }catch (err) {

        yield goTo503(err)

        yield delay(500);

        //trigger loading状态
        const triggerModalIsLoadingAction = createTriggerModalIsLoadingAction(false)

        yield put(triggerModalIsLoadingAction)

        //提示异常
        const value = {
            modalTitle: 'ERR',
            modalContent: err.response.data,
            notifyOnly: true
        }

        const appointModalMsgAction = createAppointModalMsgAction(value)

        yield put(appointModalMsgAction)

    }
}

function* ajaxBanIP(action) {
    try{

        const res = yield IpRequest.RequestBanIP(action.value.ip)

        console.log(res.data)

        //关闭模态框
        const triggerShowModalAction = createTriggerShowModalAction(false);

        yield put(triggerShowModalAction)

        //标记已ban评论
        const markCommentWhichIPBeenBanAction = createMarkCommentWhichIPBeenBanAction(action.value.comment_id);

        yield put(markCommentWhichIPBeenBanAction)


    }catch (err) {

        yield goTo503(err)

        yield delay(500);

        //trigger loading状态
        const triggerModalIsLoadingAction = createTriggerModalIsLoadingAction(false)

        yield put(triggerModalIsLoadingAction)

        //提示异常
        const value = {
            modalTitle: 'ERR',
            modalContent: err.response.data,
            notifyOnly: true
        }

        const appointModalMsgAction = createAppointModalMsgAction(value)

        yield put(appointModalMsgAction)

    }
}

function* ajaxHomeArticleListDataByKeyword() {
    try{

        const state = yield select()

        const keyword = state.get('searchBar').get('home').get('searchBarValue')
        const startIndex = state.get('home').get('startIndex')
        const pageScale = state.get('home').get('pageScale')

        const value = {
            keyword: keyword,
            startIndex: startIndex,
            pageScale: pageScale
        }

        //console.log(value)

        const res = yield ArticleRequest.RequestArticleListDataBykeyword(value)

        let appointDataAction = createDeliverArticleDataToHomeAction(res.data)

        yield put(appointDataAction)


    }catch (err) {

        yield goTo503(err)

        console.log('ERR IN ACTION: GET_HOME_ARTICLE_LIST_BY_KEYWORD  ERR: ' + err)

        /*通知窗口提示登录失败*/
        const appointNoticeContent = createAppointNoticeContent('登录失败: ' + err)
        yield put(appointNoticeContent)
    }
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

    }catch (err) {

        yield goTo503(err)

        console.log('ERR IN ACTION: LOGIN  ERR: ' + err)

        /*通知窗口提示登录失败*/
        const appointNoticeContent = createAppointNoticeContent('登录失败: ' + err)
        yield put(appointNoticeContent)

        //更新loginPage.reducer的isLoggingIn
        const triggerIsLoggingInAction = createTriggerIsLoggingInAction(false)
        yield put(triggerIsLoggingInAction)
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

        yield goTo503(err)

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

        yield goTo503(err)

        console.log('ERR IN ACTION: GET_CAPTCHA_IMAGE  ERR: ' + err)
    }
}

function* ajaxLogin() {

    const triggerIsLoggingInAction = createTriggerIsLoggingInAction(false)

    const captchaResult = yield checkCaptchaCode('loginPage',false,triggerIsLoggingInAction)

    if(!captchaResult.pass){
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


    }catch (err) {

        yield goTo503(err)

        console.log('ERR IN ACTION: LOGIN  ERR: ' + err)

        /*通知窗口提示登录失败*/
        const appointNoticeContent = createAppointNoticeContent('登录失败: ' + err.response.data)
        yield put(appointNoticeContent)

        const triggerIsLoggingInAction = createTriggerIsLoggingInAction(false)
        yield put(triggerIsLoggingInAction)
    }

}

function* ajaxDeleteSubCommentFromArticlePage(action) {
    yield checkToken()

    try{
        yield CommentRequest.RequestDeleteComment(action.value.comment_id)

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

        yield goTo503(err)

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

        yield goTo503(err)

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

        yield goTo503(err)

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
        yield goTo503(err)
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


        const value = {
            paginationId: 'managePage',
            currentPage: 0
        }

        yield delay(1000)

        const appointPagaAction = createAppointCurrentPageOfPaginationAction(value)

        yield put(appointPagaAction)

    }catch (err) {

        yield goTo503(err)

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
        yield ArticleRequest.RequestDeleteArticle(action.value.article_id)

        action.value.postHandler()

        //关闭modal
        const triggerShowModalAction = createTriggerShowModalAction(false)
        yield put(triggerShowModalAction)

        //关闭多选状态
        const triggerIsMultipleSelectingAction = createTiggerIsMultipleSelectingInManagePageAction(false)
        yield put(triggerIsMultipleSelectingAction)

        const value = {
            paginationId: 'managePage',
            currentPage: 0
        }

        yield delay(1000)

        const appointPagaAction = createAppointCurrentPageOfPaginationAction(value)

        yield put(appointPagaAction)

    }catch (err) {

        yield goTo503(err)

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

        yield goTo503(err)

        console.log('ERR IN ACTION: GET_MANAGE_PAGE_ARTICLE_LIST  ERR: ' + err)
    }
}

function* ajaxManagePageArticleListDataByFiling(action) {
    try{
        const res = yield ArticleRequest.RequestArticleListDataByFiling(action.value)
        let appointDataAction = createDeliverArticleListDataToManagePageAction(res.data)
        yield put(appointDataAction)
    }catch (err) {

        yield goTo503(err)

        console.log('ERR IN ACTION: GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_FILING  ERR: ' + err)
    }
}

function* ajaxManagePageArticleListDataBykeyword(action) {
    try{
        const res = yield ArticleRequest.RequestArticleListDataBykeyword(action.value)
        let appointDataAction = createDeliverArticleListDataToManagePageAction(res.data)
        yield put(appointDataAction)
    }catch (err) {

        yield goTo503(err)

        console.log('ERR IN ACTION: GET_MANAGE_PAGE_ARTICLE_LIST_DATA_BY_KEYWORD  ERR: ' + err)
    }
}

function* ajaxManagePageArticleLabelData() {
    try{

        const res = yield ArticleRequest.RequestArticleLabelData()
        let appointDataAction = createDeliverArticleLabelDataToManagePageAction(res.data)
        yield put(appointDataAction)

    }catch (err) {

        yield goTo503(err)

        console.log('ERR IN ACTION: GET_MANAGE_PAGE_ARTICLE_LABEL_DATA  ERR: ' + err)
    }
}

function* ajaxManagePageArticleFilingData() {
    try{

        const res = yield ArticleRequest.RequestArticleFilingData()
        let appointDataAction = createDeliverArticleFilingDataToManagePageAction(res.data)
        yield put(appointDataAction)

    }catch (err) {

        yield goTo503(err)

        console.log('ERR IN ACTION: GET_MANAGE_PAGE_ARTICLE_FILING_DATA  ERR: ' + err)
    }
}

function* ajaxManagePageArticleListData(action) {
    try{
        const res = yield ArticleRequest.RequestArticleListData(action.value)

        let appointDataAction = createDeliverArticleListDataToManagePageAction(res.data)
        yield put(appointDataAction)
    }catch (err) {

        yield goTo503(err)

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

        yield goTo503(err)

        console.log('ERR IN ACTION: UPLOAD_IMAGE  ERR: ' + err)

        /*通知窗口提示异常*/
        const appointNoticeContent = createAppointNoticeContent('ERR IN ACTION: UPLOAD_IMAGE  ERR: ' + err)
        yield put(appointNoticeContent)
    }
}

function* ajaxSaveArticle(action) {

    yield checkToken()

    try{
        const res = yield ArticleRequest.SaveArticle(action.value)

        const triggerIsSavingDraftAction = createTriggerIsSavingDraftAction(false)
        yield put(triggerIsSavingDraftAction)
        const triggerIsSavingArticleAction = createTriggerIsSavingArticleAction(false)
        yield put(triggerIsSavingArticleAction)

        const recordEditingArticleIdAction = createRecordEditingArticleIdAction(res.data)
        yield put(recordEditingArticleIdAction)


        if(action.value.article_type === 'article'){

            //重置页面
            const resetArticleEditPageAction = createResetArticleEditPageAction()
            yield put(resetArticleEditPageAction)
            /*通知窗口提示提交成功*/
            const appointNoticeContent = createAppointNoticeContent('文章发布成功！即将跳转')
            yield put(appointNoticeContent)
            setTimeout(() => {
                action.value.goTo('/home/article/' + res.data)
            },2000)
        }
    }catch (err) {

        yield goTo503(err)

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

        yield goTo503(err)

        console.log('ERR IN ACTION: GET_DRAFT_DATA  ERR: ' + err)

    }
}

//check提交评论时是否需要输入验证码
function* ajaxCheckWetherNeedCaptchaForSubmitComment(action){

    try{
        const res = yield CommentRequest.CheckWetherNeedCaptcha()
        if(res.data === false){
            yield ajaxSubmitComment(action)
            return
        }

        const appointModalMsgValue = {
            modalTitle: '频繁发言，请输入验证码',
            modalContent: ' ',
            context: CAPTCHA_MODAL
        }

        const appointModalMsg = createAppointModalMsgAction(appointModalMsgValue)
        yield put(appointModalMsg)

        const triggerShowModalAction = createTriggerShowModalAction(true)
        yield put(triggerShowModalAction)

    }catch(err){

        yield goTo503(err)

        const appointModalMsgValue = {
            modalTitle: 'ERR',
            modalContent: err.response.data,
            context: COMMON_MODAL,
            notifyOnly: true
        }

        const appointModalMsg = createAppointModalMsgAction(appointModalMsgValue)
        yield put(appointModalMsg)

        const triggerShowModalAction = createTriggerShowModalAction(true)
        yield put(triggerShowModalAction)
    }
}

function* ajaxSubmitCommentWithCaptcha(action) {

    const triggerModalIsLoadingAction = createTriggerModalIsLoadingAction(false)

    const captchaResult = yield checkCaptchaCode('modal',false,triggerModalIsLoadingAction)

    if(!captchaResult.pass){
        return
    }

    try{


        const editorId = action.value

        const state = yield select()

        const article_id = state.get('articlePage').get('article').get('article_id')

        const referCommentId = state.get('commentEditor').get('showSubCommentEditorManager').get('hostTopLevelCommentId')
        const visitorName = state.get('commentEditor').get(editorId).get('visitorName').get('value')
        const commentContent = state.get('commentEditor').get(editorId).get('commentContent').get('value')
        const visitorEmail = state.get('commentEditor').get(editorId).get('visitorEmail').get('value')
        const visitorSiteAddress = state.get('commentEditor').get(editorId).get('visitorSiteAddress').get('value')

        const captchaId = state.get('captcha').get('modal').get('captchaId')

        const captchaCode = state.get('captcha').get('modal').get('captchaCode')

        const value = {
            article_id:article_id,
            referCommentId:referCommentId,
            visitorName:visitorName,
            commentContent:commentContent,
            visitorEmail:visitorEmail,
            visitorSiteAddress:visitorSiteAddress,
            captchaId: captchaId,
            captchaCode: captchaCode
        }

        const res = yield CommentRequest.SubmitCommentData(value)

        if(res.status === 200){

            /*结束submit按钮加载状态*/
            const triggerCommentEditorLoadingActionValue = {
                isLoading: false,
                editorId: action.value
            }
            const triggerCommentEditorLoadingAction = createTriggerCommentEditorLoadingAction(triggerCommentEditorLoadingActionValue)
            yield put(triggerCommentEditorLoadingAction)

            /*通知窗口提示提交成功*/
            const appointNoticeContent = createAppointNoticeContent('评论提交成功！')
            yield put(appointNoticeContent)


            /*重置文本编辑框正文value*/
            const appointInputValue = {
                editorId: action.value,
                input: COMMENT_CONTENT,
                inputValue: ''
            }
            const appointInputValueAction = createAppointInputValueAction(appointInputValue)
            yield put(appointInputValueAction)

            /*挂载刚刚提交的留言*/
            const appendCommentJustSubmitValue = {
                commentId: res.data.commentIdJustSubmit,
                comment_platform: window.navigator.platform,
                ...value
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

            const triggerShowModalAction = createTriggerShowModalAction(false)
            yield put(triggerShowModalAction)
        }
    }catch (err) {

        yield goTo503(err)

        const appointNoticeContent = createAppointNoticeContent('评论提交失败: ' + err.response.data.msg)
        yield put(appointNoticeContent)

        /*结束submit按钮加载状态*/
        const triggerCommentEditorLoadingActionValue = {
            isLoading: false,
            editorId: action.value
        }
        const triggerCommentEditorLoadingAction = createTriggerCommentEditorLoadingAction(triggerCommentEditorLoadingActionValue)
        yield put(triggerCommentEditorLoadingAction)
    }

}


function* ajaxSubmitComment(action) {
    try{

        const editorId = action.value.editorId

        const state = yield select();

        const article_id = state.get('articlePage').get('article').get('article_id')

        const referCommentId = editorId === 'subCommentEditor' ? state.get('commentEditor').get('showSubCommentEditorManager').get('hostTopLevelCommentId') : undefined

        const visitorName = state.get('commentEditor').get(editorId).get('visitorName').get('value')

        const commentContent = state.get('commentEditor').get(editorId).get('commentContent').get('value')

        const visitorEmail = state.get('commentEditor').get(editorId).get('visitorEmail').get('value')

        const visitorSiteAddress = state.get('commentEditor').get(editorId).get('visitorSiteAddress').get('value')



        const value = {
            article_id:article_id,
            referCommentId:referCommentId,
            visitorName:visitorName,
            commentContent:commentContent,
            visitorEmail:visitorEmail,
            visitorSiteAddress:visitorSiteAddress
        }

        const res = yield CommentRequest.SubmitCommentData(value)
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
                comment_platform: window.navigator.platform,
                ...value
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

        yield goTo503(err)

        const appointModalMsgValue = {
            modalTitle: 'ERR',
            modalContent: err.response.data,
            context: COMMON_MODAL,
            notifyOnly: true
        }

        const appointModalMsg = createAppointModalMsgAction(appointModalMsgValue)
        yield put(appointModalMsg)

        const triggerShowModalAction = createTriggerShowModalAction(true)
        yield put(triggerShowModalAction)

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

        yield goTo503(err)

        console.log('ERR IN ACTION: SUBMIT_COMMENT  ERR: ' + err)
    }
}

function* ajaxCountOfComment(action) {
    try{
        const res = yield CommentRequest.RequestCountOfComment(action.value)
        let appointDataAction = createDeliverCountOfCommentDataToHomeAction(action.value, res.data)
        yield put(appointDataAction)
    }catch (err) {
        yield goTo503(err)

        console.log('ERR IN ACTION: GET_COUNT_OF_COMMENT  ERR: ' + err)
    }

}

function* ajaxCommentListData(action) {
    try{

        const state = yield select();

        const article_id = state.get('articlePage').get('article').get('article_id')
        const startIndex = state.get('articlePage').get('startIndex')
        const pageScale = state.get('articlePage').get('pageScale')

        const value = {
            article_id: action.value ? action.value.article_id : article_id,
            startIndex: startIndex,
            pageScale: pageScale
        }

        const res = yield CommentRequest.RequestTopLevelCommentListData(value)
        let appointDataAction = createDeliverCommentListDataToArticlePageAction(res.data)
        yield put(appointDataAction)
    }catch (err) {

        yield goTo503(err)
        console.log('ERR IN ACTION: GET_COMMENT_LIST_DATA  ERR: ' + err)
    }
}

function* ajaxHomeArticleListData() {
    try{

        const state = yield select()

        const startIndex = state.get('home').get('startIndex')

        const pageScale = state.get('home').get('pageScale')

        const value = {
            startIndex: startIndex,
            pageScale: pageScale
        }

        const res = yield ArticleRequest.RequestArticleListData(value)
        let appointDataAction = createDeliverArticleDataToHomeAction(res.data)
        yield put(appointDataAction)

    }catch (err) {
        yield goTo503(err)
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
        yield goTo503(err)
        console.log('ERR IN ACTION: GET_JUMBOTRON_ARTICLE_DATA  ERR: ' + err)
    }
}

function* recordScrollTopOfElementEl(action) {
    let nextAction = createRecordScrollTopOfElementElAction(action.value)
    yield put(nextAction)
}

function* ajaxArticleDataForArticlePageData(action) {

    //如果之前对文章的请求还未完成，中止它
   if(window.currentArticleGetting && window.currentArticleGetting !== action.value.article_id){
       window.axiosSource.cancel('Cancel')
   }
    try{
        const res = yield ArticleRequest.RequestArticleData(action.value.article_id)

        let appointDataAction = createDeliverArticleDataToArticlePage(res.data)
        yield put(appointDataAction)
        window.currentArticleGetting = undefined
        window.axiosSource = undefined

    }catch (err) {

        yield goTo503(err)

        console.log('ERR IN ACTION: GET_ARTICLE_PAGE_DATA  ERR: ' + err)

        if(err.message === 'Cancel'){
            return
        }

        if(err.response.status === 400) {
            yield notFound()
        }
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

function* checkCaptchaCode(captchaHost,showNotice,errCatchAction) {
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

            return {pass:false}
        }

        const value = {
            captchaId: captchaId,
            uncheckCaptchaCode: uncheckCaptchaCode
        }

        const res = yield CaptchaRequest.RequestCheck(value)

        return res.data
    }catch (err) {

        yield put(errCatchAction)

        const value = {
            captchaHost: captchaHost,
            warnMsg: err.response.data
        }
        const appointCaptchaWarnMsgaction = createAppointCaptchaWarnMsgAction(value)
        yield put(appointCaptchaWarnMsgaction)

        const triggerShowModalWarnValue = {
            captchaHost: captchaHost,
            showWarn: true
        }

        const triggerShowModalWarnAction = createTriggerShowCaptchaInputWarnAction(triggerShowModalWarnValue)
        yield put(triggerShowModalWarnAction)


        /*通知窗口提示提交验证码验证失败*/
        if(showNotice){
            const appointNoticeContent = createAppointNoticeContent(err.response.data)
            yield put(appointNoticeContent)
        }
        return {pass:false}
    }
}

function* notFound() {
    const state = yield select()
    const goTo = state.get('router').get('goTo')
    goTo('/404')
}

const delay = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms);
})

function* goTo503(err){
    const state = yield select()

    if(err.response.status === 503){
        state.get('router').get('goTo')('/503')
    }
}