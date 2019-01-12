import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createRefreshCommentContentAction, createTriggerShowEmojiPickerAction } from './store'
import { CommentEditorWrapper, Title, Name, Content, InputOfEditor, TextArea, VisitorInfo, EmojiButton, EmojiPickerWrapper } from './style'
import { CommonClassNameConstants } from '../../../../commonStyle'
import { GapLine } from '../../../../common'
import { EmojiPicker } from './components'

class CommentEditor extends PureComponent {


    render() {

        const { isMobile, widthOfMainArea, triggerShowEmojiPicker, showEmojiPicker, commentContent, refreshCommentContent } = this.props

        return (
            <CommentEditorWrapper widthOfMainArea={widthOfMainArea}>

                <GapLine/>

                <Title  className={CommonClassNameConstants.COMMON_PADDING}>
                    <i className={CommonClassNameConstants.FONT_DARK + 'fa fa-edit'}/>&nbsp;说点什么
                </Title>

                <Name className={CommonClassNameConstants.COMMON_PADDING_HORIZONTAL}>
                    <InputOfEditor placeholder="设定好昵称" type="text" widthOfMainArea={widthOfMainArea}/>
                </Name>

                <Content className={CommonClassNameConstants.COMMON_PADDING_HORIZONTAL +
                                    CommonClassNameConstants.COMMON_MARGIN_BOTTOM}>

                    <TextArea rows="5" placeholder="开始编辑您的留言" value={commentContent} onChange={refreshCommentContent}/>
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
                    <InputOfEditor placeholder="留个邮箱" type="text" widthOfMainArea={widthOfMainArea} style={{marginRight:'2rem'}}/>
                    <InputOfEditor placeholder="你也有个人网站吗" type="text" widthOfMainArea={widthOfMainArea}/>
                </VisitorInfo>

                <div style={{width:'100%', height:'500px'}}></div>

            </CommentEditorWrapper>
        );
    }

}

const mapState = (state) => ({
        isMobile: state.get('rootState').get('isMobile'),
        widthOfMainArea: state.get('rootState').get('basicUIFeatures').get('widthOfMainArea'),
        showEmojiPicker: state.get('commentEditor').get('showEmojiPicker'),
        commentContent: state.get('commentEditor').get('commentContent')
})

const mapActions = (dispatch) => ({
        triggerShowEmojiPicker() {
            const triggerShowEmojiPickerAction = createTriggerShowEmojiPickerAction()
            dispatch(triggerShowEmojiPickerAction)
        },
        refreshCommentContent(e) {
            const refreshCommentContentAction = createRefreshCommentContentAction(e.target.value)
            dispatch(refreshCommentContentAction)
        }
})



export default connect(mapState, mapActions)(CommentEditor)