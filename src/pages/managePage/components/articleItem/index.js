import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import {} from './style'
import {} from './store'
import {
    ArticleAuthor,
    ArticleItemWrapper,
    ArticleLabel,
    ArticleReleaseTime,
    ArticleTitle,
    DeleteButton,
    ArticleTitleInner
} from "./style";
import {DateFormat} from "../../../../exJs";



class ArticleItem extends PureComponent {

    constructor(props){
        super(props)
        this.state = {
            isBeingHover: false
        }
        this.mouseBehaviourHandler = this.mouseBehaviourHandler.bind(this)
    }

    render() {

        const {article,goTo,browser} = this.props

        const {isBeingHover} = this.state

        return (
            <ArticleItemWrapper browser={browser}
                                onMouseEnter={() => {this.mouseBehaviourHandler(true)}}
                                onMouseLeave={() => {this.mouseBehaviourHandler(false)}}>

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
        browser: state.get('rootState').get('browser')
    }
}

const mapActions = (dispatch) => ({

})

export default connect(mapState, mapActions)(ArticleItem)
