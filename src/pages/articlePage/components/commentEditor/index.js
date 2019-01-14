import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {createTriggerShowEmojiPickerAction,
        createAppointInputValueAction,
        createAppointInputWarnAction } from './store'
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
                            onChange={(event) => {appointInputValue(event,'visitorName')}}
                            showWarn={visitorNameManager.get('showWarn')}
                            warnMsg={visitorNameManager.get('warnMsg')}
                            onFocus={() => {focusHandler('visitorName')}}
                            onBlur={(event) => {blurHandler(event, 'visitorName')}}
                            iconClassName="fa fa-user-o"/>
                </Name>

                <Content className={CommonClassNameConstants.COMMON_PADDING_HORIZONTAL +
                                    CommonClassNameConstants.COMMON_MARGIN_BOTTOM}>

                    <Textarea rows={5}
                              placeholder="开始编辑您的留言"
                              value={commentContentManager.get('value')}
                              onChange={(event) => {appointInputValue(event,'commentContent')}}
                              showWarn={commentContentManager.get('showWarn')}
                              warnMsg={commentContentManager.get('warnMsg')}
                              onFocus={() => {focusHandler('commentContent')}}
                              onBlur={(event) => {blurHandler(event, 'commentContent')}}/>

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
                            onChange={(event) => {appointInputValue(event,'visitorEmail')}}
                            showWarn={visitorEmailManager.get('showWarn')}
                            warnMsg={visitorEmailManager.get('warnMsg')}
                            iconClassName="fa fa-envelope"
                            onFocus={() => {focusHandler('visitorEmail')}}
                            onBlur={(event) => {blurHandler(event, 'visitorEmail')}}/>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <Input  placeholder="你的个人网站？如果有"
                            type="text"
                            value={visitorSiteAddressManager.get('value')}
                            onChange={(event) => {appointInputValue(event,'visitorSiteAddress')}}
                            showWarn={visitorSiteAddressManager.get('showWarn')}
                            warnMsg={visitorSiteAddressManager.get('warnMsg')}
                            iconClassName="fa fa-compass"
                            onFocus={() => {focusHandler('visitorSiteAddress')}}
                            onBlur={(event) => {blurHandler(event, 'visitorSiteAddress')}}/>

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
        visitorSiteAddressManager: state.get('commentEditor').get('visitorSiteAddressManager')

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
        blurHandler(event, inputId) {
            const stringToCheck = event.target.value
            switch (inputId) {
                case "visitorName":
                    checkVisitorName(stringToCheck, dispatch)
                    break
                case "commentContent":
                    checkCommentContent(stringToCheck, dispatch)
                    break
                case "visitorEmail":
                    checkVisitorEmail(stringToCheck, dispatch)
                    break
                case "visitorSiteAddress":
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
    if(commentContent.trim() === ''){
        const value = {
            input: 'commentContent',
            showWarn: true,
            warnMsg: '您还未填写任何留言内容'
        }
        const appointInputWarnAction = createAppointInputWarnAction(value)
        dispatch(appointInputWarnAction)
    }
}

const checkVisitorName = (visitorName, dispatch) => {
    if(visitorName.trim() === ''){
        const value = {
            input: 'visitorName',
            showWarn: true,
            warnMsg: '昵称不能为空'
        }
        const appointInputWarnAction = createAppointInputWarnAction(value)
        dispatch(appointInputWarnAction)
    }
    if(CountLength(visitorName) > 14){
        const value = {
            input: 'visitorName',
            showWarn: true,
            warnMsg: '昵称太长'
        }
        const appointInputWarnAction = createAppointInputWarnAction(value)
        dispatch(appointInputWarnAction)
    }
}

const checkVisitorEmail = (visitorEmail, dispatch) => {
    if(visitorEmail.trim() === ''){
        const value = {
            input: 'visitorEmail',
            showWarn: true,
            warnMsg: '请填写您的邮箱地址'
        }
        const appointInputWarnAction = createAppointInputWarnAction(value)
        dispatch(appointInputWarnAction)
        return
    }
    if(visitorEmail.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/) == null){
        const value = {
            input: 'visitorEmail',
            showWarn: true,
            warnMsg: '非法的邮件地址'
        }
        const appointInputWarnAction = createAppointInputWarnAction(value)
        dispatch(appointInputWarnAction)
    }
}

const checkVisitorSiteAddress = (visitorSiteAddress, dispatch) => {
    if(visitorSiteAddress.trim() === ''){
        return
    }
    if(visitorSiteAddress.match(/^((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})(www\.){0,1}(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~/])+$/) == null){
        const value = {
            input: 'visitorSiteAddress',
            showWarn: true,
            warnMsg: '请填写正确格式的网址'
        }
        const appointInputWarnAction = createAppointInputWarnAction(value)
        dispatch(appointInputWarnAction)
    }
}