import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { CommentWrapper, Visitor, Content, Meta } from './style'
import { CommonClassNameConstants } from '../../../../commonStyle'
import { GetDateDiff } from '../../../../exJs'
import SubComment from '../subComment'


class Comment extends PureComponent {

    constructor(props) {
        super(props)
        this.redirectToVisitorSite = this.redirectToVisitorSite.bind(this)
    }

    render() {

        const { widthOfMainArea,
                comment,
                clickReferHandler} = this.props
        return (
            <CommentWrapper className={CommonClassNameConstants.COMMON_PADDING}
                            widthOfMainArea={widthOfMainArea}>
                {
                    comment.get('comment_author').get('visitor_siteAddress')
                    &&
                    comment.get('comment_author').get('visitor_siteAddress') !== ''
                    ?
                    <Visitor className={CommonClassNameConstants.FONT_SMALL +
                                        CommonClassNameConstants.CLICKABLE +
                                        CommonClassNameConstants.HOVER_UNDERLINE}>
                        <span onClick={this.redirectToVisitorSite}>
                            {comment.get('comment_author').get('visitor_name')}
                        </span>
                    </Visitor>
                    :
                    <Visitor className={CommonClassNameConstants.FONT_SMALL}>
                        {comment.get('comment_author').get('visitor_name')}
                    </Visitor>
                }

                {
                    comment.get('comment_referComment') && comment.get('comment_referComment') !== '' && <SubComment comment={comment.get('comment_referComment')}/>
                }

                <Content className={CommonClassNameConstants.FONT_SMALL}>
                    {comment.get('comment_content')}
                </Content>

                <Meta className={CommonClassNameConstants.FONT_DARK +
                                 CommonClassNameConstants.FONT_SMALL}>
                    {GetDateDiff(comment.get('comment_releaseTime'))} | <span className={CommonClassNameConstants.CLICKABLE} onClick={clickReferHandler}>引用</span>
                </Meta>
            </CommentWrapper>
        );
    }

     redirectToVisitorSite() {
         window.open('http://' + this.props.comment.get('comment_author').get('visitor_siteAddress'))
    }
}



const mapState = (state) => {
    return  {
        isMobile: state.get('rootState').get('isMobile'),
        widthOfMainArea: state.get('rootState').get('basicUIFeatures').get('widthOfMainArea')
    }
}


export default connect(mapState)(Comment)