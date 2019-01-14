import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {createTriggerShowEmojiPickerAction,
        createAppointInputValueAction,
        createAppointInputWarnAction,
        createTriggerHasOnceTryToSubmitActionn } from './store'
import { CommentEditorWrapper,
         Title,
         Name,
         Content,
         VisitorInfo,
         EmojiButton,
         EmojiPickerWrapper,
         SubmitButtonWrapper,
         SubmitButton } from './style'
import { CommonClassNameConstants } from '../../../../commonStyle'
import { GapLine, Input, Textarea } from '../../../../common'
import { EmojiPicker } from './components'
import { CountLength } from "../../../../exJs";

import {COMMENT_CONTENT,
        VISITOR_NAME,
        VISITOR_EMAIL,
        VISITOR_SITE_ADDRESS,
        EMPTYSTRING,
        EMAIL_REGULAR,
        SITE_ADDRESS_REGULAR} from './constant'


class CommentEditor extends PureComponent {

    render() {

        const { isMobile,
                triggerShowEmojiPicker,
                showEmojiPicker,
                commentContentManager,
                visitorNameManager,
                visitorEmailManager,
                visitorSiteAddressManager,
                appointInputValue,
                submitComment,
                focusHandler,
                blurHandler } = this.props


        return (
            <CommentEditorWrapper>

                <GapLine/>

                <Title  className={CommonClassNameConstants.COMMON_PADDING}>
                    <i className={CommonClassNameConstants.FONT_DARK + 'fa fa-edit'}/>&nbsp;说点什么
                </Title>

                <Name className={CommonClassNameConstants.COMMON_PADDING_HORIZONTAL}>
                    <Input  placeholder="设定好昵称"
                            type="text"
                            value={visitorNameManager.get('value')}
                            onChange={(event) => {appointInputValue(event,VISITOR_NAME)}}
                            showWarn={visitorNameManager.get('showWarn')}
                            warnMsg={visitorNameManager.get('warnMsg')}
                            onFocus={() => {focusHandler(VISITOR_NAME)}}
                            onBlur={(event) => {blurHandler(event, VISITOR_NAME, this)}}
                            iconClassName="fa fa-user-o"/>
                </Name>

                <Content className={CommonClassNameConstants.COMMON_PADDING_HORIZONTAL +
                                    CommonClassNameConstants.COMMON_MARGIN_BOTTOM}>

                    <Textarea rows={5}
                              placeholder="开始编辑您的留言"
                              value={commentContentManager.get('value')}
                              onChange={(event) => {appointInputValue(event,COMMENT_CONTENT)}}
                              showWarn={commentContentManager.get('showWarn')}
                              warnMsg={commentContentManager.get('warnMsg')}
                              onFocus={() => {focusHandler(COMMENT_CONTENT)}}
                              onBlur={(event) => {blurHandler(event, COMMENT_CONTENT, this)}}/>

                    {
                        !isMobile &&
                        <EmojiButton className={CommonClassNameConstants.CURSORP}>
                            <span onClick={triggerShowEmojiPicker} role="img" aria-label="emoji">🙂</span>
                        </EmojiButton>
                    }

                    {
                        showEmojiPicker &&
                        <EmojiPickerWrapper>
                            <EmojiPicker/>
                        </EmojiPickerWrapper>
                    }

                </Content>

                <VisitorInfo className={CommonClassNameConstants.COMMON_PADDING_HORIZONTAL}>

                    <Input  placeholder="您的邮箱"
                            type="text"
                            value={visitorEmailManager.get('value')}
                            onChange={(event) => {appointInputValue(event,VISITOR_EMAIL)}}
                            showWarn={visitorEmailManager.get('showWarn')}
                            warnMsg={visitorEmailManager.get('warnMsg')}
                            iconClassName="fa fa-envelope"
                            onFocus={() => {focusHandler(VISITOR_EMAIL)}}
                            onBlur={(event) => {blurHandler(event, VISITOR_EMAIL, this)}}/>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <Input  placeholder="你的个人网站？如果有"
                            type="text"
                            value={visitorSiteAddressManager.get('value')}
                            onChange={(event) => {appointInputValue(event,VISITOR_SITE_ADDRESS)}}
                            showWarn={visitorSiteAddressManager.get('showWarn')}
                            warnMsg={visitorSiteAddressManager.get('warnMsg')}
                            iconClassName="fa fa-compass"
                            onFocus={() => {focusHandler(VISITOR_SITE_ADDRESS)}}
                            onBlur={(event) => {blurHandler(event, VISITOR_SITE_ADDRESS, this)}}/>

                </VisitorInfo>

                <SubmitButtonWrapper>

                    <div onClick={() => {submitComment( visitorNameManager.get('value'),
                                                        commentContentManager.get('value'),
                                                        visitorEmailManager.get('value'),
                                                        visitorSiteAddressManager.get('value'))}}>
                        <SubmitButton>
                            <i className="fa fa-paper-plane"/>&nbsp;Submit&nbsp;
                        </SubmitButton>
                    </div>

                </SubmitButtonWrapper>
            </CommentEditorWrapper>
        );
    }

}



