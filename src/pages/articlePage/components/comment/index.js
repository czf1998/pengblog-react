import React, {Fragment, PureComponent} from 'react'
import { connect } from 'react-redux'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {CommentWrapper,ContentWrapper,
        Content,ShowAll,
        VisitorInfo,
        AvatarWraper,
        Name,
        Gap,
        MultiContent,
        OperationBar,
        Avatar,
        GapH,
        ReplyButton,
        DeleteButton,SubCommentEditorWrapper,BanButton,LiftedButton } from './style'
import { CommonClassNameConstants } from '../../../../commonStyle'
import { GetDateDiff } from '../../../../exJs'
import SubComment from '../subComment'
import {SubCommentEditor} from '../commentEditor'
import {createGetSubCommentListDataAction,
        createAppointShowSubCommentEditorManagerAction,
        createDeleteCommentFromArticlePageAction,
        createBanIPAction,createLiftedIPAction } from './store'
import {ForMore} from "../../../../common";
import {LoadingIcon} from "../../../managePage/components/freshComments/components/freshCommentItem/style";
import loadingSpin from "../../../../common/loading/svg/loading-spin.svg";
import {SLIDE_FROM_LEFT_CSSTRANSITION} from "../../../../commonStyle/commonClassNameConstant";
import {
    createAppointModalMsgAction,
    createTriggerModalIsLoadingAction,
    createTriggerShowModalAction
} from "../../../../common/modal/store";

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
            currentPage: 1,
            isBeenDeleting: false,
            heightOfCommentContent:0,
            showAll: false
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
                isLoadingMoreSubComment,
                alreadyLoggedIn,
                tryToDeleteThisComment,
                tryToBanThisIP,tryToLiftedThisIP} = this.props

        const comment_id = comment.get('comment_id')

        const comment_ip = comment.get('comment_ip') ? comment.get('comment_ip').get('ip_ip') : undefined

        const isBanned = comment.get('comment_ip') ? comment.get('comment_ip').get('ip_isBanned') : false

        const {currentPage,isBeenDeleting,heightOfCommentContent,showAll} = this.state

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

        let platformIconClasName = undefined

        if(comment.get('comment_platform') === undefined){

        } else if(comment.get('comment_platform').toLowerCase().indexOf('win') !== -1){
            platformIconClasName = 'fa fa-windows'
        }else if(comment.get('comment_platform').toLowerCase().indexOf('ios') !== -1){
            platformIconClasName = 'fa fa-apple'
        }else if(comment.get('comment_platform').toLowerCase().indexOf('ipad') !== -1){
            platformIconClasName = 'fa fa-apple'
        }else if(comment.get('comment_platform').toLowerCase().indexOf('iphone') !== -1){
            platformIconClasName = 'fa fa-apple'
        }else if(comment.get('comment_platform').toLowerCase().indexOf('mac') !== -1){
            platformIconClasName = 'fa fa-apple'
        }else if(comment.get('comment_platform').toLowerCase().indexOf('arm') !== -1){
            platformIconClasName = 'fa fa-android'
        }else if(comment.get('comment_platform').toLowerCase().indexOf('linux') !== -1){
            platformIconClasName = 'fa fa-linux'
        }else if(comment.get('comment_platform').toLowerCase().indexOf('android') !== -1){
            platformIconClasName = 'fa fa-android'
        }

        const showSubCommentEditor = showSubCommentEditorManager.get('hostTopLevelCommentId') === comment_id

        return (
            <CommentWrapper isBeenDeleting={isBeenDeleting} isBanned={isBanned}
                            widthOfMainArea={widthOfMainArea}
                            ref="topLevelComment">


                <VisitorInfo>
                    <AvatarWraper>
                        <Avatar className={CommonClassNameConstants.FLEX_ROW_CENTER} metaColor={metaColor}>
                            {featureString}
                        </Avatar>
                    </AvatarWraper>
                    <Name isBanned={isBanned}>
                        {comment.get('comment_author').get('visitor_name')}
                    </Name>
                </VisitorInfo>


                <Gap/>


                <MultiContent>
                    <ContentWrapper showAll={showAll} heightOfCommentContent={heightOfCommentContent}>
                        <Content isBanned={isBanned} id={'comment_' + comment.get('comment_id')}>
                            {heightOfCommentContent} {comment.get('comment_content')}
                        </Content>
                    </ContentWrapper>

                    <OperationBar  className={CommonClassNameConstants.FONT_DARK }>

                        {
                            heightOfCommentContent > 210 && !showAll &&
                            <Fragment>
                                <ShowAll onClick={() => {this.showAll(this)}}>显示全部</ShowAll> &nbsp;|&nbsp;
                            </Fragment>
                        }

                        {
                            platformIconClasName &&
                            <Fragment>
                                <i className={platformIconClasName}/>
                                &nbsp;|&nbsp;
                            </Fragment>
                        }

                        {GetDateDiff(comment.get('comment_releaseTime'))}

                        &nbsp;|&nbsp;

                        <ReplyButton onClick={() => {clickReplyHandler(comment_id)}}>
                            <i className={replyButtonIconClassName}/>&nbsp;
                            {
                                isMobile && replyButtonMsg
                            }
                        </ReplyButton>

                        {
                            alreadyLoggedIn &&
                            <Fragment>
                                &nbsp;|&nbsp;
                                <DeleteButton onClick={() => {tryToDeleteThisComment(comment_id,comment.get('comment_hostArticle').get('article_id'),this)}}
                                              className="fa fa-trash-o"/>

                                &nbsp;|&nbsp;
                                {
                                    isBanned ?
                                        <LiftedButton onClick={() => {tryToLiftedThisIP(comment_id, comment_ip, isBanned)}}>lifted</LiftedButton>
                                        :
                                        <BanButton onClick={() => {tryToBanThisIP(comment_id, comment_ip, isBanned)}}
                                                   className="fa fa-ban"/>
                                }

                            </Fragment>
                        }
                    </OperationBar>

                    <TransitionGroup>
                    {
                        subCommentList.map((item) => {
                            if(item.get('comment_referComment').get('comment_id').toString() === comment_id.toString())
                                return (
                                    <CSSTransition key={item.get('comment_id')}
                                                   timeout={400}
                                                   classNames={SLIDE_FROM_LEFT_CSSTRANSITION}>
                                        <div>
                                            <GapH/>
                                            <SubComment comment={item}/>
                                        </div>
                                    </CSSTransition>
                                )
                            return null
                        })
                    }
                    </TransitionGroup>

                    {
                        comment.get('comment_haveSubComment') && currentPage !== maxPage &&
                        <Fragment>
                            <GapH/>
                            <ForMore isLoading={isLoadingMoreSubComment}
                                     noMore={currentPage >= maxPage}
                                     clickHandler={() => {getMoreSubCommentListData(comment_id,
                                         pageScale,
                                         maxPage,
                                         this)}}
                                     height={60}
                                     forMoreText='加载更多'
                                     fontSize='0.9rem'/>
                        </Fragment>

                    }


                    {
                        showSubCommentEditor && <GapH/>

                    }
                    <SubCommentEditorWrapper showSubCommentEditor={showSubCommentEditor}>
                        <SubCommentEditor article_id={comment.get('comment_hostArticle').get('article_id')}
                                          comment_referComment={comment}/>
                    </SubCommentEditorWrapper>



                </MultiContent>

                {
                    isBeenDeleting &&
                    <LoadingIcon src={loadingSpin} alt="Loading icon"/>

                }

            </CommentWrapper>
        );
    }

     redirectToVisitorSite() {
         window.open('http://' + this.props.comment.get('comment_author').get('visitor_siteAddress'))
    }

    componentDidMount(){

        recordHeightOfSubCommentEditor()

        recordHeightOfCommentContent('comment_' + this.props.comment.get('comment_id'), this)

        const comment_id = this.props.comment.get('comment_id').toString()

        //获取subComment数据
        this.props.comment.get('comment_haveSubComment') === true
        &&
        !this.props.subCommentList.some((item) => {
            return item.get('comment_referComment').get('comment_id').toString() === comment_id
        })
        &&
        this.props.getSubCommentListData(comment_id, 0, this.props.pageScale)

        //当有subComment被删除时，更新此条目的startIndex
        this.refs.topLevelComment.addEventListener('deleteSubComment', () => {
            this.setState({
                startIndex: this.state.startIndex - 1
            })
        })
    }

    showAll(_this){
        _this.setState({
            showAll: true
        })
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
        isLoadingMoreSubComment: state.get('subComment').get('isLoadingMoreSubComment'),
        alreadyLoggedIn: state.get('loginPage').get('alreadyLoggedIn')
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
    },
    tryToDeleteThisComment(comment_id, article_id, _this){

        _this.setState({
            isBeenDeleting: true
        })

        const value = {
            comment_id: comment_id,
            article_id: article_id
        }
        const deleteCommentAction = createDeleteCommentFromArticlePageAction(value)
        dispatch(deleteCommentAction)

    },

    tryToBanThisIP(comment_id, ip, isBanned) {

        if(isBanned){
            return
        }

        const  banIPPostHandler = () => {

            //trigger loading状态
            const triggerModalIsLoadingAction = createTriggerModalIsLoadingAction(true)
            dispatch(triggerModalIsLoadingAction)

            //向saga发送请求
            const value = {
                ip: ip,
                comment_id: comment_id
            }
            const action = createBanIPAction(value)

            dispatch(action)
        }

        const value = {
            modalTitle: '提示',
            modalContent: '你正在尝试封禁ip: ' + ip,
            postProcessor: banIPPostHandler
        }

        const appointModalMsgAction = createAppointModalMsgAction(value)
        dispatch(appointModalMsgAction)

        const triggerShowModalAction = createTriggerShowModalAction(true)
        dispatch(triggerShowModalAction)

    },

    tryToLiftedThisIP(comment_id, ip, isBanned) {

        if(!isBanned){
            return
        }

        const  liftedIPPostHandler = () => {

            //trigger loading状态
            const triggerModalIsLoadingAction = createTriggerModalIsLoadingAction(true)
            dispatch(triggerModalIsLoadingAction)

            //向saga发送请求
            const value = {
                ip: ip,
                comment_id: comment_id
            }
            const action = createLiftedIPAction(value)

            dispatch(action)
        }

        const value = {
            modalTitle: '提示',
            modalContent: '你正在尝试解封ip: ' + ip,
            postProcessor: liftedIPPostHandler
        }

        const appointModalMsgAction = createAppointModalMsgAction(value)
        dispatch(appointModalMsgAction)

        const triggerShowModalAction = createTriggerShowModalAction(true)
        dispatch(triggerShowModalAction)

    },

})


export { mapActions }


export default connect(mapState, mapActions)(Comment)



const recordHeightOfSubCommentEditor = () => {

    window.heightOfSubCommentEditor = parseInt(window.getComputedStyle(document.getElementsByClassName('subCommentEditor')[0]).height)

}

const recordHeightOfCommentContent = (id,_this) => {
    const heightOfCommentContent = parseInt(window.getComputedStyle(document.getElementById(id)).height)
    _this.setState({
        heightOfCommentContent: heightOfCommentContent
    })
}