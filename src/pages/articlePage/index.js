import React, {PureComponent, Fragment} from 'react'
import { connect } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { ArticleSummary, ArticleSummaryMobile, Jumbotron, ForMore }from './components'
import { } from './style'
import { actionCreators } from './store'
import { CommonClassNameConstants } from "../../commonStyle";

class ArticlePage extends PureComponent {

    constructor(props) {
        super(props)
    }


    render() {

        const { article } = this.props
        return (

            <div>{ article.get('article_title') }</div>
        )
    }

    componentDidMount() {
        this.props.getData(this.props.params.article_id)
    }

}



const mapState = (state) => ({
        article: state.get('articlePage').get('article')
    })

const mapActions = (dispatch) => {
    return {
        getData(article_id) {
            let value = {
                article_id: article_id
            }
            const action = actionCreators.createGetArticlePageDataAction(value)
            dispatch(action)
        }
    }
}



export default connect(mapState, mapActions)(ArticlePage)
