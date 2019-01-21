import React, {PureComponent, Fragment} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ArticleSummary, ArticleSummaryMobile, Jumbotron }from './components'
import { HomeWrapper, Gap } from './style'
import { actionCreators } from './store'
import { CommonClassNameConstants } from "../../commonStyle";
import { Loading, ForMore  } from '../../common'

class Home extends PureComponent {

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
                hasBeenMountOnce,
                articleListDataIsReady} = this.props

        const jumbotronTransitionClassName = hasBeenMountOnce ? '' : CommonClassNameConstants.ZOOM_IN
        const articleSummaryListTransitionClassName = hasBeenMountOnce ? '' : CommonClassNameConstants.SLIDE_UP

        return (
            articleListDataIsReady ?
            <HomeWrapper className={CommonClassNameConstants.FLEX_ROW_COLUMN_CENTER}>


                {
                    !isMobile &&
                    <Fragment>
                        <Gap widthOfMainArea={basicUIFeatures.get('widthOfMainArea')} gapHeight="20px"/>
                        {
                            jumbotronArticleId !== jumbotronArticleIdDefault
                            &&
                            <div className={jumbotronTransitionClassName}>
                                <Jumbotron jumbotronArticleId={jumbotronArticleId}/>
                            </div>
                        }
                        <Gap widthOfMainArea={basicUIFeatures.get('widthOfMainArea')} gapHeight="10px"/>
                    </Fragment>
                }

                {
                    articleList.map((item, index) => {
                        if( !isMobile && index === 0){
                            return null
                        }
                        return (
                            <Fragment key={item.get('article_title')}>
                                <Gap widthOfMainArea={basicUIFeatures.get('widthOfMainArea')} gapHeight="10px"/>
                                {
                                    isMobile ?
                                        <div className={articleSummaryListTransitionClassName} style={{width:'100%'}}>
                                            <ArticleSummaryMobile article={item}/>
                                        </div>
                                        :
                                        <div className={articleSummaryListTransitionClassName}>
                                            <ArticleSummary article={item}/>
                                        </div>
                                }
                            </Fragment>
                        )
                    })
                }

                <ForMore isLoading={isLoading}
                         noMore={currentPage === maxPage}
                         clickHandler={this.props.getMoreArticleListData.bind(this)}
                         meta={[startIndex,
                             pageScale]}/>


            </HomeWrapper>
            :
            <Loading/>
        )
    }

    componentDidMount() {
        if(this.props.articleListDataIsReady) {
            this.props.pushPrograssBarToEnd()
            return
        }

        this.props.getData(this.props.startIndex, this.props.pageScale)
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
        articleListDataIsReady: state.get('home').get('articleListDataIsReady'),
        hasBeenMountOnce: state.get('home').get('hasBeenMountOnce'),
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
        getMoreArticleListData(startIndex, pageScale){
            this.props.getData(startIndex, pageScale)
        },
        triggerHasBeenMountOnce() {
            const action = actionCreators.createTriggerHasBeenMountOnce()
            dispatch(action)
        },
        pushPrograssBarToEnd() {
            const pushPrograssBarToEndAction = actionCreators.createPushPrograssToEndAction({page: 'home'})
            dispatch(pushPrograssBarToEndAction)
        }
    }
}

export default connect(mapState, mapActions)(withRouter(Home))
