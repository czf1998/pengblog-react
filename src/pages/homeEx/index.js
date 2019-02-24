import React, {PureComponent, Fragment} from 'react'
import { connect } from 'react-redux'
import {Route, withRouter} from 'react-router-dom'
import {ArticleListWrapper, ArticleDetailWrapper,ArticleDetailFixer} from './style'
import ArticleList from '../home'
import ArticleDetail from '../articlePage'

class HomeEX extends PureComponent {

    render() {

        const {browser} = this.props

        return (
            <Fragment>
                <ArticleListWrapper browser={browser}>
                    <ArticleList/>
                </ArticleListWrapper>

                <ArticleDetailWrapper>
                    <ArticleDetailFixer>
                        <Route path="/home/article/:article_id" component={ArticleDetail}/>
                    </ArticleDetailFixer>
                </ArticleDetailWrapper>
            </Fragment>
        )
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

}

const mapState = (state) => ({
        browser: state.get('rootState').get('browser'),

    })

const mapActions = (dispatch) => {
    return {

    }
}

export default connect(mapState, mapActions)(withRouter(HomeEX))
