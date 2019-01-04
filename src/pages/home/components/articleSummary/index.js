import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-keeper'
import { ArticleSummaryWrapper, Title, SummaryWrapper, ArticleInfoColumn, ArticleContent, PreviewImage } from './style'
import { CommonClassNameConstants } from '../../../../commonStyle'


class ArticleSummary extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {

        const { basicUIFeatures, article } = this.props

        const withPreviewImage = article.get('article_previewImageUrl') !== '' && article.get('article_previewImageUrl') !== undefined

        const ARTICLE_PAGE_PATH = '/article/'

        return (

            <ArticleSummaryWrapper className={CommonClassNameConstants.COMMON_PADDING +
                                              CommonClassNameConstants.COMMON_BORDER_RADIUS}
                                   widthOfMainArea={basicUIFeatures.get('widthOfMainArea')}>
                <Link to={ARTICLE_PAGE_PATH + article.get('article_id')}>
                    <Title className={CommonClassNameConstants.FONT_MIDDLE +
                                      CommonClassNameConstants.CURSORP}>
                        <span className={CommonClassNameConstants.HOVER_UNDERLINE}>
                            {article.get('article_title')}
                        </span>
                    </Title>
                </Link>



                <SummaryWrapper withPreviewImage={withPreviewImage}>
                    <ArticleInfoColumn className={CommonClassNameConstants.FONT_DARK +
                                                  CommonClassNameConstants.FONT_SMALL}>
                            <span className={CommonClassNameConstants.CLICKABLE +
                                             CommonClassNameConstants.FONT_SMALL +
                                             CommonClassNameConstants.TAG}>
                                {article.get('article_label')}
                            </span>
                            &nbsp;|&nbsp;
                            <span className={CommonClassNameConstants.FONT_SMALL}>
                                作者: {article.get('article_author')}
                            </span>
                            &nbsp;|&nbsp;
                            <span className={CommonClassNameConstants.FONT_SMALL}>
                                评论: <span className={CommonClassNameConstants.CLICKABLE}>6</span>
                            </span>
                            <span style={{float:"right"}}>
                                发布于: 2017年02月14日
                            </span>
                    </ArticleInfoColumn>

                    <ArticleContent className={CommonClassNameConstants.CURSORP +
                                               CommonClassNameConstants.OVER_3ROWS_HANDLE}
                                    withPreviewImage={withPreviewImage}>

                        {article.get('article_summary')}

                    </ArticleContent>

                </SummaryWrapper>

                {
                    withPreviewImage
                    &&
                    <PreviewImage className={CommonClassNameConstants.CURSORP +
                                             CommonClassNameConstants.HOVER_ENLARGE}
                                  imageUrl={article.get('article_previewImageUrl')}/>
                }

            </ArticleSummaryWrapper>
        );
    }
}

const mapState = (state) => {
    return  {
        isMobile: state.get('rootState').get('isMobile'),
        basicUIFeatures: state.get('rootState').get('basicUIFeatures')
    }
}


export default connect(mapState)(ArticleSummary)