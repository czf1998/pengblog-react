import React, { Component } from 'react'
import { ArticleSummaryWrapper, Title, SummaryWrapper } from './style'
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
                <Title className={commonClassName.FONT_MIDDLE}>
                    [随想]测试标题
                </Title>
                <SummaryWrapper></SummaryWrapper>
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