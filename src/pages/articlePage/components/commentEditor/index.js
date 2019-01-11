import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { CommentEditorWrapper, Name, Content } from './style'
import { CommonClassNameConstants } from '../../../../commonStyle'


class CommentEditor extends PureComponent {


    render() {

        const { widthOfMainArea } = this.props

        return (
            <CommentEditorWrapper widthOfMainArea={widthOfMainArea}
                                  className={CommonClassNameConstants.COMMON_PADDING_HORIZONTAL}>
                <Name>
                    <input type="text" />
                </Name>
            </CommentEditorWrapper>
        );
    }
}

const mapState = (state) => {
    return  {
        isMobile: state.get('rootState').get('isMobile'),
        widthOfMainArea: state.get('rootState').get('basicUIFeatures').get('widthOfMainArea')
    }
}


export default connect(mapState)(CommentEditor)