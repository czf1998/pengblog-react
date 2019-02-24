import React, {PureComponent, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {CentralController,
        ArticleListWrapper,
        ArticleListFixer,
        ArticleList,
        Title,
        Header,
        HeaderArticleTitle,
        ArticleAuthor,
        ArticleLabel,
        ArticleReleaseTime,
        PaginationFixer,
        LoadingWrapper} from './style'
import {SearchBar,
        ArticleFiling,
        ArticleClassification,
        ArticleItem} from './components'
import {createPushPrograssToEndAction} from "../articlePage/store";
import {createTriggerIsLoadingManagePageArticleListDataAction,
        createGetManagePageArticleListDataAction,
        createGetManagePageArticleFilingDataAction,
        createGetManagePageArticleLabelDataAction,
        createGetManagePageArticleListDataByKeyWordAction,
        createGetManagePageArticleListDataByFilingAction} from "./store";
import {Pagination} from '../../common'
import Loading from "../../common/loading";
import store from '../../store'
import {COMMON_CONTEXT, FILING_CONTENT, SEARCH_CONTEXT} from "./store/reducer";

class ManagePage extends PureComponent {

    render() {

        const {isLoading,
                articleList,
                paginationObj,
                articleFilingObj,
                articleLabelObjList,
                heightOfBrowser,
                getArticleByKeyWord,
                getArticleByFiling} = this.props

        return (
            <Fragment>
                <CentralController>
                    <SearchBar searchBarId="managePage"
                               dataGetter={getArticleByKeyWord}/>
                    <ArticleFiling articleFilingObj={articleFilingObj}
                                   dataGetter={getArticleByFiling}/>
                    <ArticleClassification articleLabelObjList={articleLabelObjList}/>
                </CentralController>

                <ArticleListWrapper>
                    <ArticleListFixer heightOfBrowser={heightOfBrowser}>

                        <ArticleList>
                            <Title>所有文章</Title>
                            <Header>
                                <HeaderArticleTitle>文章标题</HeaderArticleTitle>
                                <ArticleAuthor>作者</ArticleAuthor>
                                <ArticleLabel>标签</ArticleLabel>
                                <ArticleReleaseTime>发表时间</ArticleReleaseTime>
                            </Header>

                            {
                                isLoading ?
                                    <LoadingWrapper>
                                        <Loading/>
                                    </LoadingWrapper>
                                    :
                                    articleList && articleList.map((item, index) => {
                                    return (
                                        <ArticleItem key={item.get('article_id')} article={item}/>
                                    )
                                })
                            }
                        </ArticleList>


                        <PaginationFixer>
                            <Pagination paginationId="managePage"
                                        currentPage={paginationObj.get('currentPage')}
                                        maxPage={paginationObj.get('maxPage')}/>
                        </PaginationFixer>
                    </ArticleListFixer>
                </ArticleListWrapper>
            </Fragment>

    )
}

    componentDidMount() {
        setTimeout(() => {
            this.props.pushPrograssBarToEnd()
        },500)

        this.props.getArticleFilingData()
        this.props.getArticleLabelData()
    }

    componentDidUpdate(preProps){

        console.log('update')

        const currentContext = this.props.currentContext

        if(preProps.paginationObj.get('currentPage') !== this.props.paginationObj.get('currentPage') && preProps.currentContext === this.props.currentContext){

            if(currentContext === COMMON_CONTEXT){
                this.props.getArticleListData()
            }

            if(currentContext === SEARCH_CONTEXT){
                this.props.getArticleByKeyWord()
            }

            if(currentContext === FILING_CONTENT){
                this.props.getArticleByFiling()
            }
        }
    }

}

const mapState = (state) => ({
        isLoading: state.get('managePage').get('isLoading'),
        articleList: state.get('managePage').get('articleList'),
        paginationObj: state.get('pagination').get('managePage'),
        articleFilingObj: state.get('managePage').get('articleFilingObj'),
        articleLabelObjList: state.get('managePage').get('articleLabelObjList'),
        heightOfBrowser: state.get('rootState').get('heightOfBrowser'),
        currentContext: state.get('managePage').get('currentContext')
    })

const mapActions = (dispatch) => {
    return {
        pushPrograssBarToEnd() {
            const pushPrograssBarToEndAction = createPushPrograssToEndAction({page: 'managePage'})
            dispatch(pushPrograssBarToEndAction)
        },

        getArticleListData() {

            const triggerIsLoadingManagePageArticleListDataAction = createTriggerIsLoadingManagePageArticleListDataAction(true)
            dispatch(triggerIsLoadingManagePageArticleListDataAction)

            const startIndex = store.getState().get('pagination').get('managePage').get('startIndex')
            const pageScale = store.getState().get('pagination').get('managePage').get('pageScale')


            let value = {
                startIndex: startIndex,
                pageScale: pageScale
            }

            const getManagePageArticleListDataAction = createGetManagePageArticleListDataAction(value)
            dispatch(getManagePageArticleListDataAction)
        },

        getArticleFilingData(){
            const getArticleFilingDataAction = createGetManagePageArticleFilingDataAction()
            dispatch(getArticleFilingDataAction)
        },

        getArticleLabelData(){
            const getArticleLabelDataAction = createGetManagePageArticleLabelDataAction()
            dispatch(getArticleLabelDataAction)
        },

        getArticleByKeyWord(){

            const keyWord = store.getState().get('searchBar').get('managePage').get('searchBarValue')
            const startIndex = store.getState().get('pagination').get('managePage').get('startIndex')
            const pageScale = store.getState().get('pagination').get('managePage').get('pageScale')

            const value = {
                keyWord: keyWord,
                startIndex: startIndex,
                pageScale: pageScale
            }

            const getArticleByKeyWordAction = createGetManagePageArticleListDataByKeyWordAction(value)
            dispatch(getArticleByKeyWordAction)
        },

        getArticleByFiling(){

            const selectedYear = store.getState().get('select').get('year')
            const selectedMonth = store.getState().get('select').get('month')
            const startIndex = store.getState().get('pagination').get('managePage').get('startIndex')
            const pageScale = store.getState().get('pagination').get('managePage').get('pageScale')

            if(selectedYear === undefined){
                return
            }

            const value = {
                selectedYear: selectedYear,
                selectedMonth: selectedMonth,
                startIndex: startIndex,
                pageScale: pageScale
            }

            const getArticleByFilingAction = createGetManagePageArticleListDataByFilingAction(value)
            dispatch(getArticleByFilingAction)
        }
    }
}

export default connect(mapState, mapActions)(withRouter(ManagePage))


