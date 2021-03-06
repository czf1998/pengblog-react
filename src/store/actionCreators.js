import {DELIVER_ARTICLE_LIST_DATA_TO_HOME,
        DELIVER_ARTICLE_DATA_TO_JUMBOTRON,
        RECORD_SCROLL_TOP_OF_ELEMENT_EL,
        OBSERVE_SCROLL_TOP_OF_ELEMENT_EL,
        DELIVER_ARTICLE_DATA_TO_ARTICLE_PAGE,
        NOTICE_HOME_STORE_ARTICLE_LIST_DATA_READY,
        NOTICE_HOME_STORE_JUMBOTRON_DATA_READY,
        DELIVER_COMMENT_LIST_DATA_TO_ARTICLE_PAGE,
        DELIVER_COUNT_OF_COMMENT_DATA_TO_HOME,
        PUSH_PROGRASS_TO_END,
        DELIVER_SUB_COMMENT_LIST_DATA,
        APPOINT_NOTICE_CONTENT,
        APPEND_COMMENT_JUST_SUBMIT,
        DELIVER_DRAFT_DATA,
        DELIVER_TITLE_IMAGE_URL,
        RECORD_CURRENT_BROWSER_EDITION,
        DELIVER_ARTICLE_LIST_DATA_TO_MANAGE_PAGE,
        DELIVER_ARTICLE_FILING_DATA_TO_MANAGE_PAGE,
        DELIVER_ARTICLE_LABEL_DATA_TO_MANAGE_PAGE,
        RECORD_ARTICLE_HAS_BEEN_DELETE,
        RECORD_ARTICLE_LIST_HAS_BEEN_DELETE,
        RESET_MANAGE_PAGE_ARTICLE_LIST,
        TRIGGER_ALREADY_LOGGED_IN,
        APPOINT_FRESH_COMMENTS_DATA,
        RECORD_COMMENT_HAS_BEEN_DELETED,
        RECORD_SUB_COMMENT_HAS_BEEN_DELETED,
        DELIVER_CAPTCHA_IMAGE_BASE64,
        TRIGGER_SHOW_CAPTCHA_INPUT_WARN,
        MARK_COMMENT_WHICH_IP_BEEN_BAN_SAGA_ARTICLEPAGE_and_FRESHCOMMENTS,
        TRIGGER_IS_GETTING_SMS,
        APPOINT_CAPTCHA_WARN_MSG,
        DELIVER_IP_LIST_DATA_SAGA_IPMANAGEPAGE,
        APPOINT_MAX_PAGE_SAGA_PAGINATION,
        MARK_COMMENT_WHICH_IP_BEEN_LIFTED_SAGA_ARTICLEPAGE_and_FRESHCOMMENTS,
        RESET_ARTICLE_EDIT_PAGE_saga_articleEditPage,
        RECORD_EDITING_ARTICLE_ID_saga_articleEditPage,
        RESET_HOME_PAGE_DATA_saga_home,
        DELIVER_ARTICLE_LIST_DATA_saga_recycleBinPage} from './actionTypesWithSaga'

export const createDeliverArticleDataToHomeAction = (value) => ({
    type: DELIVER_ARTICLE_LIST_DATA_TO_HOME,
    value
})

export const createRecordScrollTopOfElementElAction = (value) => ({
    type: RECORD_SCROLL_TOP_OF_ELEMENT_EL,
    value
})

export const createObserveScrollTopOfElementElAction = () => {
    let scrollTopOfDocumentEl = document.body.scrollTop === 0 ? document.documentElement.scrollTop : document.body.scrollTop
    const action = {
        type: OBSERVE_SCROLL_TOP_OF_ELEMENT_EL,
        scrollTopOfDocumentEl
    }
    return action
}

export const createDeliverArticleDataToJumbotronAction = (value) => ({
    type: DELIVER_ARTICLE_DATA_TO_JUMBOTRON,
    value
})

export const createDeliverArticleDataToArticlePage = (value) => ({
    type: DELIVER_ARTICLE_DATA_TO_ARTICLE_PAGE,
    value
})

export const createNoticeHomeStoreArticleListDataReadyAction = () => ({
    type: NOTICE_HOME_STORE_ARTICLE_LIST_DATA_READY
})

export const createNoticeHomeStoreJumbotronDataReadyAction = () => ({
    type: NOTICE_HOME_STORE_JUMBOTRON_DATA_READY
})

export const createDeliverCommentListDataToArticlePageAction = (value) => ({
    type: DELIVER_COMMENT_LIST_DATA_TO_ARTICLE_PAGE,
    value
})

