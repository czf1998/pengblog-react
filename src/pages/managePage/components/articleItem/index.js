import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {createAppointArticleBeingSelectedInManagePage,
        createDeleteArticleAction} from './store'
import {
    ArticleAuthor,
    ArticleItemWrapper,
    ArticleLabel,
    ArticleReleaseTime,
    ArticleTitle,
    DeleteButton,
    ArticleTitleInner,
    CheckBoxWrapper
} from "./style";
import {DateFormat} from "../../../../exJs";
import {CheckBox} from '../../../../common'
import {createAppointModalMsgAction,
        createTriggerShowModalAction,
        createTriggerModalIsLoadingAction} from "../../../../common/modal/store";
import {COMMON_MODAL} from "../../../../common/modal/store/reducer";
import {SLIDE_UP_FAST} from "../../../../commonStyle/commonClassNameConstant";



class ArticleItem extends PureComponent {

    constructor(props){
        super(props)
        this.state = {
            isBeingHover: false,
            isDeleted:false
        }
        this.mouseBehaviourHandler = this.mouseBehaviourHandler.bind(this)
    }

    render() {

        const {article,
                browser,
                isMultipleSelecting,
                articleListBeingSelected,
                checkBoxSelecter,
                tryToDeleteThisArticle,
                confirmDeletePostProcessor,
                articleHasBeenDeleteList,
                alreadyLoggedIn} = this.props

        const isSelected = articleListBeingSelected.some((item) => {
            return item === article.get('article_id')
        })

        let {isBeingHover,isDeleted} = this.state

        isDeleted = isDeleted || articleHasBeenDeleteList.some((item) => {
            return item === article.get('article_id')
        })

        const article_id = article.get('article_id')
        const article_title = article.get('article_title')
        const article_author = article.get('article_author')
        const article_label = article.get('article_label')
        const article_releaseTime = article.get('article_releaseTime')

        return (
            <ArticleItemWrapper isDeleted={isDeleted} className={SLIDE_UP_FAST}
                                isMultipleSelecting={isMultipleSelecting}
                                browser={browser}
                                onMouseEnter={() => {this.mouseBehaviourHandler(true,browser)}}
                                onMouseLeave={() => {this.mouseBehaviourHandler(false,browser)}}>

                {
                    isMultipleSelecting &&
                    <CheckBoxWrapper>
                        <CheckBox isSelected={isSelected}
                                  selecter={(flag) => {checkBoxSelecter(article_id, flag)}}/>
                    </CheckBoxWrapper>
                }

                <ArticleTitle isBeingHover={isBeingHover}>

                    <Link to={'/article/' + article_id}>
                        <ArticleTitleInner browser={browser}>
                            {article_title}
                        </ArticleTitleInner>
                    </Link>




                    {
                        (isBeingHover || browser === 'Safari') && alreadyLoggedIn &&
                        <DeleteButton browser={browser}>
                            <i className="fa fa-trash-o"
                                  style={{cursor: 'pointer'}}
                                  onClick={() => {tryToDeleteThisArticle(article_id,article_title,confirmDeletePostProcessor,this)}}/>
                        </DeleteButton>
                    }

                </ArticleTitle>

                <ArticleAuthor>
                    {article_author}
                </ArticleAuthor>

                <ArticleLabel>
                    {article_label}
                </ArticleLabel>

                <ArticleReleaseTime>
                    {DateFormat('yyyy-MM-dd',new Date(article_releaseTime))}
                </ArticleReleaseTime>

            </ArticleItemWrapper>
        );
    }

    componentDidMount(){

    }

    mouseBehaviourHandler(flag,browser){
        if(browser === 'Safari'){
            return
        }
       this.setState({
           isBeingHover: flag
       })
    }
}



const mapState = (state) => {
    return  {
        browser: state.get('rootState').get('browser'),
        articleListBeingSelected: state.get('managePage').get('articleListBeingSelected'),
        articleHasBeenDeleteList: state.get('managePage').get('articleHasBeenDeleteList'),
        alreadyLoggedIn: state.get('loginPage').get('alreadyLoggedIn')
    }
}

const mapActions = (dispatch) => ({
    checkBoxSelecter(article_id, flag){
        const value = {
            article_id: article_id,
            isSelected: flag
        }
        const action = createAppointArticleBeingSelectedInManagePage(value)
        dispatch(action)
    },
    tryToDeleteThisArticle(article_id,article_title,confirmDeletePostProcessor,_this){
        const appointModalMsgValue = {
            modalTitle: '提示',
            modalContent: '你正在试图删除标题为“' + article_title + '”的文章，这个操作将不可恢复。',
            postProcessor: () => {
                confirmDeletePostProcessor(article_id,_this)
            },
            context: COMMON_MODAL
        }

        const appointModalMsgAction = createAppointModalMsgAction(appointModalMsgValue)
        dispatch(appointModalMsgAction)

        const triggerShowModalAction = createTriggerShowModalAction(true)
        dispatch(triggerShowModalAction)
    },
    confirmDeletePostProcessor(article_id,_this){

        const triggerModalIsLoadingAction = createTriggerModalIsLoadingAction(true)
        dispatch(triggerModalIsLoadingAction)

        const value = {
            article_id: article_id,
            postHandler: () => {
                _this.setState({
                    isDeleted: true
                })
            }
        }

        const deleteArticleAction = createDeleteArticleAction(value)
        dispatch(deleteArticleAction)

    }
 })

export default connect(mapState, mapActions)(ArticleItem)
