import React, {PureComponent, Fragment} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { ArticleSummary, ArticleSummaryMobile, Jumbotron, ForMore }from './components'
import { ArticlePageWrapper, ArticleTitle, ArticleMainArea, ArticleMeta, ArticleContent, CommentTitle, GapLine } from './style'
import { actionCreators } from './store'
import { CommonClassNameConstants } from "../../commonStyle";
import Placeholder from './placeholder'
import { Loading } from '../../common'
import { DateFormat } from "../../exJs";
import { Comment } from './components'

class ArticlePage extends PureComponent {

    constructor(props) {
        super(props)
        window.scrollTo(0, 0);
    }


    render() {

        const { article, widthOfMainArea, dataReady, countOfAllComment, commentList, prograssBarManager } = this.props

        return (
                dataReady ?
                <ArticlePageWrapper className={CommonClassNameConstants.FLEX_ROW_COLUMN_CENTER}>
                    <ArticleMainArea widthOfMainArea={widthOfMainArea} className={CommonClassNameConstants.SLIDE_UP_FAST}>
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

                        <ArticleContent className={CommonClassNameConstants.COMMON_PADDING_HORIZONTAL}
                                        dangerouslySetInnerHTML={{__html:article.get('article_content')}}>
                        </ArticleContent>

                        <ArticleMeta className={CommonClassNameConstants.COMMON_PADDING +
                                     CommonClassNameConstants.FONT_DARK}>
                            发布于:&nbsp;
                            <span>
                                    { DateFormat('yyyy-MM-dd', new Date(article.get('article_releaseTime'))) }
                            </span>
                        </ArticleMeta>

                        <CommentTitle className={CommonClassNameConstants.COMMON_PADDING}>
                            留言&nbsp;
                            <span className={CommonClassNameConstants.FONT_MIDDLE +
                                             CommonClassNameConstants.FONT_DARK}>
                                ({countOfAllComment})
                            </span>
                        </CommentTitle>

                        {

                            commentList.map((item, index) => {
                                return (
                                    <Fragment key={item.get('comment_id')}>
                                        <GapLine/>
                                        <Comment comment={item}/>
                                    </Fragment>
                                )
                            })
                        }

                    </ArticleMainArea>
                    {
                        article.get('article_id') && commentList.length !== 0 && prograssBarManager.get('prograssBarGoToTheEnd')(prograssBarManager.get('prograssTimer'))
                    }
                </ArticlePageWrapper>
                :
                <Loading/>
        )
    }

    componentDidMount() {
        /*读取缓存*/
        if(this.props.cacheArticle && (this.props.cacheArticle.get('article_id') == this.props.match.params.article_id)){
            this.props.loadArticleCache()
            return
        }

        this.props.getArticleData(this.props.match.params.article_id)
        this.props.getCommentListData(this.props.match.params.article_id, this.props.startIndex, this.props.pageScale)
    }

    componentWillUnmount() {
        this.props.resetStore()
    }
}



const mapState = (state) => ({
        cacheArticle: state.get('articlePage').get('cache').get('article'),
        article: state.get('articlePage').get('article'),
        widthOfMainArea: state.get('rootState').get('basicUIFeatures').get('widthOfMainArea'),
        dataReady: state.get('articlePage').get('dataReady'),
        countOfAllComment: state.get('articlePage').get('countOfAllComment'),
        startIndex: state.get('articlePage').get('startIndex'),
        pageScale: state.get('articlePage').get('pageScale'),
        commentList: state.get('articlePage').get('commentList'),
        prograssBarManager: state.get('prograssBar').get('prograssBarManager')
    })

const mapActions = (dispatch) => {
    return {
        getArticleData(article_id) {
            let value = {
                article_id: article_id
            }
            const action = actionCreators.createGetArticlePageDataAction(value)
            dispatch(action)
        },
        getCommentListData(article_id, startIndex, pageScale) {
            let value = {
                article_id: article_id,
                startIndex: startIndex,
                pageScale: pageScale
            }
            const action = actionCreators.createGetCommentListDataAction(value)
            dispatch(action)
        },
        resetStore() {
            const action = actionCreators.createResetArticlePageStoreAction()
            dispatch(action)
        },
        loadArticleCache() {
            const action = actionCreators.createLoadArticleCacheAction()
            dispatch(action)
        }
    }
}



export default connect(mapState, mapActions)(withRouter(ArticlePage))