export const createDeliverCountOfCommentDataToHomeAction = (article_id, countOfAllComment) => ({
    type: DELIVER_COUNT_OF_COMMENT_DATA_TO_HOME,
    value: {
        article_id: article_id,
        countOfAllComment: countOfAllComment
    }
})

export const createPushPrograssToEndAction = (value) => ({
    type: PUSH_PROGRASS_TO_END,
    value
})

export const createDeliverSubCommentListDataAction = (value) => ({
    type: DELIVER_SUB_COMMENT_LIST_DATA,
    value
})

export const createAppointNoticeContent = (value) => ({
    type: APPOINT_NOTICE_CONTENT,
    value
})

export const createAppendCommentJustSubmitAction = (value) => ({
    type: APPEND_COMMENT_JUST_SUBMIT,
    value
})

export const createDeliverDraftDataAction = (value) => ({
    type: DELIVER_DRAFT_DATA,
    value
})

export const createDeliverTitleImageUrlAction = (value) => ({
    type: DELIVER_TITLE_IMAGE_URL,
    value
})

export const createRecordCurrentBrowserEdition = () => ({
    type: RECORD_CURRENT_BROWSER_EDITION
})

export const createDeliverArticleListDataToManagePageAction = (value) => ({
    type: DELIVER_ARTICLE_LIST_DATA_TO_MANAGE_PAGE,
    value
})

export const createDeliverArticleFilingDataToManagePageAction = (value) => ({
    type: DELIVER_ARTICLE_FILING_DATA_TO_MANAGE_PAGE,
    value
})

export const createDeliverArticleLabelDataToManagePageAction = (value) => ({
    type: DELIVER_ARTICLE_LABEL_DATA_TO_MANAGE_PAGE,
    value
})

export const createRecordArticleHasBeenDeletedAction = (value) => ({
    type: RECORD_ARTICLE_HAS_BEEN_DELETE,
    value
})

export const createRecordArticleListHasBeenDeletedAction = (value) => ({
    type: RECORD_ARTICLE_LIST_HAS_BEEN_DELETE,
    value
})

export const createResetManagePageArticleListAction = () => ({
    type: RESET_MANAGE_PAGE_ARTICLE_LIST
})

export const createTriggerAlreadyLoggedInAction = (value) => ({
    type: TRIGGER_ALREADY_LOGGED_IN,
    value
})

export const createAppointFreshCommentsDataAction = (value) => ({
    type: APPOINT_FRESH_COMMENTS_DATA,
    value
})

export const createRecordCommentHasBeenDeletedAction = (value) => ({
    type: RECORD_COMMENT_HAS_BEEN_DELETED,
    value
})

export const createRecordSubCommentHasBeenDeletedAction = (value) => ({
    type: RECORD_SUB_COMMENT_HAS_BEEN_DELETED,
    value
})

export const createDeliverCaptchaImageBase64Action = (value) => ({
    type: DELIVER_CAPTCHA_IMAGE_BASE64,
    value
})

export const createTriggerShowCaptchaInputWarnAction = (value) => ({
    type: TRIGGER_SHOW_CAPTCHA_INPUT_WARN,
    value
})

export const createTriggerIsGettingSmsAction = (value) => ({
    type: TRIGGER_IS_GETTING_SMS,
    value
})

export const createAppointCaptchaWarnMsgAction = (value) => ({
    type: APPOINT_CAPTCHA_WARN_MSG,
    value
})

export const createMarkCommentWhichIPBeenBanAction = (value) => ({
    type: MARK_COMMENT_WHICH_IP_BEEN_BAN_SAGA_ARTICLEPAGE_and_FRESHCOMMENTS,
    value
})

export const createMarkCommentWhichIPBeenLiftedAction = (value) => ({
    type: MARK_COMMENT_WHICH_IP_BEEN_LIFTED_SAGA_ARTICLEPAGE_and_FRESHCOMMENTS,
    value
})

export const createDeliverIpListDataToIpManagePageAction = (value) => ({
    type: DELIVER_IP_LIST_DATA_SAGA_IPMANAGEPAGE,
    value
})

export const createAppointMaxPageToPaginationAction = (value) => ({
    type: APPOINT_MAX_PAGE_SAGA_PAGINATION,
    value
})

export const createDeliverArticleListDataToRecycleBinPageAction = (value) => ({
    type: DELIVER_ARTICLE_LIST_DATA_saga_recycleBinPage,
    value
})

export const createResetArticleEditPageAction = () => ({
    type: RESET_ARTICLE_EDIT_PAGE_saga_articleEditPage
})

export const createRecordEditingArticleIdAction = (value) => ({
    type: RECORD_EDITING_ARTICLE_ID_saga_articleEditPage,
    value
})

export const createResetHomePageDataAction = () => ({
    type: RESET_HOME_PAGE_DATA_saga_home
})