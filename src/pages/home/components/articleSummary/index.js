import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
//import { Link } from 'react-keeper'
import { Link } from 'react-router-dom'
import { ArticleSummaryWrapper, Title, SummaryWrapper, ArticleInfoColumn, ArticleContent, PreviewImage } from './style'
import { CommonClassNameConstants } from '../../../../commonStyle'
import { GET_COUNT_OF_COMMENT } from '../../../../store/actionTypesWithSaga'


class ArticleSummary extends PureComponent {

    constructor(props) {
        super(props)

    }

    render() {

        const { basicUIFeatures, article, hasBeenMountOnce } = this.props

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
                                评论: <span className={CommonClassNameConstants.CLICKABLE}>{article.get('countOfAllComment')}</span>
                            </span>
                            <span style={{float:"right"}}>
                                发布于: 2017年02月14日
                            </span>
                    </ArticleInfoColumn>
                    <Link to={ARTICLE_PAGE_PATH + article.get('article_id')}>
                        <ArticleContent className={CommonClassNameConstants.CURSORP}
                                        withPreviewImage={withPreviewImage}>

                            {article.get('article_summary')}

                        </ArticleContent>
                    </Link>
                </SummaryWrapper>

                {
                    withPreviewImage
                    &&
                    <Link to={ARTICLE_PAGE_PATH + article.get('article_id')}>
                        <PreviewImage className={CommonClassNameConstants.CURSORP +
                                                 CommonClassNameConstants.HOVER_ENLARGE}
                                      imageUrl={article.get('article_previewImageUrl')}/>
                    </Link>
                }

            </ArticleSummaryWrapper>
        );
    }

    componentDidMount() {
        if(this.props.hasBeenMountOnce)
            return
        this.props.getCountOfAllComment(this.props.article.get('article_id'), this)
    }
}

const mapState = (state) => ({
    isMobile: state.get('rootState').get('isMobile'),
    basicUIFeatures: state.get('rootState').get('basicUIFeatures'),
    hasBeenMountOnce: state.get('home').get('hasBeenMountOnce')
})

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

export default connect(mapState, mapActions)(ArticleSummary)