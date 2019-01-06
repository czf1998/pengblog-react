import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
//import { Link } from 'react-keeper'
import { Link } from 'react-router-dom'
import { CommentWrapper, Visitor, Content, Meta } from './style'
import { CommonClassNameConstants } from '../../../../commonStyle'


class Comment extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {

        const { widthOfMainArea, comment } = this.props
        return (
            <CommentWrapper className={CommonClassNameConstants.COMMON_PADDING}
                            widthOfMainArea={widthOfMainArea}>
                <Visitor className={CommonClassNameConstants.FONT_SMALL}>
                    {comment.get('comment_author').get('visitor_name')}
                </Visitor>

                <Content className={CommonClassNameConstants.FONT_SMALL}>
                    {comment.get('comment_content')}
                </Content>

                <Meta className={CommonClassNameConstants.FONT_DARK +
                                 CommonClassNameConstants.FONT_SMALL}>
                    2周前 | 引用
                </Meta>
            </CommentWrapper>
        );
    }
}

const mapState = (state) => {
    return  {
        isMobile: state.get('rootState').get('isMobile'),
        widthOfMainArea: state.get('rootState').get('basicUIFeatures').get('widthOfMainArea')
    }
}


export default connect(mapState)(Comment)