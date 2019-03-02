import React, {PureComponent, Fragment} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ArticleSummaryMobile}from './components'
import { HomeWrapper,LoadingWrapper} from './style'
import {createTriggerHasBeenMountOnce,
        createGetHomeDataAction,
        createPushPrograssToEndAction,
        createTriggerIsLoadingHomeArticleListAction } from './store'
import { CommonClassNameConstants } from "../../commonStyle";
import { Loading, ForMore  } from '../../common'

class Home extends PureComponent {

    render() {

        const {
                articleList,
                isMobile,
                isLoading,
                startIndex,
                pageScale,
                maxPage,
                currentPage,
                hasBeenMountOnce,
                articleListDataIsReady} = this.props

        const articleSummaryListTransitionClassName = hasBeenMountOnce ? '' : CommonClassNameConstants.SLIDE_UP_FAST

        return (
            articleListDataIsReady ?
            <HomeWrapper className={CommonClassNameConstants.FLEX_ROW_COLUMN_CENTER}>


              {/*  {
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
                }*/}

                {
                    articleList.map((item, index) => {

                        return (
                            <Fragment key={item.get('article_title')}>
                                {
                                    isMobile ?
                                        <div className={articleSummaryListTransitionClassName} style={{width:'100%'}}>
                                            <ArticleSummaryMobile article={item}/>
                                        </div>
                                        :
                                        <div className={articleSummaryListTransitionClassName} style={{width:'100%'}}>
                                            <ArticleSummaryMobile article={item}/>
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
            <LoadingWrapper>
                <Loading/>
            </LoadingWrapper>
        )
    }

    componentDidMount() {
        if(this.props.articleListDataIsReady) {
            this.props.pushPrograssBarToEnd()
            return
        }
        this.props.getData(this.props.startIndex, this.props.pageScale)
    }

    componentDidUpdate(preProps){
        if(preProps.articleListDataIsReady === false && this.props.articleListDataIsReady) {
            this.props.pushPrograssBarToEnd()
        }
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
        isLoading: state.get('home').get('isLoading'),
        articleListDataIsReady: state.get('home').get('articleListDataIsReady'),
        hasBeenMountOnce: state.get('home').get('hasBeenMountOnce'),
    })

const mapActions = (dispatch) => {
    return {
        getData(startIndex, pageScale) {
            const triggerIsLoadingHomeArticleListAction = createTriggerIsLoadingHomeArticleListAction(true)
            dispatch(triggerIsLoadingHomeArticleListAction)

            let value = {
                startIndex: startIndex,
                pageScale: pageScale
            }
            const action = createGetHomeDataAction(value)
            dispatch(action)
        },
        getMoreArticleListData(startIndex, pageScale){
            const triggerIsLoadingHomeArticleListAction = createTriggerIsLoadingHomeArticleListAction(true)
            dispatch(triggerIsLoadingHomeArticleListAction)
            setTimeout(() => {
                this.props.getData(startIndex, pageScale)
            },1500)
        },
        triggerHasBeenMountOnce() {
            const action = createTriggerHasBeenMountOnce()
            dispatch(action)
        },
        pushPrograssBarToEnd() {
            const pushPrograssBarToEndAction = createPushPrograssToEndAction({page: 'home'})
            dispatch(pushPrograssBarToEndAction)
        }
    }
}

export default connect(mapState, mapActions)(withRouter(Home))
