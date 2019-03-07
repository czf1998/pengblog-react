import React, {PureComponent} from 'react'
import {
    CommentEditorWrapper,
    Content,
    EmojiButton,
    EmojiPickerWrapper,
    Name, SubmitButton,
    SubmitButtonWrapper,
    Title,
    VisitorInfo
} from "./style";
import {GapLine} from "../../../../common/gapLine";
import * as CommonClassNameConstants from "../../../../commonStyle/commonClassNameConstant";
import Input from "../../../../common/input";
import {COMMENT_CONTENT, TOP_LEVEL_COMMENT_EDITOR, VISITOR_EMAIL, VISITOR_NAME, VISITOR_SITE_ADDRESS} from "./constant";
import Textarea from "../../../../common/textarea";
import EmojiPicker from "./components/emojiPicker";

class TopLevelCommentEditorUI extends PureComponent{

    render(){
        const {
            article_id,
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
            <CommentEditorWrapper>

                <GapLine/>

                <Title  className={CommonClassNameConstants.COMMON_PADDING}>
                    <span className="iconfont" style={{fontSize:'1.6rem'}}>&#xe632;</span>&nbsp;说点什么
                </Title>

                <Name className={CommonClassNameConstants.COMMON_PADDING_HORIZONTAL}>
                    <Input  placeholder="设定好昵称"
                            type="text"
                            value={visitorNameManager.get('value')}
                            onChange={(event) => {appointInputValue(event,VISITOR_NAME,TOP_LEVEL_COMMENT_EDITOR)}}
                            showWarn={visitorNameManager.get('showWarn')}
                            warnMsg={visitorNameManager.get('warnMsg')}
                            onFocus={() => {focusHandler(VISITOR_NAME,TOP_LEVEL_COMMENT_EDITOR)}}
                            onBlur={(event) => {blurHandler(event, VISITOR_NAME, this,TOP_LEVEL_COMMENT_EDITOR)}}
                            iconClassName="fa fa-user-o"/>
                </Name>

                <Content className={CommonClassNameConstants.COMMON_PADDING_HORIZONTAL +
                                    CommonClassNameConstants.COMMON_MARGIN_BOTTOM}>

                    <Textarea rows={5}
                              placeholder="开始编辑您的留言"
                              value={commentContentManager.get('value')}
                              onChange={(event) => {appointInputValue(event,COMMENT_CONTENT,TOP_LEVEL_COMMENT_EDITOR)}}
                              showWarn={commentContentManager.get('showWarn')}
                              warnMsg={commentContentManager.get('warnMsg')}
                              onFocus={() => {focusHandler(COMMENT_CONTENT,TOP_LEVEL_COMMENT_EDITOR)}}
                              onBlur={(event) => {blurHandler(event,COMMENT_CONTENT,this,TOP_LEVEL_COMMENT_EDITOR)}}/>

                    {
                        !isMobile &&
                        <EmojiButton className={CommonClassNameConstants.CURSORP}>
                            <span onClick={() => {triggerShowEmojiPicker(TOP_LEVEL_COMMENT_EDITOR)}} role="img" aria-label="emoji">🙂</span>
                        </EmojiButton>
                    }

                    {
                        showEmojiPicker &&
                        <EmojiPickerWrapper>
                            <EmojiPicker editorId={TOP_LEVEL_COMMENT_EDITOR}/>
                        </EmojiPickerWrapper>
                    }

                </Content>


                <VisitorInfo className={CommonClassNameConstants.COMMON_PADDING_HORIZONTAL}>

                    <Input  width={isMobile ? '100%' : '35%'}
                            placeholder="您的邮箱"
                            type="text"
                            value={visitorEmailManager.get('value')}
                            onChange={(event) => {appointInputValue(event,VISITOR_EMAIL,TOP_LEVEL_COMMENT_EDITOR)}}
                            showWarn={visitorEmailManager.get('showWarn')}
                            warnMsg={visitorEmailManager.get('warnMsg')}
                            iconClassName="fa fa-envelope"
                            onFocus={() => {focusHandler(VISITOR_EMAIL,TOP_LEVEL_COMMENT_EDITOR)}}
                            onBlur={(event) => {blurHandler(event,VISITOR_EMAIL,this,TOP_LEVEL_COMMENT_EDITOR)}}/>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <Input  width={isMobile ? '100%' : '35%'}
                            placeholder="你的个人网站？如果有"
                            type="text"
                            value={visitorSiteAddressManager.get('value')}
                            onChange={(event) => {appointInputValue(event,VISITOR_SITE_ADDRESS,TOP_LEVEL_COMMENT_EDITOR)}}
                            showWarn={visitorSiteAddressManager.get('showWarn')}
                            warnMsg={visitorSiteAddressManager.get('warnMsg')}
                            iconClassName="fa fa-compass"
                            onFocus={() => {focusHandler(VISITOR_SITE_ADDRESS,TOP_LEVEL_COMMENT_EDITOR)}}
                            onBlur={(event) => {blurHandler(event,VISITOR_SITE_ADDRESS,this,TOP_LEVEL_COMMENT_EDITOR)}}/>

                </VisitorInfo>

                <SubmitButtonWrapper>

                    <div onClick={() => {submitComment( article_id,
                                                        null,
                                                        visitorNameManager.get('value'),
                                                        commentContentManager.get('value'),
                                                        visitorEmailManager.get('value'),
                                                        visitorSiteAddressManager.get('value'),
                                                        TOP_LEVEL_COMMENT_EDITOR)}}>
                        <SubmitButton>
                            {
                                isLoading ?
                                    <span>
                                        <i className={'fa fa-spinner fa-pulse'} style={{color:'black'}}/>
                                    </span>
                                    :
                                    <span>
                                    Submit
                                    </span>
                            }
                        </SubmitButton>
                    </div>

                </SubmitButtonWrapper>
            </CommentEditorWrapper>
        )
    }

    componentDidMount(){
        this.props.writeVisitorInfoSilently(this,TOP_LEVEL_COMMENT_EDITOR)
    }

}



export {TopLevelCommentEditorUI}