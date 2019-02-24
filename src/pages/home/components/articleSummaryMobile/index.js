import React, { PureComponent } from 'react'
import { ArticleSummaryWrapper, Title, ArticleInfoColumn, ArticleMultipleContent, ArticleContent, PreviewImage } from './style'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {CommonClassNameConstants} from '../../../../commonStyle'
import { DateFormat } from "../../../../exJs"

class ArticleSummary extends PureComponent {

    render() {

        const { basicUIFeatures,article,currentArticleId,isMobile,goTo } = this.props

        const withPreviewImage = article.get('article_previewImageUrl') !== '' && article.get('article_previewImageUrl') !== undefined

        const baseUrl = this.props.match.url.match(/\/$/) === null ? this.props.match.url : this.props.match.url.substring(0, this.props.match.url.length - 1)

        const ARTICLE_PAGE_PATH = isMobile ?  '/article/' + article.get('article_id') : baseUrl + '/article/' + article.get('article_id')

        const isFocus = article.get('article_id') === currentArticleId

        return (
                <ArticleSummaryWrapper onClick={() => {goTo(ARTICLE_PAGE_PATH)}}
                                       widthOfMainArea={basicUIFeatures.get('widthOfMainArea')}
                                       isFocus={isFocus}>

                    <Title className={CommonClassNameConstants.CURSORP}>
                            {article.get('article_title')}
                    </Title>




                    <ArticleMultipleContent>
                        <ArticleContent className={CommonClassNameConstants.CURSORP +
                                                    CommonClassNameConstants.OVER_3ROWS_HANDLE}
                                        withPreviewImage={withPreviewImage}>
                            {article.get('article_summary')}
                        </ArticleContent>

                        {
                            withPreviewImage &&  <PreviewImage imageUrl={article.get('article_previewImageUrl')}
                                                               className={CommonClassNameConstants.COMMON_BORDER_RADIUS}/>
                        }
                    </ArticleMultipleContent>


                    <ArticleInfoColumn className={CommonClassNameConstants.FONT_DARK +
                                                  CommonClassNameConstants.FONT_SMALL}>
                        <span>
                                    <i className="fa fa-tag"></i> {article.get('article_label')}
                        </span>
                        &nbsp;&nbsp;
                        <span>
                                    <i className="fa fa-pencil"></i> {article.get('article_author')}
                        </span>
                        &nbsp;&nbsp;
                        <span>
                                     { DateFormat('yyyy-MM-dd', new Date(article.get('article_releaseTime'))) }
                        </span>
                    </ArticleInfoColumn>

                </ArticleSummaryWrapper>
        );
    }
}

const mapState = (state) => {
    return  {
        basicUIFeatures: state.get('rootState').get('basicUIFeatures'),
        currentArticleId: state.get('articlePage').get('article').get('article_id'),
        isMobile: state.get('rootState').get('isMobile'),
        goTo: state.get('router').get('goTo')
    }
}


export default connect(mapState)(withRouter(ArticleSummary))