import React, {PureComponent, Fragment} from 'react'
import { connect } from 'react-redux'
import { ArticleSummary, ArticleSummaryMobile, Jumbotron, ForMore }from './components'
import { HomeWrapper, Gap } from './style'
import { actionCreators } from './store'

class Home extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {

        const {basicUIFeatures,
               articleList,
               isMobile,
               isLoading,
            startIndex,
            pageScale,maxPage,currentPage} = this.props

        return (
            <HomeWrapper>
                <Gap widthOfMainArea={basicUIFeatures.get('widthOfMainArea')} gapHeight="10px"/>
                {
                    !isMobile &&
                    <Fragment>
                        <Gap widthOfMainArea={basicUIFeatures.get('widthOfMainArea')} gapHeight="10px"/>
                        <Jumbotron/>
                        <Gap widthOfMainArea={basicUIFeatures.get('widthOfMainArea')} gapHeight="20px"/>
                    </Fragment>
                }

                {
                    articleList.map((item) => {
                        return (
                            <Fragment key={item.get('article_title')}>
                                {
                                    isMobile ?
                                        <ArticleSummaryMobile article={item}/>
                                    :
                                        <ArticleSummary article={item}/>
                                }
                                <Gap widthOfMainArea={basicUIFeatures.get('widthOfMainArea')} gapHeight="10px"/>
                            </Fragment>

                        )
                    })
                }
                <div onClick={() => {this.props.getMoreArticleListData(startIndex, pageScale, maxPage, currentPage, isLoading)}} >
                    <ForMore isLoading={isLoading} noMore={currentPage === maxPage}/>
                </div>


            </HomeWrapper>
        )
    }

    componentDidMount() {
        this.props.getData(this.props.startIndex, this.props.pageScale)
    }
}

const mapState = (state) => ({
        startIndex: state.get('home').get('startIndex'),
        pageScale: state.get('home').get('pageScale'),
        maxPage: state.get('home').get('maxPage'),
        currentPage: state.get('home').get('currentPage'),
        basicUIFeatures: state.get('rootState').get('basicUIFeatures'),
        articleList: state.get('home').get('articleList'),
        isMobile: state.get('rootState').get('isMobile'),
        isLoading: state.get('home').get('isLoading')
    })

const mapActions = (dispatch) => {
    return {
        getData(startIndex, pageScale) {
            let value = {
                startIndex: startIndex,
                pageScale: pageScale
            }
            const action = actionCreators.createGetHomeDataAction(value)
            dispatch(action)
        },
        getMoreArticleListData(startIndex, pageScale, maxPage, currentPage, isLoading){
            if(maxPage === currentPage || isLoading)
                return
            this.getData(startIndex, pageScale)
        }
    }
}



export default connect(mapState, mapActions)(Home)
