import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import {FreshCommentItemWrapper,
        DeleteButton,
        CommentSubject,
        Visitor,
        Content,
        HostArticle,
        HostArticleInner,
        Label,
        Title,
        LoadingIcon,OperationColumn,BanButton,LiftedButton} from './style'
import {createDeleteCommentFromFreshCommentsAction} from './store'
import loadingSpin from "../../../../../../common/loading/svg/loading-spin.svg";
import {
    createAppointModalMsgAction,
    createTriggerModalIsLoadingAction,
    createTriggerShowModalAction
} from "../../../../../../common/modal/store";
import {createBanIPAction, createLiftedIPAction} from "../../../../../articlePage/components/comment/store";

const DELETE_BUTTON_ICON_CLASSNAME = 'fa fa-minus-circle'

class FreshCommentItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,

        }
    }


    render() {

        const {comment,goTo,tryToDeleteThisComment,tryToLiftedThisIP,tryToBanThisIP,alreadyLoggedIn} = this.props

        const {isLoading} = this.state

        const comment_ip = comment.get('comment_ip') ? comment.get('comment_ip').get('ip_ip') : undefined

        const isBanned = comment.get('comment_ip') ? comment.get('comment_ip').get('ip_isBanned') : false

        return (
            <FreshCommentItemWrapper isLoading={isLoading} isBanned={isBanned}
                                     onClick={() => {goTo('/article/' + comment.get('comment_hostArticle').get('article_id'))}}>



                <CommentSubject>
                    <Visitor isBanned={isBanned}>{comment.get('comment_author').get('visitor_name')}</Visitor>:&nbsp;
                    <Content isBanned={isBanned}>{comment.get('comment_content')}</Content>
                </CommentSubject>

                <HostArticle>
                    <HostArticleInner>
                        <Label>[{comment.get('comment_hostArticle').get('article_label')}]</Label>&nbsp;
                        <Title>{comment.get('comment_hostArticle').get('article_title')}</Title>
                    </HostArticleInner>

                </HostArticle>

                {
                    alreadyLoggedIn &&
                    <OperationColumn>
                        <DeleteButton className={DELETE_BUTTON_ICON_CLASSNAME}
                                      onClick={(e) => {tryToDeleteThisComment(e,comment.get('comment_id'),this)}}/>

                        {
                            isBanned ?
                                <LiftedButton onClick={(e) => {tryToLiftedThisIP(e,comment.get('comment_id'),comment_ip)}}>lifted</LiftedButton>
                                :
                                <BanButton className="fa fa-ban"
                                           onClick={(e) => {tryToBanThisIP(e,comment.get('comment_id'),comment_ip)}}/>
                        }

                    </OperationColumn>
                }


                {
                    isLoading &&
                    <LoadingIcon src={loadingSpin} alt="Loading icon"/>
                }

            </FreshCommentItemWrapper>
        );
    }

    componentDidMount(){

    }

    componentDidUpdate(preProps){

    }
}



const mapState = (state) => {
    return  {
        goTo: state.get('router').get('goTo'),
        alreadyLoggedIn: state.get('loginPage').get('alreadyLoggedIn')
    }
}

const mapActions = (dispatch) => ({
    tryToDeleteThisComment(e, comment_id, _this){
        e.stopPropagation()

        _this.setState({
            isLoading: true
        })

        const deleteCommentAction = createDeleteCommentFromFreshCommentsAction(comment_id)
        dispatch(deleteCommentAction)

    },
    tryToBanThisIP(e, comment_id, ip){

        e.stopPropagation()

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
    tryToLiftedThisIP(e, comment_id, ip){

        e.stopPropagation()

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

    }

})

export default connect(mapState, mapActions)(FreshCommentItem)

