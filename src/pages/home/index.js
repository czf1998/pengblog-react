import React, { Component } from 'react'
import { connect } from 'react-redux'
import ArticleSummary from './components/articleSummary'
import { HomeWrapper, Gap } from './style'
import { actionCreators } from './store'

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

    componentDidMount() {
        this.props.getData(this.props.startIndex, this.props.pageScale)
    }
}

const mapState = (state) => ({
        startIndex: state.home.startIndex,
        pageScale: state.home.pageScale,
        basicUIFeatures: state.rootState.basicUIFeatures
    })

const mapActions = (dispatch) => ({
        getData(startIndex, pageScale) {
            let value = {
                startIndex: startIndex,
                pageScale: pageScale
            }
            const action = actionCreators.createGetHomeDataAction(value)
            dispatch(action)
        }
    })

export default connect(mapState, mapActions)(Home)
