import React, {PureComponent, Fragment} from 'react'
import { connect } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { ArticleSummary, ArticleSummaryMobile, Jumbotron, ForMore }from './components'
import { HomeWrapper, Gap } from './style'
import { actionCreators } from './store'
import { CommonClassNameConstants } from "../../commonStyle";

class Article extends PureComponent {

    constructor(props) {
        super(props)
    }


    render() {





        return (

            <div>{console.log(this.props)}article</div>
        )
    }

    componentDidMount() {
        console.log(this)
        //this.props.getData(this.props.match.params.article_id)
    }

}



const mapState = (state) => ({

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



export default connect(mapState, mapActions)(Article)
