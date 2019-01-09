import React, {PureComponent, Fragment} from 'react'
import { connect } from 'react-redux'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { withRouter } from 'react-router-dom'
import { ArticleSummary, ArticleSummaryMobile, Jumbotron, ForMore }from './components'
import { HomeWrapper, Gap, CustomBackground } from './style'
import { actionCreators } from './store'
import { CommonClassNameConstants } from "../../commonStyle";
import { Loading } from '../../common'

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
                pageScale,
                maxPage,
                currentPage,
                jumbotronArticleId,
                jumbotronArticleIdDefault,
                animateTime,
                hasBeenMountOnce,
                articleListDataIsReady,
                prograssBarHandler} = this.props

        const jumbotronTransitionClassName = hasBeenMountOnce ? '' : CommonClassNameConstants.ZOOM_IN
        const articleSummaryListTransitionClassName = hasBeenMountOnce ? '' : CommonClassNameConstants.SLIDE_UP

        return (
            articleListDataIsReady ?
            <HomeWrapper className={CommonClassNameConstants.FLEX_ROW_COLUMN_CENTER}>
                        <Gap widthOfMainArea={basicUIFeatures.get('widthOfMainArea')} gapHeight="10px"/>


                        {
                            !isMobile &&
                            <Fragment>
                                <Gap widthOfMainArea={basicUIFeatures.get('widthOfMainArea')} gapHeight="10px"/>
                                {
                                    jumbotronArticleId !== jumbotronArticleIdDefault
                                    &&
                                    <div className={jumbotronTransitionClassName}>
                                        <Jumbotron jumbotronArticleId={jumbotronArticleId}/>
                                    </div>
                                }
                                <Gap widthOfMainArea={basicUIFeatures.get('widthOfMainArea')} gapHeight="20px"/>
                            </Fragment>
                        }

                        {
                            articleList.map((item, index) => {
                                if( !isMobile && index === 0)
                                    return
                                return (
                                    <Fragment key={item.get('article_title')}>
                                        {
                                            isMobile ?
                                                <ArticleSummaryMobile article={item}/>
                                                :
                                                <div className={articleSummaryListTransitionClassName}>
                                                    <ArticleSummary article={item}  className={articleSummaryListTransitionClassName}/>
                                                </div>
                                        }
                                        <Gap widthOfMainArea={basicUIFeatures.get('widthOfMainArea')} gapHeight="10px"/>
                                    </Fragment>
                                )
                            })
                        }

                        <ForMore isLoading={isLoading}
                                 noMore={currentPage === maxPage}
                                 clickHandler={this.props.getMoreArticleListData.bind(this)}
                                 meta={[startIndex,
                                     pageScale,
                                     maxPage,
                                     currentPage,
                                     isLoading]}/>
            </HomeWrapper>
            :
            <Loading/>
        )
    }

    componentDidMount() {
        if(this.props.articleListDataIsReady)
            return
        this.props.getData(this.props.startIndex, this.props.pageScale)
        console.log(this.props.nanobarManager.get('nanobarGoToTheMilePost')())
    }

    componentWillUnmount() {
        this.props.triggerHasBeenMountOnce()
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
        jumbotronArticleId: state.get('home').get('jumbotronArticleId'),
        jumbotronArticleIdDefault: state.get('home').get('jumbotronArticleIdDefault'),
        isLoading: state.get('home').get('isLoading'),
        loadedAndShowJumbotron: state.get('home').get('loadedAndShowJumbotron'),
        animateTime: state.get('rootState').get('basicUIFeatures').get('animateTime'),
        minHeight: state.get('rootState').get('heightOfBrowser'),
        articleListDataIsReady: state.get('home').get('articleListDataIsReady'),
        hasBeenMountOnce: state.get('home').get('hasBeenMountOnce'),
        nanobarManager: state.get('prograssBar').get('nanobarManager')
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
            this.props.getData(startIndex, pageScale)
        },
        triggerHasBeenMountOnce() {
            const action = actionCreators.createTriggerHasBeenMountOnce()
            dispatch(action)
        }
    }
}

export default connect(mapState, mapActions)(withRouter(Home))
