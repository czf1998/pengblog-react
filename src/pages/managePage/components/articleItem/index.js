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



class ArticleItem extends PureComponent {

    constructor(props){
        super(props)
        this.state = {
            isBeingHover: false
        }
        this.mouseBehaviourHandler = this.mouseBehaviourHandler.bind(this)
    }

    render() {

        const {article,goTo,browser,isMultipleSelecting,articleListBeingSelected,checkBoxSelecter} = this.props

        const isSelected = articleListBeingSelected.some((item) => {
            return item === article.get('article_id')
        })

        const {isBeingHover} = this.state

        const article_id = article.get('article_id')

        return (
            <ArticleItemWrapper isMultipleSelecting={isMultipleSelecting}
                                browser={browser}
                                onMouseEnter={() => {this.mouseBehaviourHandler(true)}}
                                onMouseLeave={() => {this.mouseBehaviourHandler(false)}}>
                {
                    isMultipleSelecting &&
                    <CheckBoxWrapper>
                        <CheckBox isSelected={isSelected} selecter={(flag) => {checkBoxSelecter(article_id, flag)}}/>
                    </CheckBoxWrapper>
                }


                <ArticleTitle isBeingHover={isBeingHover}>
                    <ArticleTitleInner  onClick={() => {goTo('/article/' + article.get('article_id'))}}>
                        {article.get('article_title')}
                    </ArticleTitleInner>
                    {
                        isBeingHover &&
                        <DeleteButton><span className="iconfont">&#xe60c;</span></DeleteButton>
                    }
                </ArticleTitle>

                <ArticleAuthor>
                    {article.get('article_author')}
                </ArticleAuthor>

                <ArticleLabel>
                    {article.get('article_label')}
                </ArticleLabel>

                <ArticleReleaseTime>
                    {DateFormat('yyyy-MM-dd',new Date(article.get('article_releaseTime')))}
                </ArticleReleaseTime>

            </ArticleItemWrapper>
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
    }
})

export default connect(mapState, mapActions)(ArticleItem)
