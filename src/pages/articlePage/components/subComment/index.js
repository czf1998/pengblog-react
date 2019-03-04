import React, {Fragment, PureComponent} from 'react'
import { connect } from 'react-redux'
import { SubCommentWrapper,SubCommentAuthor,Content,Meta,ReplyButton,DeleteButton } from './style'
import { CommonClassNameConstants } from '../../../../commonStyle'
import { GetDateDiff } from '../../../../exJs'
import {createAppointShowSubCommentEditorManagerAction} from "../comment/store";

const REPLY_CLASSNAME = 'fa fa-reply'
const RETRACT_CLASSNAME = 'fa fa-chevron-up'
const REPLY_MSG = '回复'
const RETRACT_MSG = '收起'



class SubComment extends PureComponent {

    render() {

        const { comment,isMobile,clickReplyHandler,showSubCommentEditorManager,alreadyLoggedIn } = this.props

        const replyButtonIconClassName = showSubCommentEditorManager.get('hostTopLevelCommentId') === comment.get('comment_referComment').get('comment_id')
                                         &&
                                         showSubCommentEditorManager.get('triggerFromCommentId') === comment.get('comment_id')
                                         ?
                                         RETRACT_CLASSNAME : REPLY_CLASSNAME

        const replyButtonMsg =  showSubCommentEditorManager.get('hostTopLevelCommentId') === comment.get('comment_referComment').get('comment_id')
                                &&
                                showSubCommentEditorManager.get('triggerFromCommentId') === comment.get('comment_id')
                                ?
                                RETRACT_MSG : REPLY_MSG

        return (
            <SubCommentWrapper>

                <Content>
                    <SubCommentAuthor className={CommonClassNameConstants.CLICKABLE}>
                        {comment.get('comment_author').get('visitor_name')}:&nbsp;
                    </SubCommentAuthor>
                    {comment.get('comment_content')}
                </Content>

                <Meta className={CommonClassNameConstants.FONT_DARK}>
                    {GetDateDiff(comment.get('comment_releaseTime'))}
                    &nbsp;|&nbsp;
                    <ReplyButton className={replyButtonIconClassName}
                                onClick={() => {clickReplyHandler(comment.get('comment_referComment').get('comment_id'),comment.get('comment_id'),comment.get('comment_author').get('visitor_name'))}}>
                    </ReplyButton>
                    {
                        alreadyLoggedIn &&
                        <Fragment>
                            &nbsp;|&nbsp;
                            <DeleteButton className="fa fa-trash-o"/>
                        </Fragment>
                    }
                </Meta>
            </SubCommentWrapper>
        );
    }
}

const mapState = (state) => {
    return  {
        isMobile: state.get('rootState').get('isMobile'),
        showSubCommentEditorManager: state.get('commentEditor').get('showSubCommentEditorManager'),
        alreadyLoggedIn: state.get('loginPage').get('alreadyLoggedIn')
    }
}



const mapActions = (dispatch) => ({
    clickReplyHandler(hostTopLevelCommentId,triggerFromCommentId,replyingVisitorName) {
        const value = {
            hostTopLevelCommentId: hostTopLevelCommentId,
            triggerFromCommentId: triggerFromCommentId,
            replyingVisitorName:replyingVisitorName
        }
        const appointShowSubCommentEditorManagerAction = createAppointShowSubCommentEditorManagerAction(value)
        dispatch(appointShowSubCommentEditorManagerAction)
    }
})


export default connect(mapState, mapActions)(SubComment)