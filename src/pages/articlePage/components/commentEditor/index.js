import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {createRefreshCommentContentAction,
        createTriggerShowEmojiPickerAction,
        createAppointInputValueAction,
        createAppointInputWarnAction } from './store'
import { CommentEditorWrapper,
         Title,
         Name,
         Content,
         TextArea,
         VisitorInfo,
         EmojiButton,
         EmojiPickerWrapper,
         SubmitButtonWrapper,
         SubmitButton } from './style'
import { CommonClassNameConstants } from '../../../../commonStyle'
import { GapLine, Input } from '../../../../common'
import { EmojiPicker } from './components'

class CommentEditor extends PureComponent {

    render() {

        const { isMobile,
                triggerShowEmojiPicker,
                showEmojiPicker,
                commentContent,
                visitorNameManager,
                visitorEmailManager,
                visitorSiteAddressManager,
                refreshCommentContent,
                appointInputValue,
                submitComment } = this.props

        const _this = this

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
                            iconClassName="fa fa-user-o"/>
                </Name>

                <Content className={CommonClassNameConstants.COMMON_PADDING_HORIZONTAL +
                                    CommonClassNameConstants.COMMON_MARGIN_BOTTOM}>

                    <TextArea rows="5"
                              placeholder="开始编辑您的留言"
                              value={commentContent}
                              onChange={refreshCommentContent}/>

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
                            iconClassName="fa fa-envelope"/>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <Input  placeholder="你的个人网站？如果有"
                            type="text"
                            value={visitorSiteAddressManager.get('value')}
                            onChange={(event) => {appointInputValue(event,'visitorSiteAddress')}}
                            showWarn={visitorSiteAddressManager.get('showWarn')}
                            warnMsg={visitorSiteAddressManager.get('warnMsg')}
                            iconClassName="fa fa-compass"/>

                </VisitorInfo>

                <SubmitButtonWrapper>

                    <div onClick={() => {submitComment( visitorNameManager.get('value'),
                                                        commentContent,
                                                        visitorEmailManager.get('value'),
                                                        visitorSiteAddressManager.get('value'),
                                                        this)}}>
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
        commentContent: state.get('commentEditor').get('commentContent'),
        visitorNameManager: state.get('commentEditor').get('visitorNameManager'),
        visitorEmailManager: state.get('commentEditor').get('visitorEmailManager'),
        visitorSiteAddressManager: state.get('commentEditor').get('visitorSiteAddressManager')
})

const mapActions = (dispatch) => ({
        triggerShowEmojiPicker() {
            const triggerShowEmojiPickerAction = createTriggerShowEmojiPickerAction()
            dispatch(triggerShowEmojiPickerAction)
        },
        refreshCommentContent(e) {
            const refreshCommentContentAction = createRefreshCommentContentAction(e.target.value)
            dispatch(refreshCommentContentAction)
        },
        appointInputValue(event,input) {
            const value = {
                input: input,
                inputValue: event.target.value
            }
            const appointInputValueAction = createAppointInputValueAction(value)
            dispatch(appointInputValueAction)
        },
        checkVisitorName(visitorName){
            if(visitorName.trim() === ''){
                const value = {
                    input: 'visitorName',
                    showWarn: true,
                    warnMsg: '昵称不能为空'
                }
                const appointInputWarnAction = createAppointInputWarnAction(value)
                dispatch(appointInputWarnAction)
            }
            if(visitorName.getLength() > 14){
                const value = {
                    input: 'visitorName',
                    showWarn: true,
                    warnMsg: '昵称太长'
                }
                const appointInputWarnAction = createAppointInputWarnAction(value)
                dispatch(appointInputWarnAction)
            }
        },
        checkVisitorEmail(visitorEmail){
            if(visitorEmail.trim() === ''){
                const value = {
                    input: 'visitorEmail',
                    showWarn: true,
                    warnMsg: '请填写您的邮箱地址'
                }
                const appointInputWarnAction = createAppointInputWarnAction(value)
                dispatch(appointInputWarnAction)
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
        },
        submitComment(visitorName,
                      commentContent,
                      visitorEmail,
                      visitorSiteAddress,_this){
            _this.props.checkVisitorName(visitorName)
            _this.props.checkVisitorEmail(visitorEmail)

            /*console.log(_this)
            console.log(commentContent)
            console.log(visitorEmail)
            console.log(visitorSiteAddress)*/
        }
})



export default connect(mapState, mapActions)(CommentEditor)