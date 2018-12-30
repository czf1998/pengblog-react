import React, { PureComponent } from 'react'
import { ArticleSummaryWrapper, Title, SummaryWrapper, ArticleInfoColumn, ArticleContent, PreviewImage } from './style'
import { connect } from 'react-redux'
import * as commonClassName from '../../../../commonStyle/commonClassNameConstant'

class ArticleSummary extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {

        const { basicUIFeatures, article } = this.props

        const withPreviewImage = article.get('article_previewImageUrl') !== '' && article.get('article_previewImageUrl') !== undefined

        return (
            <ArticleSummaryWrapper className={commonClassName.COMMON_PADDING}
                                   widthOfMainArea={basicUIFeatures.get('widthOfMainArea')}>

                <Title className={commonClassName.FONT_MIDDLE +
                                  commonClassName.CURSORP}>
                    <span className={commonClassName.CLICKABLE +
                                     commonClassName.TAG}>
                        {article.get('article_label')}
                    </span>
                        {article.get('article_title')}
                </Title>



                {
                    withPreviewImage &&  <PreviewImage imageUrl={article.get('article_previewImageUrl')}
                                                       className={commonClassName.COMMON_BORDER_RADIUS}/>
                }

                <ArticleContent className={commonClassName.CURSORP +
                commonClassName.OVER_3ROWS_HANDLE}
                                withPreviewImage={withPreviewImage}>

                    {article.get('article_summary')}

                </ArticleContent>

                <ArticleInfoColumn className={commonClassName.FONT_DARK +
                commonClassName.FONT_SMALL}>

                    <span className={commonClassName.FONT_SMALL}>
                                作者: {article.get('article_author')}
                    </span>
                    &nbsp;&nbsp;
                    <span>
                                发布于: 2017年02月14日
                    </span>
                </ArticleInfoColumn>

            </ArticleSummaryWrapper>
        );
    }
}

const mapState = (state) => {
    return  {
        basicUIFeatures: state.get('rootState').get('basicUIFeatures')
    }
}


export default connect(mapState)(ArticleSummary)