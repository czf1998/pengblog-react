import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import {} from './style'
import {createAppointArticleBeingSelectedInManagePage} from './store'
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
import {createAppointModalMsgAction, createTriggerShowModalAction} from "../../../../common/modal/store";
import {SHARE_TO_WECHAT} from "../../../articlePage/components/share";



class ArticleItem extends PureComponent {

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
                browser,
                isMultipleSelecting,
                articleListBeingSelected,
                checkBoxSelecter,
                tryToDeleteThisArticle} = this.props

        const isSelected = articleListBeingSelected.some((item) => {
            return item === article.get('article_id')
        })

        const {isBeingHover} = this.state

        const article_id = article.get('article_id')
        const article_title = article.get('article_title')
        const article_author = article.get('article_author')
        const article_label = article.get('article_label')
        const article_releaseTime = article.get('article_releaseTime')

        return (
            <ArticleItemWrapper isMultipleSelecting={isMultipleSelecting}
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

                    <ArticleTitleInner browser={browser}
                                       onClick={() => {goTo('/article/' + article_id)}}>
                        {article_title}
                    </ArticleTitleInner>



                    {
                        (isBeingHover || browser === 'Safari') &&
                        <DeleteButton browser={browser}>
                            <span className="iconfont"
                                  style={{cursor: 'pointer'}}
                                  onClick={() => {tryToDeleteThisArticle(article_id,article_title)}}>&#xe60c;</span>
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
        goTo: state.get('router').get('goTo'),
        browser: state.get('rootState').get('browser'),
        articleListBeingSelected: state.get('managePage').get('articleListBeingSelected')
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
    tryToDeleteThisArticle(article_id,article_title){
        const appointModalMsgValue = {
            modalTitle: '提示',
            modalContent: '你正在试图删除标题为“' + article_title + '”的文章，这个操作将不可恢复。',
            onlyQrcode: false
        }

        const appointModalMsgAction = createAppointModalMsgAction(appointModalMsgValue)
        dispatch(appointModalMsgAction)

        const triggerShowModalAction = createTriggerShowModalAction(true)
        dispatch(triggerShowModalAction)
    }
})

export default connect(mapState, mapActions)(ArticleItem)
