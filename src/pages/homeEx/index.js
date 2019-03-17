import React, {PureComponent, Fragment} from 'react'
import { connect } from 'react-redux'
import {Route, withRouter} from 'react-router-dom'
import {ScrollToThePositionOnMount} from '../../common'
import {HomeEXWrapper,
        ArticleListWrapper,
        ArticleDetailWrapper,
        ArticleDetailFixer,
        ThemeJumbotronWrapper} from './style'
import ArticleList from '../home'
import ArticleDetail from '../articlePage/loadable'
import {ThemeJumbotron} from './components'
import {FADE_IN} from "../../commonStyle/commonClassNameConstant"

class HomeEX extends PureComponent {



    render() {

        const {browser,isMobile,hasBeenMountOnce,heightOfBrowser} = this.props

        const themeJumbotronClassName = hasBeenMountOnce ? '' : FADE_IN

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
                    <ThemeJumbotronWrapper  className={themeJumbotronClassName}>
                            <Route path="/home" exact component={ThemeJumbotron} />
                    </ThemeJumbotronWrapper>
                }

                <ScrollToThePositionOnMount/>

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
        isMobile: state.get('rootState').get('isMobile'),
        hasBeenMountOnce: state.get('home').get('hasBeenMountOnce'),
        heightOfBrowser: state.get('rootState').get('heightOfBrowser')
    })

const mapActions = (dispatch) => {
    return {

    }
}

export default connect(mapState, mapActions)(withRouter(HomeEX))
