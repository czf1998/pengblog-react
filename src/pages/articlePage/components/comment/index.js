import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
//import { Link } from 'react-keeper'
import { Link } from 'react-router-dom'
import { CommentWrapper } from './style'
import { CommonClassNameConstants } from '../../../../commonStyle'


class Comment extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {

        const { widthOfMainArea, article } = this.props
        return (
            <CommentWrapper className={CommonClassNameConstants.COMMON_PADDING}
                            widthOfMainArea={widthOfMainArea}>


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