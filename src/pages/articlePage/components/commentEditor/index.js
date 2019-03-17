import { connect } from 'react-redux'
import {createTriggerShowEmojiPickerAction,
        createAppointInputValueAction,
        createAppointInputWarnAction,
        createTriggerHasOnceTryToSubmitAction,
        createSubmitCommentAction,
        createTriggerCommentEditorLoadingAction } from './store'
import { CountLength,setCookie,deleteCookie } from "../../../../exJs";
import {
    COMMENT_CONTENT,
    VISITOR_NAME,
    VISITOR_EMAIL,
    VISITOR_SITE_ADDRESS,
    EMPTYSTRING,
    EMAIL_REGULAR,
    SITE_ADDRESS_REGULAR, TOP_LEVEL_COMMENT_EDITOR, SUB_COMMENT_EDITOR
} from './constant'
import {TopLevelCommentEditorUI} from "./topLevelCommentEditorUI";
import {SubCommentEditorUI} from "./subCommentEditorUI";

const mapState = (editorManagerId) => (state) => {
    return {
        isMobile: state.get('rootState').get('isMobile'),
        showEmojiPicker: state.get('commentEditor').get(editorManagerId).get('showEmojiPicker'),
        commentContentManager: state.get('commentEditor').get(editorManagerId).get('commentContent'),
        visitorNameManager: state.get('commentEditor').get(editorManagerId).get('visitorName'),
        visitorEmailManager: state.get('commentEditor').get(editorManagerId).get('visitorEmail'),
        visitorSiteAddressManager: state.get('commentEditor').get(editorManagerId).get('visitorSiteAddress'),
        hasOnceTryToSubmit: state.get('commentEditor').get(editorManagerId).get('hasOnceTryToSubmit'),
        isLoading: state.get('commentEditor').get(editorManagerId).get('isLoading'),
        widthOfBrowser: state.get('rootState').get('widthOfBrowser')
    }
}


const mapActions = (dispatch) => ({
        writeVisitorInfoSilently(_this,editorId){
            let cookieMap = readCookie()
            cookieMap.visitorName && _this.props.appointInputValue(cookieMap.visitorName,VISITOR_NAME,editorId)
            cookieMap.visitorEmail &&  _this.props.appointInputValue(cookieMap.visitorEmail,VISITOR_EMAIL,editorId)
            cookieMap.visitorSiteAddress && _this.props.appointInputValue(cookieMap.visitorSiteAddress,VISITOR_SITE_ADDRESS,editorId)
        },
        triggerShowEmojiPicker(editorId) {
            const triggerShowEmojiPickerAction = createTriggerShowEmojiPickerAction(editorId)
            dispatch(triggerShowEmojiPickerAction)
        },
        appointInputValue(event,input,editorId) {
            const value = {
                editorId: editorId,
                input: input,
                inputValue: event.target ? event.target.value : event
            }
            const appointInputValueAction = createAppointInputValueAction(value)
            dispatch(appointInputValueAction)
        },
        focusHandler(inputId,editorId) {
            const value = {
                input: inputId,
                showWarn: false,
                editorId: editorId
            }
            const appointInputWarnAction = createAppointInputWarnAction(value)
            dispatch(appointInputWarnAction)
        },
        blurHandler(event, inputId, _this, editorId) {
            if((!_this.props.hasOnceTryToSubmit) || event.target.value === EMPTYSTRING){
                return
            }
            const stringToCheck = event.target.value
            switch (inputId) {
                case VISITOR_NAME:
                    checkVisitorName(stringToCheck, dispatch, editorId)
                    break
                case COMMENT_CONTENT:
                    checkCommentContent(stringToCheck, dispatch, editorId)
                    break
                case VISITOR_EMAIL:
                    checkVisitorEmail(stringToCheck, dispatch, editorId)
                    break
                case VISITOR_SITE_ADDRESS:
                    stringToCheck.trim() !== '' && checkVisitorSiteAddress(stringToCheck, dispatch, editorId)
                    break
                default:
                    return
            }
        },
        submitComment(article_id,
                      referCommentId,
                      visitorName,
                      commentContent,
                      visitorEmail,
                      visitorSiteAddress,
                      editorId){

            const triggerHasOnceTryToSubmitAction = createTriggerHasOnceTryToSubmitAction(editorId)
            dispatch(triggerHasOnceTryToSubmitAction)

            const commentContentPass = checkCommentContent(commentContent,
                                                            dispatch,
                                                            editorId)
            const visitorNamePass = checkVisitorName(visitorName,
                                                    dispatch,
                                                    editorId)
            const visitorEmailPass = checkVisitorEmail(visitorEmail,
                                                        dispatch,
                                                        editorId)
            const visitorSiteAddressPass = checkVisitorSiteAddress(visitorSiteAddress,
                                                                    dispatch,
                                                                    editorId)

            if(!(commentContentPass
                &&
                visitorNamePass
                &&
                visitorEmailPass
                &&
                visitorSiteAddressPass)){
                return
            }

            rememberMe( visitorName,
                        visitorEmail,
                        visitorSiteAddress)

            const value = {
                editorId: editorId,
                article_id:article_id,
                referCommentId:referCommentId,
                visitorName:visitorName,
                commentContent:commentContent,
                visitorEmail:visitorEmail,
                visitorSiteAddress:visitorSiteAddress
            }

            const submitCommentAction = createSubmitCommentAction(value)
            dispatch(submitCommentAction)

            const triggerCommentEditorLoadingActionValue = {
                editorId: editorId,
                loading: true
            }
            const triggerCommentEditorLoadingAction = createTriggerCommentEditorLoadingAction(triggerCommentEditorLoadingActionValue)
            dispatch(triggerCommentEditorLoadingAction)
        }
})

