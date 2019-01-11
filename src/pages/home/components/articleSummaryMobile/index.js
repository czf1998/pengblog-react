import React, { PureComponent } from 'react'
import { ArticleSummaryWrapper, Title, ArticleInfoColumn, ArticleContent, PreviewImage } from './style'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {CommonClassNameConstants} from '../../../../commonStyle'

class ArticleSummary extends PureComponent {

    render() {

        const { basicUIFeatures, article } = this.props

        const withPreviewImage = article.get('article_previewImageUrl') !== '' && article.get('article_previewImageUrl') !== undefined

        const ARTICLE_PAGE_PATH = '/article/' + article.get('article_id')

        return (
            <Link to={ARTICLE_PAGE_PATH} style={{width:'100%'}}>
            <ArticleSummaryWrapper className={CommonClassNameConstants.COMMON_PADDING}
                                   widthOfMainArea={basicUIFeatures.get('widthOfMainArea')}>

                <Title className={CommonClassNameConstants.CURSORP}>
                        {article.get('article_title')}
                </Title>



                {
                    withPreviewImage &&  <PreviewImage imageUrl={article.get('article_previewImageUrl')}
                                                       className={CommonClassNameConstants.COMMON_BORDER_RADIUS}/>
                }

                <ArticleContent className={CommonClassNameConstants.CURSORP +
                                           CommonClassNameConstants.OVER_3ROWS_HANDLE}
                                withPreviewImage={withPreviewImage}>

                    {article.get('article_summary')}

                </ArticleContent>

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
                                发布于: 2017年02月14日
                    </span>
                </ArticleInfoColumn>

            </ArticleSummaryWrapper>
            </Link>
        );
    }
}

const mapState = (state) => {
    return  {
        basicUIFeatures: state.get('rootState').get('basicUIFeatures')
    }
}


export default connect(mapState)(ArticleSummary)