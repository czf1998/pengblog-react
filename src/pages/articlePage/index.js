import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ArticlePageWrapper,
         ArticleTitleImage,
         ArticleTitle,
         ArticleMainArea,
         ArticleMeta,
         ArticleContent,
         CommentTitle,LoadingWrapper } from './style'
import {createGetArticlePageDataAction,
        createGetCommentListDataAction,
        createLoadArticleCacheAction,
        createPushPrograssToEndAction,
        createRecordScrollTopOfArticlePageAction,
        createResetArticlePageStoreAction,
        createAppointReferCommentAction,
        createResetCommentEditorAction} from './store'
import { CommonClassNameConstants } from "../../commonStyle"
import { Loading, ForMore, ScrollToThePositionOnMount, GapLine } from '../../common'
import { DateFormat } from "../../exJs"
import { Comment, TopLevelCommentEditor,Share } from './components'
import {createAppointSizeOfTitleImageFrameAction} from "../articleEditPage/components/titleImage/store";

class ArticlePage extends PureComponent {

    render() {

        const { article,
                widthOfMainArea,
                dataReady,
                countOfAllComment,
                commentList,
                isLoadingMoreComment,
                startIndex,
                pageScale,
                maxPage,
                currentPage,
                scrollPosition,
                referComment,
                titleImageSize,heightOfBrowser } = this.props

        const { article_id } = this.props.match.params

        return (
                    dataReady ?
                    <ArticlePageWrapper className={CommonClassNameConstants.FLEX_ROW_COLUMN_CENTER}>
                        <ArticleMainArea widthOfMainArea={widthOfMainArea} className={CommonClassNameConstants.SLIDE_UP_FAST}>

                            <ArticleTitleImage titleImageUrl={article.get('article_titleImageUrl')} titleImageSize={titleImageSize}/>

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

                            <Share/>

                            <CommentTitle className={CommonClassNameConstants.COMMON_PADDING}>
                                <span className="iconfont" style={{fontSize:'1.6rem'}}>&#xe625;</span>&nbsp;{countOfAllComment}条留言
                            </CommentTitle>
                            {
                                commentList.map((item) => {
                                    return (
                                        <div key={item.get('comment_id')}
                                             className={CommonClassNameConstants.SLIDE_UP_FAST}>
                                            <GapLine/>
                                            <Comment comment={item} clickReferHandler={() => {referComment(item)}}/>
                                        </div>
                                    )
                                })
                            }
                            <GapLine/>
                            <ForMore isLoading={isLoadingMoreComment}
                                     noMore={currentPage === maxPage}
                                     clickHandler={this.props.getMoreCommentListData.bind(this)}
                                     meta={[article_id,
                                         startIndex,
                                         pageScale,
                                         maxPage,
                                         currentPage]}/>

                        </ArticleMainArea>

                        <TopLevelCommentEditor article_id={article_id}/>

                        <ScrollToThePositionOnMount scrollPosition={scrollPosition}/>

                    </ArticlePageWrapper>
                    :
                   <LoadingWrapper heightOfBrowser={heightOfBrowser}>
                       <Loading/>
                   </LoadingWrapper>
                )
    }


    componentDidMount() {
        /*读取缓存*/
        /*if(this.props.cacheArticle && (parseInt(this.props.cacheArticle.get('article_id')) === parseInt(this.props.match.params.article_id))){
            this.props.loadArticleCache()
            this.props.pushPrograssBarToEnd()
            return
        }*/
        this.props.resetCommentEditor()
        this.props.getArticleData(this.props.match.params.article_id)
        this.props.getCommentListData(this.props.match.params.article_id, 0, this.props.pageScale)
    }

    componentWillUnmount() {
        this.props.resetStore()
        this.props.recordScrollTop()
    }

    componentDidUpdate(preProps){

        if(preProps.match.params.article_id !== this.props.match.params.article_id){

            this.props.resetStore()

            this.props.getArticleData(this.props.match.params.article_id)

            this.props.getCommentListData(this.props.match.params.article_id, 0, this.props.pageScale)
        }

        let imageObj = new Image()

        imageObj.src = this.props.article.get('article_titleImageUrl')

        imageObj.onload = () => {

            this.props.appointSizeOfTitleImage(imageObj)

        }

    }
}

const mapState = (state) => ({
        cacheArticle: state.get('articlePage').get('cache').get('article'),
        article: state.get('articlePage').get('article'),
        widthOfMainArea: state.get('rootState').get('basicUIFeatures').get('widthOfMainArea'),
        dataReady: state.get('articlePage').get('dataReady'),
        countOfAllComment: state.get('articlePage').get('countOfAllComment'),
        commentList: state.get('articlePage').get('commentList'),
        isLoadingMoreComment: state.get('articlePage').get('isLoadingMoreComment'),
        startIndex: state.get('articlePage').get('startIndex'),
        pageScale: state.get('articlePage').get('pageScale'),
        maxPage: state.get('articlePage').get('maxPage'),
        currentPage: state.get('articlePage').get('currentPage'),
        scrollPosition: state.get('articlePage').get('scrollPosition'),
        titleImageSize: state.get('articlePage').get('titleImageSize'),
        heightOfBrowser: state.get('rootState').get('heightOfBrowser')
    })

const mapActions = (dispatch) => {
    return {
        getArticleData(article_id) {
            let value = {
                article_id: article_id
            }
            const action = createGetArticlePageDataAction(value)
            dispatch(action)
        },
        getCommentListData(article_id, startIndex, pageScale) {
            let value = {
                article_id: article_id,
                startIndex: startIndex,
                pageScale: pageScale
            }
            const action = createGetCommentListDataAction(value)
            dispatch(action)
        },
        resetStore() {
            const action = createResetArticlePageStoreAction()
            dispatch(action)
        },
        loadArticleCache() {
            const loadArticleCacheAction = createLoadArticleCacheAction()
            dispatch(loadArticleCacheAction)
        },
        getMoreCommentListData(article_id, startIndex, pageScale) {
            this.props.getCommentListData(article_id, startIndex, pageScale)
        },
        pushPrograssBarToEnd() {
            const pushPrograssBarToEndAction = createPushPrograssToEndAction({page: 'articlePage'})
            dispatch(pushPrograssBarToEndAction)
        },
        recordScrollTop() {
            const recordScrollTopOfArticlePageAction = createRecordScrollTopOfArticlePageAction()
            dispatch(recordScrollTopOfArticlePageAction)
        },
        referComment(subComment) {
            const appointReferCommentAction = createAppointReferCommentAction(subComment)
            dispatch(appointReferCommentAction)
        },
        resetCommentEditor() {
            const resetCommentEditorAction = createResetCommentEditorAction()
            dispatch(resetCommentEditorAction)
        },
        appointSizeOfTitleImage(imageObj) {
            const value = {
                width:imageObj.width,
                height:imageObj.height,
                page:'articlePage'
            }
            const appointSizeOfTitleImageFrameAction = createAppointSizeOfTitleImageFrameAction(value)
            dispatch(appointSizeOfTitleImageFrameAction)
        }
    }
}

export default
connect(mapState, mapActions)(withRouter(ArticlePage))
