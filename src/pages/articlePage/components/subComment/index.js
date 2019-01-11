import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { SubCommentWrapper, QuotedVisitor, Content, Meta } from './style'
import { CommonClassNameConstants } from '../../../../commonStyle'
import { GetDateDiff } from '../../../../exJs'


class SubComment extends PureComponent {


    render() {

        const { comment } = this.props

        return (
            <SubCommentWrapper className={CommonClassNameConstants.COMMON_PADDING}>
                <QuotedVisitor className={CommonClassNameConstants.FONT_SMALL}>
                    引用&nbsp; <span style={{fontWeight:'bold'}}>{comment.get('comment_author').get('visitor_name')}</span> &nbsp;的留言:
                </QuotedVisitor>

                <Content className={CommonClassNameConstants.FONT_SMALL}>
                    {comment.get('comment_content')}
                </Content>

                <Meta className={CommonClassNameConstants.FONT_DARK +
                                 CommonClassNameConstants.FONT_SMALL}>
                    {GetDateDiff(comment.get('comment_releaseTime'))} | <span className={CommonClassNameConstants.CLICKABLE}>引用</span>
                </Meta>
            </SubCommentWrapper>
        );
    }
}

const mapState = (state) => {
    return  {
        isMobile: state.get('rootState').get('isMobile'),
    }
}


export default connect(mapState)(SubComment)