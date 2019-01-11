import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { CommentEditorWrapper, Title, Name, Content, InputOfEditor, TextArea } from './style'
import { CommonClassNameConstants } from '../../../../commonStyle'
import { GapLine } from '../../../../common'


class CommentEditor extends PureComponent {


    render() {

        const { widthOfMainArea } = this.props

        return (
            <CommentEditorWrapper widthOfMainArea={widthOfMainArea}>

                <GapLine/>

                <Title  className={CommonClassNameConstants.COMMON_PADDING}>
                    <i className={CommonClassNameConstants.FONT_DARK + 'fa fa-edit'}/>&nbsp;说点什么
                </Title>

                <Name className={CommonClassNameConstants.COMMON_PADDING_HORIZONTAL}>
                    <InputOfEditor placeholder="设定好昵称" type="text" widthOfMainArea={widthOfMainArea}/>
                </Name>

                <Content className={CommonClassNameConstants.COMMON_PADDING_HORIZONTAL}>
                    <TextArea rows="5" placeholder="开始编辑您的留言"/>
                </Content>

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