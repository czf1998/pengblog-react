import React, { Component } from 'react'
import { ArticleSummaryWrapper, Title, SummaryWrapper, ArticleInfoColumn, ArticleContent, PreviewImage } from './style'
import { connect } from 'react-redux'
import * as commonClassName from '../../../../commonStyle/commonClassNameConstant'

class ArticleSummary extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { basicUIFeatures } = this.props
        return (
            <ArticleSummaryWrapper className={commonClassName.COMMON_PADDING +
                                              commonClassName.COMMON_BOX_SHADOW +
                                              commonClassName.COMMON_BORDER_RADIUS}
                                   widthOfMainArea={basicUIFeatures.widthOfMainArea}>

                <Title className={commonClassName.FONT_MIDDLE +
                                  commonClassName.CURSORP}>
                   显然，这只是一个简单的测试标题
                </Title>

                <SummaryWrapper>
                    <ArticleInfoColumn className={commonClassName.FONT_DARK +
                                                  commonClassName.FONT_SMALL}>
                            <span className={commonClassName.CLICKABLE +
                                             commonClassName.FONT_SMALL +
                                             commonClassName.TAG}>
                                随想
                            </span>
                            &nbsp;|&nbsp;
                            <span className={commonClassName.FONT_SMALL}>
                                作者: Peng
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

                        相信不少的小伙伴昨晚都在熬夜参与一个全球重大活动，双11吧。确实在零点会有很多力度很大的产品，然而其实最好的盛宴莫过于整个双11都可以随时参与的。vivo或许这次确实有点狠。vivo Z3新品今天零点也正式开售啦，当然会买的小伙伴，根本不需要1598元！当然会买的小伙伴，根本不需要1598元s

                    </ArticleContent>

                </SummaryWrapper>

                <PreviewImage className={commonClassName.COMMON_BORDER_RADIUS +
                                         commonClassName.CURSORP +
                                         commonClassName.HOVER_ENLARGE}/>

            </ArticleSummaryWrapper>
        );
    }
}

const mapState = (state) => {
    return  {
        basicUIFeatures: state.rootState.basicUIFeatures
    }
}


export default connect(mapState)(ArticleSummary)