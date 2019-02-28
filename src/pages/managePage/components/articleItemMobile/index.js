import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import {} from './style'
import {} from './store'
import {ArticleItemMobileWrapper,
        ArticleLabelAndTitle,
        Label,
        Title,
        ArticleAuthorAndReleaseTime,
        Author,
        ReleaseTime,
        DeleteButtonWraper,
        DeleteButton} from "./style";
import {DateFormat} from "../../../../exJs";
import {
    createAppointModalMsgAction,
    createTriggerModalIsLoadingAction,
    createTriggerShowModalAction
} from "../../../../common/modal/store";
import {createDeleteArticleAction} from "../articleItem/store";



class ArticleItemMobile extends PureComponent {

    constructor(props){
        super(props)
        this.state = {
            isBeingHover: false
        }
        this.mouseBehaviourHandler = this.mouseBehaviourHandler.bind(this)
    }

    render() {

        const {article,
                goTo,
                articleHasBeenDeleteList,
                tryToDeleteThisArticle,
                confirmDeletePostProcessor} = this.props

        const isDeleted = articleHasBeenDeleteList.some((item) => {
            return item === article.get('article_id')
        })

        const article_id = article.get('article_id')
        const article_title = article.get('article_title')
        const article_author = article.get('article_author')
        const article_label = article.get('article_label')
        const article_releaseTime = article.get('article_releaseTime')

        return (
            <ArticleItemMobileWrapper isDeleted={isDeleted}
                                      onClick={() => {goTo('/article/' + article_id)}}>

                <ArticleLabelAndTitle>

                    <Label>
                        [{article_label}]
                    </Label>&nbsp;

                    <Title>
                        {article_title}
                    </Title>

                </ArticleLabelAndTitle>

                <ArticleAuthorAndReleaseTime>

                    <Author>
                        by: {article_author}
                    </Author>&nbsp;|&nbsp;

                    <ReleaseTime>
                        {DateFormat('yyyy-MM-dd',new Date(article_releaseTime))}
                    </ReleaseTime>

                </ArticleAuthorAndReleaseTime>

                <DeleteButtonWraper>
                    <DeleteButton className="fa fa-close"
                                  onClick={(e) => {tryToDeleteThisArticle(article_id,
                                                                          article_title,
                                                                          confirmDeletePostProcessor,e)}}/>
                </DeleteButtonWraper>

            </ArticleItemMobileWrapper>
        );
    }

    componentDidMount(){

    }

    mouseBehaviourHandler(flag){
       this.setState({
           isBeingHover: flag
       })
    }
}



const mapState = (state) => {
    return  {
        goTo: state.get('router').get('goTo'),
        browser: state.get('rootState').get('browser'),
        articleHasBeenDeleteList: state.get('managePage').get('articleHasBeenDeleteList')
    }
}

const mapActions = (dispatch) => ({
    tryToDeleteThisArticle(article_id,article_title,confirmDeletePostProcessor,e){
        
        e.stopPropagation()

        const appointModalMsgValue = {
            modalTitle: '提示',
            modalContent: '你正在试图删除标题为“' + article_title + '”的文章，这个操作将不可恢复。',
            onlyQrcode: false,
            postProcessor: () => {confirmDeletePostProcessor(article_id)}
        }

        const appointModalMsgAction = createAppointModalMsgAction(appointModalMsgValue)
        dispatch(appointModalMsgAction)

        const triggerShowModalAction = createTriggerShowModalAction(true)
        dispatch(triggerShowModalAction)
    },
    confirmDeletePostProcessor(article_id){

        const triggerModalIsLoadingAction = createTriggerModalIsLoadingAction(true)
        dispatch(triggerModalIsLoadingAction)

        const deleteArticleAction = createDeleteArticleAction(article_id)
        dispatch(deleteArticleAction)

    }
})

export default connect(mapState, mapActions)(ArticleItemMobile)
