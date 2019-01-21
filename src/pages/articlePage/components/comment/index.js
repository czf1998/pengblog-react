import React, {Fragment, PureComponent} from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import {CommentWrapper,
        Content,
        VisitorInfo,
        AvatarWraper,
        Name,
        Gap,
        MultiContent,
        OperationBar,
        Avatar,
        GapH } from './style'
import { CommonClassNameConstants } from '../../../../commonStyle'
import { GetDateDiff } from '../../../../exJs'
import SubComment from '../subComment'
import {SubCommentEditor} from '../commentEditor'
import { createGetSubCommentListDataAction,createAppointShowSubCommentEditorManagerAction } from './store'
import {ForMore} from "../../../../common";

const REPLY_CLASSNAME = 'fa fa-reply'
const RETRACT_CLASSNAME = 'fa fa-chevron-up'
const REPLY_MSG = '回复'
const RETRACT_MSG = '收起'

class Comment extends PureComponent {

    constructor(props) {
        super(props)
        this.redirectToVisitorSite = this.redirectToVisitorSite.bind(this)
        this.state = {
            startIndex: 0,
            currentPage: 1
        }
    }

    render() {

        const { isMobile,
                widthOfMainArea,
                comment,
                clickReplyHandler,
                colorPicker,
                extractFeatureString,
                subCommentMaxPageMananger,
                subCommentList,
                showSubCommentEditorManager,
                getMoreSubCommentListData,
                pageScale,
                isLoadingMoreSubComment} = this.props

        const comment_id = comment.get('comment_id')
        const currentPage = this.state.currentPage

        let maxPage = subCommentMaxPageMananger.get(comment.get('comment_id').toString())




        const replyButtonIconClassName = showSubCommentEditorManager.get('hostTopLevelCommentId') === comment_id
                                         &&
                                         showSubCommentEditorManager.get('hostTopLevelCommentId') === showSubCommentEditorManager.get('triggerFromCommentId')
                                         ?
                                         RETRACT_CLASSNAME : REPLY_CLASSNAME

        const replyButtonMsg =  showSubCommentEditorManager.get('hostTopLevelCommentId') === comment_id
                                &&
                                showSubCommentEditorManager.get('hostTopLevelCommentId') === showSubCommentEditorManager.get('triggerFromCommentId')
                                ?
                                RETRACT_MSG : REPLY_MSG

        const visitor_name = comment.get('comment_author').get('visitor_name')
        const metaColor = colorPicker(visitor_name)
        const featureString = extractFeatureString(visitor_name)


        return (
            <CommentWrapper className={CommonClassNameConstants.COMMON_PADDING_HORIZONTAL}
                            widthOfMainArea={widthOfMainArea}>


                <VisitorInfo>

                    <AvatarWraper>
                        <Avatar className={CommonClassNameConstants.FLEX_ROW_CENTER} metaColor={metaColor}>
                            {featureString}
                        </Avatar>
                    </AvatarWraper>

                    <Name>
                        {comment.get('comment_author').get('visitor_name')}
                    </Name>

                </VisitorInfo>

                <Gap/>

                <MultiContent>

                    <Content>
                        {comment.get('comment_content')}
                    </Content>

                    <OperationBar  className={CommonClassNameConstants.FONT_DARK }>
                        {GetDateDiff(comment.get('comment_releaseTime'))}
                        &nbsp;|&nbsp;
                        <span className={CommonClassNameConstants.CLICKABLE}
                              onClick={() => {clickReplyHandler(comment_id)}}>
                            <i className={replyButtonIconClassName}/>&nbsp;
                            {
                                isMobile && replyButtonMsg
                            }
                        </span>
                    </OperationBar>

                    {
                        subCommentList.map((item) => {
                            if(item.get('comment_referComment').get('comment_id').toString() === comment_id.toString())
                                return (
                                    <div key={item.get('comment_id')}
                                         className={CommonClassNameConstants.SLIDE_UP_FAST}>
                                        <GapH/>
                                        <SubComment comment={item}/>
                                    </div>

                                )
                            return null
                        })
                    }

                    {
                        comment.get('comment_haveSubComment') && currentPage !== maxPage &&
                        <Fragment>
                            <GapH/>
                            <ForMore isLoading={isLoadingMoreSubComment}
                                     noMore={currentPage === maxPage}
                                     clickHandler={getMoreSubCommentListData}
                                     height={60}
                                     forMoreText='加载更多'
                                     fontSize='0.9rem'
                                     meta={[comment_id,
                                         pageScale,
                                         maxPage,
                                         this]}/>
                        </Fragment>

                    }


                    {
                        showSubCommentEditorManager.get('hostTopLevelCommentId') === comment_id
                        &&
                        <CSSTransition in={showSubCommentEditorManager.get('hostTopLevelCommentId') === comment_id}
                                       timeout={400}
                                       classNames={CommonClassNameConstants.SLIDE_UP_CSSTRANSITION}
                                       appear={true}
                                       unmountOnExit>
                            <div>
                                <GapH/>
                                <SubCommentEditor article_id={comment.get('comment_hostArticle').get('article_id')}
                                                  comment_referComment={comment}/>
                            </div>
                        </CSSTransition>
                    }

                </MultiContent>

            </CommentWrapper>
        );
    }

     redirectToVisitorSite() {
         window.open('http://' + this.props.comment.get('comment_author').get('visitor_siteAddress'))
    }

    componentDidMount(){
        const comment_id = this.props.comment.get('comment_id').toString()

        this.props.comment.get('comment_haveSubComment') === true
        &&
        !this.props.subCommentList.some((item) => {
            return item.get('comment_referComment').get('comment_id').toString() === comment_id
        })
        &&
        this.props.getSubCommentListData(comment_id, 0, this.props.pageScale)
    }
}



const mapState = (state) => {
    return  {
        isMobile: state.get('rootState').get('isMobile'),
        widthOfMainArea: state.get('rootState').get('basicUIFeatures').get('widthOfMainArea'),
        colorPicker: state.get('comment').get('colorPicker'),
        extractFeatureString: state.get('comment').get('extractFeatureString'),
        subCommentMaxPageMananger: state.get('subComment').get('subCommentMaxPageMananger'),
        subCommentList: state.get('subComment').get('subCommentList'),
        pageScale: state.get('subComment').get('pageScale'),
        showSubCommentEditorManager: state.get('commentEditor').get('showSubCommentEditorManager'),
        isLoadingMoreSubComment: state.get('subComment').get('isLoadingMoreSubComment')
    }
}

const mapActions = (dispatch) => ({
    getSubCommentListData(comment_id, startIndex, pageScale){
        const value = {
            comment_id: comment_id,
            startIndex: startIndex,
            pageScale: pageScale
        }
        const getSubCommentListDataAction = createGetSubCommentListDataAction(value)
        dispatch(getSubCommentListDataAction)
    },
    getMoreSubCommentListData(comment_id,
                              pageScale,
                              maxPage,
                              _this){
        _this.setState({
            startIndex:_this.state.startIndex + pageScale,
            currentPage:_this.state.currentPage + 1
        })
        _this.props.getSubCommentListData(comment_id, _this.state.startIndex + pageScale, pageScale)
    },
    clickReplyHandler(comment_id) {
        const value = {
            hostTopLevelCommentId: comment_id,
            triggerFromCommentId: comment_id
        }
        const appointShowSubCommentEditorManagerAction = createAppointShowSubCommentEditorManagerAction(value)
        dispatch(appointShowSubCommentEditorManagerAction)
    }
})


export { mapActions }


export default connect(mapState, mapActions)(Comment)