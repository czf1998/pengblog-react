import React, {PureComponent, Fragment} from 'react'
import { connect } from 'react-redux'
import {Route, withRouter} from 'react-router-dom'
import {HomeEXWrapper,ArticleListWrapper, ArticleDetailWrapper,ArticleDetailFixer,ThemeJumbotronWrapper} from './style'
import ArticleList from '../home'
import ArticleDetail from '../articlePage'
import {ThemeJumbotron} from './components'

class HomeEX extends PureComponent {

    render() {

        const {browser,isMobile} = this.props

        return (
            <HomeEXWrapper>
                <ArticleListWrapper browser={browser}>
                    <ArticleList/>
                </ArticleListWrapper>

                <ArticleDetailWrapper>
                    <ArticleDetailFixer>
                        <Route path="/home/article/:article_id" component={ArticleDetail}/>
                    </ArticleDetailFixer>
                </ArticleDetailWrapper>

                {
                    !isMobile &&
                    <ThemeJumbotronWrapper>
                        <Route path="/home" exact component={ThemeJumbotron}/>
                    </ThemeJumbotronWrapper>
                }

            </HomeEXWrapper>
        )
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

}

const mapState = (state) => ({
        browser: state.get('rootState').get('browser'),
        isMobile: state.get('rootState').get('isMobile')
    })

const mapActions = (dispatch) => {
    return {

    }
}

export default connect(mapState, mapActions)(withRouter(HomeEX))