const mapState = (state) => ({
        isMobile: state.get('rootState').get('isMobile'),
        showEmojiPicker: state.get('commentEditor').get('showEmojiPicker'),
        commentContentManager: state.get('commentEditor').get('commentContentManager'),
        visitorNameManager: state.get('commentEditor').get('visitorNameManager'),
        visitorEmailManager: state.get('commentEditor').get('visitorEmailManager'),
        visitorSiteAddressManager: state.get('commentEditor').get('visitorSiteAddressManager'),
        hasOnceTryToSubmit: state.get('commentEditor').get('hasOnceTryToSubmit')

})

const mapActions = (dispatch) => ({
        triggerShowEmojiPicker() {
            const triggerShowEmojiPickerAction = createTriggerShowEmojiPickerAction()
            dispatch(triggerShowEmojiPickerAction)
        },
        appointInputValue(event,input) {
            const value = {
                input: input,
                inputValue: event.target.value
            }
            const appointInputValueAction = createAppointInputValueAction(value)
            dispatch(appointInputValueAction)
        },
        focusHandler(inputId) {
            const value = {
                input: inputId,
                showWarn: false,
            }
            const appointInputWarnAction = createAppointInputWarnAction(value)
            dispatch(appointInputWarnAction)
        },
        blurHandler(event, inputId, _this) {
            if((!_this.props.hasOnceTryToSubmit) && event.target.value === EMPTYSTRING){
                return
            }
            const stringToCheck = event.target.value
            switch (inputId) {
                case VISITOR_NAME:
                    checkVisitorName(stringToCheck, dispatch)
                    break
                case COMMENT_CONTENT:
                    checkCommentContent(stringToCheck, dispatch)
                    break
                case VISITOR_EMAIL:
                    checkVisitorEmail(stringToCheck, dispatch)
                    break
                case VISITOR_SITE_ADDRESS:
                    stringToCheck.trim() !== '' && checkVisitorSiteAddress(stringToCheck, dispatch)
                    break
                default:
                    return
            }
        },
        submitComment(visitorName,
                      commentContent,
                      visitorEmail,
                      visitorSiteAddress){
            const triggerHasOnceTryToSubmitAction = createTriggerHasOnceTryToSubmitActionn()
            dispatch(triggerHasOnceTryToSubmitAction)
            checkCommentContent(commentContent, dispatch)
            checkVisitorName(visitorName, dispatch)
            checkVisitorEmail(visitorEmail, dispatch)
            checkVisitorSiteAddress(visitorSiteAddress, dispatch)
            /*console.log(_this)
            console.log(commentContent)
            console.log(visitorEmail)
            console.log(visitorSiteAddress)*/
        }
})


export default connect(mapState, mapActions)(CommentEditor)

const checkCommentContent = (commentContent, dispatch) => {
    if(commentContent.trim() === EMPTYSTRING){
        const value = {
            input: COMMENT_CONTENT,
            showWarn: true,
            warnMsg: '您还未填写任何留言内容'
        }
        const appointInputWarnAction = createAppointInputWarnAction(value)
        dispatch(appointInputWarnAction)
    }
}

const checkVisitorName = (visitorName, dispatch) => {
    if(visitorName.trim() === EMPTYSTRING){
        const value = {
            input: VISITOR_NAME,
            showWarn: true,
            warnMsg: '昵称不能为空'
        }
        const appointInputWarnAction = createAppointInputWarnAction(value)
        dispatch(appointInputWarnAction)
    }
    if(CountLength(visitorName) > 14){
        const value = {
            input: VISITOR_NAME,
            showWarn: true,
            warnMsg: '昵称太长'
        }
        const appointInputWarnAction = createAppointInputWarnAction(value)
        dispatch(appointInputWarnAction)
    }
}

const checkVisitorEmail = (visitorEmail, dispatch) => {
    if(visitorEmail.trim() === EMPTYSTRING){
        const value = {
            input: VISITOR_EMAIL,
            showWarn: true,
            warnMsg: '请填写您的邮箱地址'
        }
        const appointInputWarnAction = createAppointInputWarnAction(value)
        dispatch(appointInputWarnAction)
        return
    }
    if(visitorEmail.match(EMAIL_REGULAR) == null){
        const value = {
            input: VISITOR_EMAIL,
            showWarn: true,
            warnMsg: '非法的邮件地址'
        }
        const appointInputWarnAction = createAppointInputWarnAction(value)
        dispatch(appointInputWarnAction)
    }
}

const checkVisitorSiteAddress = (visitorSiteAddress, dispatch) => {
    if(visitorSiteAddress.trim() === EMPTYSTRING){
        return
    }
    if(visitorSiteAddress.match(SITE_ADDRESS_REGULAR) == null){
        const value = {
            input: VISITOR_SITE_ADDRESS,
            showWarn: true,
            warnMsg: '请填写正确格式的网址'
        }
        const appointInputWarnAction = createAppointInputWarnAction(value)
        dispatch(appointInputWarnAction)
    }
}