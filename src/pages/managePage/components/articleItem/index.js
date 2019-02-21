import React, {Fragment, PureComponent} from 'react'
import { connect } from 'react-redux'
import {} from './style'
import {} from './store'
import {
    ArticleAuthor,
    ArticleItemWrapper,
    ArticleLabel,
    ArticleReleaseTime,
    ArticleTitle,
    DeleteButton
} from "../../style";
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

        const {article} = this.props

        return (
            <ArticleItemWrapper isBeingHover={this.state.isBeingHover}
                                onMouseEnter={() => {this.mouseBehaviourHandler(true)}}
                                onMouseLeave={() => {this.mouseBehaviourHandler(false)}}>

                <ArticleTitle>
                    {article.get('article_title')}
                    {
                        this.state.isBeingHover &&
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

    }
}

const mapActions = (dispatch) => ({

})

export default connect(mapState, mapActions)(ArticleItem)
