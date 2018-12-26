import React, { Component } from 'react'
import { connect } from 'react-redux'

import ArticleSummary from './components/articleSummary'

import { HomeWrapper, Gap } from './style'

class Home extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const {basicUIFeatures} = this.props

        return (
            <HomeWrapper>
                <Gap widthOfMainArea={basicUIFeatures.widthOfMainArea}></Gap>
                <ArticleSummary></ArticleSummary>
            </HomeWrapper>
        )
    }
}

const mapState = (state) => {
    return {
        basicUIFeatures: state.rootState.basicUIFeatures
    }
}

export default connect(mapState)(Home)
