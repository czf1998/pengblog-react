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
        LoadingIcon} from './style'
import {createDeleteCommentFromFreshCommentsAction} from './store'
import loadingSpin from "../../../../../../common/loading/svg/loading-spin.svg";

const DELETE_BUTTON_ICON_CLASSNAME = 'fa fa-minus-circle'

class FreshCommentItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }


    render() {

        const {comment,goTo,tryToDeleteThisComment,alreadyLoggedIn} = this.props

        const {isLoading} = this.state

        return (
            <FreshCommentItemWrapper isLoading={isLoading}
                                     onClick={() => {goTo('/article/' + comment.get('comment_hostArticle').get('article_id'))}}>



                <CommentSubject>
                    <Visitor>{comment.get('comment_author').get('visitor_name')}</Visitor>:&nbsp;
                    <Content>{comment.get('comment_content')}</Content>
                </CommentSubject>

                <HostArticle>
                    <HostArticleInner>
                        <Label>[{comment.get('comment_hostArticle').get('article_label')}]</Label>&nbsp;
                        <Title>{comment.get('comment_hostArticle').get('article_title')}</Title>
                    </HostArticleInner>

                </HostArticle>


                {
                    !isLoading && alreadyLoggedIn &&
                    <DeleteButton className={DELETE_BUTTON_ICON_CLASSNAME}
                                  onClick={(e) => {tryToDeleteThisComment(e,comment.get('comment_id'),this)}}/>
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

    }
})

export default connect(mapState, mapActions)(FreshCommentItem)