const TopLevelCommentEditor = connect(mapState(TOP_LEVEL_COMMENT_EDITOR), mapActions)(TopLevelCommentEditorUI)
const SubCommentEditor = connect(mapState(SUB_COMMENT_EDITOR), mapActions, null, {forwardRef: true})(SubCommentEditorUI)


export {TopLevelCommentEditor, SubCommentEditor}

const readCookie = () => {
    let arrStr = document.cookie.split("; ");
    let cookieMap = {}
    for(let i = 0; i < arrStr.length; i++) {
        let coupleStr = arrStr[i].split("=");
        cookieMap[coupleStr[0]] = coupleStr[1]
    }
    return cookieMap
}

const rememberMe = (visitorName,
                    visitorEmail,
                    visitorSiteAddress) => {
    deleteCookie(VISITOR_NAME)
    deleteCookie(VISITOR_EMAIL)
    deleteCookie(VISITOR_SITE_ADDRESS)
    setCookie(VISITOR_NAME,visitorName,30)
    setCookie(VISITOR_EMAIL,visitorEmail,30)
    setCookie(VISITOR_SITE_ADDRESS,visitorSiteAddress,30)
}

const checkCommentContent = (commentContent, dispatch, editorId) => {
    if(commentContent.trim() === EMPTYSTRING){
        const value = {
            editorId: editorId,
            input: COMMENT_CONTENT,
            showWarn: true,
            warnMsg: '您还未填写任何留言内容'
        }
        const appointInputWarnAction = createAppointInputWarnAction(value)
        dispatch(appointInputWarnAction)
        return false
    }
    return true
}

const checkVisitorName = (visitorName, dispatch, editorId) => {
    if(visitorName.trim() === EMPTYSTRING){
        const value = {
            editorId: editorId,
            input: VISITOR_NAME,
            showWarn: true,
            warnMsg: '昵称不能为空'
        }
        const appointInputWarnAction = createAppointInputWarnAction(value)
        dispatch(appointInputWarnAction)
        return false
    }
    if(CountLength(visitorName) > 14){
        const value = {
            editorId: editorId,
            input: VISITOR_NAME,
            showWarn: true,
            warnMsg: '昵称太长'
        }
        const appointInputWarnAction = createAppointInputWarnAction(value)
        dispatch(appointInputWarnAction)
        return false
    }
    return true
}

const checkVisitorEmail = (visitorEmail, dispatch, editorId) => {
    if(visitorEmail.trim() === EMPTYSTRING){
        const value = {
            editorId:editorId,
            input: VISITOR_EMAIL,
            showWarn: true,
            warnMsg: '请填写您的邮箱地址'
        }
        const appointInputWarnAction = createAppointInputWarnAction(value)
        dispatch(appointInputWarnAction)
        return false
    }
    if(visitorEmail.match(EMAIL_REGULAR) == null){
        const value = {
            editorId:editorId,
            input: VISITOR_EMAIL,
            showWarn: true,
            warnMsg: '非法的邮件地址'
        }
        const appointInputWarnAction = createAppointInputWarnAction(value)
        dispatch(appointInputWarnAction)
        return false
    }
    return true
}

const checkVisitorSiteAddress = (visitorSiteAddress, dispatch, editorId) => {
    if(visitorSiteAddress.trim() === EMPTYSTRING){
        return true
    }
    if(visitorSiteAddress.match(SITE_ADDRESS_REGULAR) == null){
        const value = {
            editorId: editorId,
            input: VISITOR_SITE_ADDRESS,
            showWarn: true,
            warnMsg: '请填写正确格式的网址'
        }
        const appointInputWarnAction = createAppointInputWarnAction(value)
        dispatch(appointInputWarnAction)
        return false
    }
    return true
}