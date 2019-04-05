import React, {PureComponent, Fragment} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ArticleSummaryMobile}from './components'
import { HomeWrapper,LoadingWrapper,LoadingSearchResult} from './style'
import {createTriggerHasBeenMountOnce,
        createGetHomeDataAction,
        createPushPrograssToEndAction,
        createTriggerIsLoadingHomeArticleListAction,
        createResetHomePageIndexAction,
        createGetHomeArticleListDataByKeywordAction } from './store'
import { CommonClassNameConstants } from "../../commonStyle";
import { Loading, ForMore,SearchBar  } from '../../common'
import {COMMON_CONTEXT, SEARCH_CONTEXT} from "../managePage/store/reducer";


class Home extends PureComponent {

    render() {

        const {
                articleList,
                isMobile,
                isLoading,
                maxPage,
                currentPage,
                hasBeenMountOnce,
                articleListDataIsReady,
                getArticleListByKeyword,getMoreData,
                getData,
                 context} = this.props

        const articleSummaryListTransitionClassName = hasBeenMountOnce ? '' : CommonClassNameConstants.SLIDE_UP_FAST

        return (
            articleListDataIsReady ?
            <HomeWrapper className={CommonClassNameConstants.FLEX_ROW_COLUMN_CENTER}>

                <SearchBar backgroundColor='white'
                           style={{borderBottom:'solid 1px #F0F0F0',position:'sticky',top:'0',zIndex:isMobile?'0':'1'}}
                           searchBarId="home"
                           dataGetter={() => {getArticleListByKeyword(true)}}/>

                {
                    isLoading &&
                    <LoadingSearchResult>
                        <Loading/>
                    </LoadingSearchResult>
                }

                {
                    articleList.map((item) => {

                        return (
                            <Fragment key={item.get('article_id')}>
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

                {

                    !(context === SEARCH_CONTEXT && currentPage === maxPage ) &&
                    <ForMore isLoading={isLoading}
                             noMore={currentPage === maxPage}
                             clickHandler={() => {getMoreData(context,getData,getArticleListByKeyword)}}/>
                }



            </HomeWrapper>
            :
            <LoadingWrapper isMobile={isMobile}>
                <Loading/>
            </LoadingWrapper>
        )
    }

    componentDidMount() {
        if(this.props.articleListDataIsReady) {
            this.props.pushPrograssBarToEnd()
            return
        }
        this.props.getData(this.props.state)
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
        state: state,
        maxPage: state.get('home').get('maxPage'),
        currentPage: state.get('home').get('currentPage'),
        basicUIFeatures: state.get('rootState').get('basicUIFeatures'),
        articleList: state.get('home').get('articleList'),
        isMobile: state.get('rootState').get('isMobile'),
        isLoading: state.get('home').get('isLoading'),
        articleListDataIsReady: state.get('home').get('articleListDataIsReady'),
        hasBeenMountOnce: state.get('home').get('hasBeenMountOnce'),
        context: state.get('home').get('context')
    })

const mapActions = (dispatch) => {
    return {
        getMoreData(context,getData,getArticleListByKeyword){
            if(context === COMMON_CONTEXT) {
                getData()
                return
            }
            if(context === SEARCH_CONTEXT){
                getArticleListByKeyword(false)
                return
            }
        },
        getData() {

            //trigger当前组件为loading状态
            const triggerIsLoadingHomeArticleListAction = createTriggerIsLoadingHomeArticleListAction(true)
            dispatch(triggerIsLoadingHomeArticleListAction)

            const action = createGetHomeDataAction()
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
        },
        getArticleListByKeyword(resetHomePageIndexFlag){

            //重置home页面指标
            if(resetHomePageIndexFlag){
                const resetHomePageIndexAction = createResetHomePageIndexAction()
                dispatch(resetHomePageIndexAction)
            }

            const getArticleByKeyordAction = createGetHomeArticleListDataByKeywordAction()
            dispatch(getArticleByKeyordAction)
        }
    }
}

export default connect(mapState, mapActions)(withRouter(Home))
