import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { SubCommentWrapper, SubCommentAuthor, Content, Meta } from './style'
import { CommonClassNameConstants } from '../../../../commonStyle'
import { GetDateDiff } from '../../../../exJs'


class SubComment extends PureComponent {


    render() {

        const { comment } = this.props

        return (
            <SubCommentWrapper>

                <Content>
                    <SubCommentAuthor className={CommonClassNameConstants.CLICKABLE}>
                        {comment.get('comment_author').get('visitor_name')}:&nbsp;
                    </SubCommentAuthor>
                    {comment.get('comment_content')}
                </Content>

                <Meta className={CommonClassNameConstants.FONT_DARK}>
                    {GetDateDiff(comment.get('comment_releaseTime'))} | <span className={CommonClassNameConstants.CLICKABLE}>
                    <i className="fa fa-reply"/>
                </span>
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