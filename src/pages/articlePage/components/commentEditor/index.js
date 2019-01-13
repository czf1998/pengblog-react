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
         InputOfEditor,
         TextArea,
         VisitorInfo,
         EmojiButton,
         EmojiPickerWrapper,
         SubmitButtonWrapper,
         SubmitButton,
         InputWrapper,
         InputIcon } from './style'
import { CommonClassNameConstants } from '../../../../commonStyle'
import { GapLine, Input } from '../../../../common'
import { EmojiPicker } from './components'

class CommentEditor extends PureComponent {

    render() {

        const { isMobile,
                triggerShowEmojiPicker,
                showEmojiPicker,
                commentContent,
                visitorName,
                visitorEmail,
                visitorSiteAddress,
                refreshCommentContent,
                refreshVisitorName,
                refreshVisitorEmail,
                refreshVisitorSiteAddress } = this.props

        return (
            <CommentEditorWrapper>

                <GapLine/>

                <Title  className={CommonClassNameConstants.COMMON_PADDING}>
                    <i className={CommonClassNameConstants.FONT_DARK + 'fa fa-edit'}/>&nbsp;说点什么
                </Title>

                <Name className={CommonClassNameConstants.COMMON_PADDING_HORIZONTAL}>
                    <Input placeholder="设定好昵称"
                             type="text"
                             value={visitorName}
                             onChange={refreshVisitorName} iconClassName="fa fa-user-o"/>
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
                            <span onClick={triggerShowEmojiPicker}>🙂</span>
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

                    <Input placeholder="留个邮箱"
                             type="text"
                             value={visitorEmail}
                             onChange={refreshVisitorEmail}
                             iconClassName="fa fa-envelope"/>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <Input placeholder="你也有个人网站？"
                             type="text"
                             value={visitorSiteAddress}
                             onChange={refreshVisitorSiteAddress}
                             iconClassName="fa fa-compass"/>

                </VisitorInfo>

                <SubmitButtonWrapper>
                    <SubmitButton>
                        <i className="fa fa-paper-plane"/>&nbsp;Submit&nbsp;
                    </SubmitButton>
                </SubmitButtonWrapper>
            </CommentEditorWrapper>
        );
    }

}

const mapState = (state) => ({
        isMobile: state.get('rootState').get('isMobile'),
        showEmojiPicker: state.get('commentEditor').get('showEmojiPicker'),
        commentContent: state.get('commentEditor').get('commentContent'),
        visitorName: state.get('commentEditor').get('visitorName'),
        visitorEmail: state.get('commentEditor').get('visitorEmail'),
        visitorSiteAddress: state.get('commentEditor').get('visitorSiteAddress')
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
        }
})



export default connect(mapState, mapActions)(CommentEditor)