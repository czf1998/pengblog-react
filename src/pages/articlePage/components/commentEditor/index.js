import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createRefreshCommentContentAction,
         createTriggerShowEmojiPickerAction,
         createRefreshVisitorNameAction,
         createRefreshVisitorEmailAction,
         createRefreshVisitorSiteAddressAction } from './store'
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
                refreshVisitorName,
                refreshVisitorEmail,
                refreshVisitorSiteAddress,
                submitComment } = this.props

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
                            onChange={refreshVisitorName}
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
                            onChange={refreshVisitorEmail}
                            showWarn={visitorEmailManager.get('showWarn')}
                            warnMsg={visitorEmailManager.get('warnMsg')}
                            iconClassName="fa fa-envelope"/>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <Input placeholder="你也有个人网站？"
                             type="text"
                             value={visitorSiteAddressManager.get('value')}
                             onChange={refreshVisitorSiteAddress}
                             showWarn={visitorSiteAddressManager.get('showWarn')}
                             warnMsg={visitorSiteAddressManager.get('warnMsg')}
                             iconClassName="fa fa-compass"/>

                </VisitorInfo>

                <SubmitButtonWrapper>

                    <div onClick={() => {submitComment( visitorNameManager.get('value'),
                                                        commentContent,
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
        refreshVisitorName(e) {
            const refreshVisitorNameAction = createRefreshVisitorNameAction(e.target.value)
            dispatch(refreshVisitorNameAction)
        },
        refreshVisitorEmail(e) {
            const refreshVisitorEmailAction = createRefreshVisitorEmailAction(e.target.value)
            dispatch(refreshVisitorEmailAction)
        },
        refreshVisitorSiteAddress(e) {
            const refreshVisitorSiteAddressAction = createRefreshVisitorSiteAddressAction(e.target.value)
            dispatch(refreshVisitorSiteAddressAction)
        },
        checkVisitorName(visitorName){

        },
        submitComment(visitorName,
                      commentContent,
                      visitorEmail,
                      visitorSiteAddress){
            console.log(visitorName)
            console.log(commentContent)
            console.log(visitorEmail)
            console.log(visitorSiteAddress)
        }
})



export default connect(mapState, mapActions)(CommentEditor)