import React, { PureComponent } from 'react'
import {ArticleSummaryWrapper,
        Title,
        Label,
        ArticleInfoColumn,
        ArticleMultipleContent,
        ArticleContent,
        PreviewImage } from './style'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {CommonClassNameConstants} from '../../../../commonStyle'
import { DateFormat } from "../../../../exJs"
import {GET_COUNT_OF_COMMENT} from "../../../../store/actionTypesWithSaga";

const defaultImageSrc = 'https://pengblogimage-1257899590.cos.ap-guangzhou.myqcloud.com/default.png'

class ArticleSummary extends PureComponent {

    render() {

        const { basicUIFeatures,article,currentArticleOfArticlePage,isMobile,goTo } = this.props

        const withPreviewImage = article.get('article_previewImageUrl') !== '' && article.get('article_previewImageUrl') !== undefined

        const baseUrl = this.props.match.url.match(/\/$/) === null ? this.props.match.url : this.props.match.url.substring(0, this.props.match.url.length - 1)

        const ARTICLE_PAGE_PATH = isMobile ?  '/article/' + article.get('article_id') : baseUrl + '/article/' + article.get('article_id')

        const isFocus = currentArticleOfArticlePage && article.get('article_id') === currentArticleOfArticlePage.get('article_id')

        return (
                <ArticleSummaryWrapper onClick={() => {goTo(ARTICLE_PAGE_PATH)}}
                    widthOfMainArea={basicUIFeatures.get('widthOfMainArea')}
                    isFocus={isFocus}>

                    <Title className={CommonClassNameConstants.CURSORP}>
                        <Label>
                            [{article.get('article_label')}]
                        </Label>&nbsp;
                        {article.get('article_title')}
                    </Title>




                    <ArticleMultipleContent>
                        <ArticleContent
                                        withPreviewImage={withPreviewImage}
                                        isMobile={isMobile}>
                            {article.get('article_summary')}
                        </ArticleContent>

                        {
                            withPreviewImage &&  <PreviewImage src={defaultImageSrc} data-src={article.get('article_previewImageUrl')}
                                                               className="lazyload"/>
                        }
                    </ArticleMultipleContent>


                    <ArticleInfoColumn isMobile={isMobile}
                                       className={CommonClassNameConstants.FONT_DARK}>
                        <span>
                                    <i className="fa fa-pencil"/> {article.get('article_author')}
                        </span>
                        &nbsp;&nbsp;
                        <span>
                                     { DateFormat('yyyy-MM-dd', new Date(article.get('article_releaseTime'))) }
                        </span>
                        &nbsp;|&nbsp;
                        <span>
                            <span className="iconfont">&#xe634;</span>&nbsp;
                            <span>
                                {article.get('countOfAllComment')}
                            </span>
                        </span>
                    </ArticleInfoColumn>

                </ArticleSummaryWrapper>

        );
    }
    componentDidMount() {
        if(this.props.article.get('countOfAllComment') !==undefined && this.props.hasBeenMountOnce)
            return
        this.props.getCountOfAllComment(this.props.article.get('article_id'), this)
    }
}

const mapState = (state) => {
    return  {
        basicUIFeatures: state.get('rootState').get('basicUIFeatures'),
        currentArticleOfArticlePage: state.get('articlePage').get('article'),
        isMobile: state.get('rootState').get('isMobile'),
        goTo: state.get('router').get('goTo'),
        hasBeenMountOnce: state.get('home').get('hasBeenMountOnce')
    }
}

const mapActions = (dispatch) => ({
    getCountOfAllComment: (article_id, _this) => {
        const action = {
            type: GET_COUNT_OF_COMMENT,
            value: article_id,
            host: _this
        }
        dispatch(action)
    }
})

export default connect(mapState,mapActions)(withRouter(ArticleSummary))