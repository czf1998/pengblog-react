import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import {ArticleDetailWrapper,ArticleDetailFixer} from './style'
import ArticleDetail from '../articlePage'

class ArticlePageEX extends PureComponent {

    render() {


        return (
            <ArticleDetailWrapper>
                <ArticleDetailFixer>
                    <ArticleDetail/>
                </ArticleDetailFixer>
            </ArticleDetailWrapper>
        )
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

}

const mapState = (state) => ({

    })

const mapActions = (dispatch) => {
    return {

    }
}

export default connect(mapState, mapActions)(withRouter(ArticlePageEX))
