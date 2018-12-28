import React, { Component } from 'react'
import { ArticleSummaryWrapper, Title, SummaryWrapper, ArticleInfoColumn, ArticleContent, PreviewImage } from './style'
import { connect } from 'react-redux'
import * as commonClassName from '../../../../commonStyle/commonClassNameConstant'

class ArticleSummary extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { basicUIFeatures, article } = this.props
        return (
            <ArticleSummaryWrapper
                                   widthOfMainArea={basicUIFeatures.get('widthOfMainArea')}>

                <Title className={commonClassName.FONT_MIDDLE +
                                  commonClassName.CURSORP}>
                    {article.get('article_title')}
                </Title>

                <SummaryWrapper withPreviewImage={ article.get('article_previewImageUrl') !== '' && article.get('article_previewImageUrl') !== undefined}>
                    <ArticleInfoColumn className={commonClassName.FONT_DARK +
                                                  commonClassName.FONT_SMALL}>
                            <span className={commonClassName.CLICKABLE +
                                             commonClassName.FONT_SMALL +
                                             commonClassName.TAG}>
                                {article.get('article_label')}
                            </span>
                            &nbsp;|&nbsp;
                            <span className={commonClassName.FONT_SMALL}>
                                作者: {article.get('article_author')}
                            </span>
                            &nbsp;|&nbsp;
                            <span className={commonClassName.FONT_SMALL}>
                                评论: <span className={commonClassName.CLICKABLE}>6</span>
                            </span>
                            <span style={{float:"right"}}>
                                发布于: 2017年02月14日
                            </span>
                    </ArticleInfoColumn>

                    <ArticleContent className={commonClassName.CURSORP +
                                               commonClassName.OVER_3ROWS_HANDLE}>

                        {article.get('article_summary')}

                    </ArticleContent>

                </SummaryWrapper>

                {
                    article.get('article_previewImageUrl') !== '' && article.get('article_previewImageUrl') !== undefined
                    ?
                    <PreviewImage className={
                                             commonClassName.CURSORP +
                                             commonClassName.HOVER_ENLARGE} imageUrl={article.get('article_previewImageUrl')}/>
                    :
                    ''
                }

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