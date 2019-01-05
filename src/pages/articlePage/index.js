import React, {PureComponent, Fragment} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { ArticleSummary, ArticleSummaryMobile, Jumbotron, ForMore }from './components'
import { ArticlePageWrapper, ArticleTitle, ArticleMainArea, ArticleMeta, ArticleContent } from './style'
import { actionCreators } from './store'
import { CommonClassNameConstants } from "../../commonStyle";
import Placeholder from './placeholder'
import { DateFormat } from "../../exJs";

class ArticlePage extends PureComponent {

    constructor(props) {
        super(props)
        window.scrollTo(0, 0);
    }


    render() {

        const { article, widthOfMainArea, dataReady } = this.props

        return (

                <ArticlePageWrapper className={CommonClassNameConstants.FLEX_ROW_COLUMN_CENTER}>
                    <ArticleMainArea widthOfMainArea={widthOfMainArea}>
                        {
                            dataReady ?

                            <div className={CommonClassNameConstants.FADE_IN}>
                                    <ArticleTitle className={CommonClassNameConstants.COMMON_PADDING}>
                                        <h2>{article.get('article_title')}</h2>
                                    </ArticleTitle>

                                    <ArticleMeta className={CommonClassNameConstants.COMMON_PADDING +
                                                 CommonClassNameConstants.FONT_DARK}>
                                        <span className={CommonClassNameConstants.CLICKABLE}>
                                            [{ article.get('article_label') }]
                                        </span>
                                        &nbsp;| 作者:&nbsp;
                                        <span>
                                            { article.get('article_author') }
                                        </span>
                                    </ArticleMeta>

                                    <ArticleContent className={CommonClassNameConstants.COMMON_PADDING}
                                                    dangerouslySetInnerHTML={{__html:article.get('article_content')}}>
                                    </ArticleContent>

                                <ArticleMeta className={CommonClassNameConstants.COMMON_PADDING +
                                             CommonClassNameConstants.FONT_DARK}>
                                    发布于:&nbsp;
                                    <span>
                                            { DateFormat('yyyy-MM-dd', new Date(article.get('article_releaseTime'))) }
                                    </span>
                                </ArticleMeta>
                            </div>
                            :
                            <Placeholder/>
                        }


                    </ArticleMainArea>
                </ArticlePageWrapper>
        )
    }

    componentDidMount() {
        this.props.getData(this.props.match.params.article_id)
    }

    componentWillUnmount() {
        this.props.resetStore()
    }
}



const mapState = (state) => ({
        article: state.get('articlePage').get('article'),
        widthOfMainArea: state.get('rootState').get('basicUIFeatures').get('widthOfMainArea'),
        dataReady: state.get('articlePage').get('dataReady')
    })

const mapActions = (dispatch) => {
    return {
        getData(article_id) {
            let value = {
                article_id: article_id
            }
            const action = actionCreators.createGetArticlePageDataAction(value)
            dispatch(action)
        },
        resetStore() {
            const action = actionCreators.createResetArticlePageStoreAction()
            dispatch(action)
        }
    }
}



export default connect(mapState, mapActions)(withRouter(ArticlePage))
