import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import { ArticleSummary, ArticleSummaryAlpha, Jumbotron }from './components'
import { HomeWrapper, Gap } from './style'
import { actionCreators } from './store'

class Home extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const {basicUIFeatures, articleList} = this.props

        return (
            <HomeWrapper>
                <Gap widthOfMainArea={basicUIFeatures.get('widthOfMainArea')} gapHeight="20px"/>
                <Jumbotron/>

                <Gap widthOfMainArea={basicUIFeatures.get('widthOfMainArea')} gapHeight="20px"/>

                {
                    articleList.map((item, index) => {
                        return (
                            <Fragment key={item.get('article_title')}>
                                <ArticleSummary article={item}/>
                                <Gap widthOfMainArea={basicUIFeatures.get('widthOfMainArea')} gapHeight="10px"/>
                            </Fragment>

                        )
                    })
                }
            </HomeWrapper>
        )
    }

    componentWillMount() {
        this.props.getData(this.props.startIndex, this.props.pageScale)
    }
}

const mapState = (state) => ({
        startIndex: state.get('home').get('startIndex'),
        pageScale: state.get('home').get('pageScale'),
        basicUIFeatures: state.get('rootState').get('basicUIFeatures'),
        articleList: state.get('home').get('articleList')
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
