import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import { ArticlePageWrapper,
            ArticlePageFixer,
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
import './style.css'

const defaultImageSrc = 'https://pengblogimage-1257899590.cos.ap-guangzhou.myqcloud.com/default.png'

class ArticlePage extends PureComponent {


    render() {

        const { article,
                widthOfMainArea,
                dataReady,
                countOfAllComment,
                commentList,
                isLoadingMoreComment,
                startIndex,
                scrollPosition,
                referComment,currentPath } = this.props

        const { article_id } = this.props.match.params



        const htmlContent = generateArticleContentWithLazyloadImage(article.get('article_content'))



        return (
                    dataReady ?
                    <ArticlePageWrapper className={CommonClassNameConstants.FLEX_ROW_COLUMN_CENTER}>
                        <ArticlePageFixer>
                            <ArticleMainArea widthOfMainArea={widthOfMainArea} className={CommonClassNameConstants.SLIDE_UP_FAST}>

                                {
                                    article.get('article_titleImageUrl') && article.get('article_titleImageUrl') !== '' &&
                                    <ArticleTitleImage data-src={article.get('article_titleImageUrl')}
                                                       src={defaultImageSrc}
                                                       className="lazyload"/>
                                }


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
                                                dangerouslySetInnerHTML={{__html:htmlContent}}>
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

                                <TransitionGroup>
                                    {
                                        commentList.map((item) => {
                                            return (
                                                <CSSTransition key={item.get('comment_id')}
                                                               timeout={400}
                                                               classNames="article-comment">
                                                    <div>
                                                        <GapLine/>
                                                        <Comment comment={item} clickReferHandler={() => {referComment(item)}}/>
                                                    </div>
                                                </CSSTransition>
                                            )
                                        })
                                    }
                                </TransitionGroup>

                                <GapLine/>
                                <ForMore isLoading={isLoadingMoreComment}
                                         noMore={startIndex >= countOfAllComment}
                                         clickHandler={this.props.getMoreCommentListData}/>

                            </ArticleMainArea>

                            <TopLevelCommentEditor article_id={article_id}/>

                            <ScrollToThePositionOnMount scrollPosition={scrollPosition}/>
                        </ArticlePageFixer>
                    </ArticlePageWrapper>
                    :
                   <LoadingWrapper currentPath={currentPath}>
                       <Loading/>
                   </LoadingWrapper>
                )
    }


    componentDidMount() {

        this.props.resetCommentEditor()
        this.props.getArticleData(this.props.match.params.article_id)
        this.props.getCommentListData(this.props.match.params.article_id)
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

        if(preProps.dataReady === false && this.props.dataReady) {
            this.props.pushPrograssBarToEnd()
        }


        if(this.props.article.get('article_titleImageUrl') === undefined){
            return
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
        currentPage: state.get('articlePage').get('currentPage'),
        scrollPosition: state.get('articlePage').get('scrollPosition'),
        currentPath: state.get('router').get('currentPath')
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
        getCommentListData(article_id) {
            let value = {
                article_id: article_id
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
        getMoreCommentListData() {
            const action = createGetCommentListDataAction()
            dispatch(action)
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

const generateArticleContentWithLazyloadImage = (htmlStr) => {

    let virtualElement = document.createElement('div')
    virtualElement.innerHTML = htmlStr

    let imgs = virtualElement.getElementsByTagName("img")

    if(imgs.length > 0) {
        for(let i = 0; i < imgs.length; i++){
            let src = imgs.item(i).getAttribute('src')
            imgs.item(i).setAttribute('data-src',src)
            imgs.item(i).setAttribute('class','lazyload')
            imgs.item(i).setAttribute('src',defaultImageSrc)
        }
    }

    return virtualElement.innerHTML

}
