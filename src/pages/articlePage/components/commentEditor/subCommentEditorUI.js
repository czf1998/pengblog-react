import React, {PureComponent} from 'react'
import {
    SubCommentEditorWrapper,
    Content,
    EmojiButton,SubContent,
    SubEmojiPickerWrapper,
    SubSubmitButton,
    SubSubmitButtonWrapper,
    SubVisitorInfo,
    InputWrapper
} from "./style";
import * as CommonClassNameConstants from "../../../../commonStyle/commonClassNameConstant";
import Input from "../../../../common/input";
import {COMMENT_CONTENT, SUB_COMMENT_EDITOR, VISITOR_EMAIL, VISITOR_NAME, VISITOR_SITE_ADDRESS} from "./constant";
import Textarea from "../../../../common/textarea";
import EmojiPicker from "./components/emojiPicker";

class SubCommentEditorUI extends PureComponent{

    render(){
        const {
            article_id,
            comment_referComment,
            isMobile,
            triggerShowEmojiPicker,
            showEmojiPicker,
            commentContentManager,
            visitorNameManager,
            visitorEmailManager,
            visitorSiteAddressManager,
            appointInputValue,
            submitComment,
            focusHandler,
            blurHandler,
            isLoading} = this.props

        return (
            <SubCommentEditorWrapper className="subCommentEditor">



                <SubContent className={CommonClassNameConstants.COMMON_MARGIN_BOTTOM}>

                    <Textarea rows={5}
                              placeholder="开始编辑您的留言"
                              value={commentContentManager.get('value')}
                              onChange={(event) => {appointInputValue(event,COMMENT_CONTENT,SUB_COMMENT_EDITOR)}}
                              showWarn={commentContentManager.get('showWarn')}
                              warnMsg={commentContentManager.get('warnMsg')}
                              onFocus={() => {focusHandler(COMMENT_CONTENT,SUB_COMMENT_EDITOR)}}
                              onBlur={(event) => {blurHandler(event,COMMENT_CONTENT,this,SUB_COMMENT_EDITOR)}}/>

                    {
                        !isMobile &&
                        <EmojiButton className={CommonClassNameConstants.CURSORP}>
                            <span onClick={() => {triggerShowEmojiPicker(SUB_COMMENT_EDITOR)}} role="img" aria-label="emoji">🙂</span>
                        </EmojiButton>
                    }

                    {
                        showEmojiPicker &&
                        <SubEmojiPickerWrapper>
                            <EmojiPicker editorId={SUB_COMMENT_EDITOR}/>
                        </SubEmojiPickerWrapper>
                    }

                </SubContent>

                <SubVisitorInfo>
                    <InputWrapper>
                        <Input  placeholder="设定好昵称"
                                type="text"
                                value={visitorNameManager.get('value')}
                                onChange={(event) => {appointInputValue(event,VISITOR_NAME,SUB_COMMENT_EDITOR)}}
                                showWarn={visitorNameManager.get('showWarn')}
                                warnMsg={visitorNameManager.get('warnMsg')}
                                onFocus={() => {focusHandler(VISITOR_NAME,SUB_COMMENT_EDITOR)}}
                                onBlur={(event) => {blurHandler(event, VISITOR_NAME, this,SUB_COMMENT_EDITOR)}}
                                iconClassName="fa fa-user-o"/>
                    </InputWrapper>

                    <InputWrapper>
                        <Input  placeholder="您的邮箱"
                                          type="text"
                                          value={visitorEmailManager.get('value')}
                                          onChange={(event) => {appointInputValue(event,VISITOR_EMAIL,SUB_COMMENT_EDITOR)}}
                                          showWarn={visitorEmailManager.get('showWarn')}
                                          warnMsg={visitorEmailManager.get('warnMsg')}
                                          iconClassName="fa fa-envelope"
                                          onFocus={() => {focusHandler(VISITOR_EMAIL,SUB_COMMENT_EDITOR)}}
                                          onBlur={(event) => {blurHandler(event,VISITOR_EMAIL,this,SUB_COMMENT_EDITOR)}}/>
                    </InputWrapper>

                    <InputWrapper>
                        <Input  placeholder="你的个人网站？如果有"
                                type="text"
                                value={visitorSiteAddressManager.get('value')}
                                onChange={(event) => {appointInputValue(event,VISITOR_SITE_ADDRESS,SUB_COMMENT_EDITOR)}}
                                showWarn={visitorSiteAddressManager.get('showWarn')}
                                warnMsg={visitorSiteAddressManager.get('warnMsg')}
                                iconClassName="fa fa-compass"
                                onFocus={() => {focusHandler(VISITOR_SITE_ADDRESS,SUB_COMMENT_EDITOR)}}
                                onBlur={(event) => {blurHandler(event,VISITOR_SITE_ADDRESS,this,SUB_COMMENT_EDITOR)}}/>
                    </InputWrapper>


                    <SubSubmitButtonWrapper>
                        <SubSubmitButton onClick={() => {!isLoading && window.throttleByGap(() => {submitComment( article_id,
                            comment_referComment.get('comment_id'),
                            visitorNameManager.get('value'),
                            commentContentManager.get('value'),
                            visitorEmailManager.get('value'),
                            visitorSiteAddressManager.get('value'),
                            SUB_COMMENT_EDITOR)}, 500, {page:'articlePage',method:'submitComment'})}}>
                            {
                                isLoading ?
                                    <span>
                                    <i className={'fa fa-spinner fa-pulse'} style={{color:'black'}}/>&nbsp;Submitting&nbsp;
                                </span>
                                    :
                                    <span>
                                    <i className="fa fa-paper-plane"/>&nbsp;Submit&nbsp;
                                </span>
                            }
                        </SubSubmitButton>
                    </SubSubmitButtonWrapper>
                </SubVisitorInfo>


            </SubCommentEditorWrapper>
        )
    }

    componentDidMount(){
        this.props.writeVisitorInfoSilently(this,SUB_COMMENT_EDITOR)
    }

}



export {SubCommentEditorUI}