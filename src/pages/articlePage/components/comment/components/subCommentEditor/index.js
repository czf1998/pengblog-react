import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { GapLine, Input, Textarea } from '../../../../../../common'
import {SubCommentEditorWrapper,Content,OperationColumn,SubmitButtonWrapper,SubmitButton,EmojiButton} from './style'
import {COMMENT_CONTENT} from "../../../commentEditor/constant";
import * as CommonClassNameConstants from "../../../../../../commonStyle/commonClassNameConstant";

class SubCommentEditor extends PureComponent{

    render(){

        const {isMobile} = this.props

        return (
            <SubCommentEditorWrapper>
                <Content>
                    <Textarea rows={2}
                              placeholder="开始编辑您的留言"
                              />


                </Content>
                <OperationColumn>

                    {
                        !isMobile &&
                        <EmojiButton className={CommonClassNameConstants.CURSORP}>
                            <span role="img" aria-label="emoji">🙂</span>
                        </EmojiButton>
                    }

                    <SubmitButtonWrapper>
                        <SubmitButton>
                            <i className="fa fa-paper-plane"/>&nbsp;Submit&nbsp;
                        </SubmitButton>
                    </SubmitButtonWrapper>
                </OperationColumn>
            </SubCommentEditorWrapper>
        )
    }
}

const mapState = (state) => ({
    isMobile: state.get('rootState').get('isMobile')
})

export default connect(mapState)(SubCommentEditor)

