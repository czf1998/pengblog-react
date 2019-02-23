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
        createGetManagePageArticleListDataByKeyWordAction} from "./store";
import {Pagination} from '../../common'
import Loading from "../../common/loading";
import store from '../../store'

class ManagePage extends PureComponent {

    render() {

        const {isLoading,
                articleList,
                paginationObj,
                articleFilingObj,
                articleLabelObjList,
                heightOfBrowser,
                getArticleByKeyWord} = this.props

        return (
            <Fragment>
                <CentralController>
                    <SearchBar searchBarId="managePage"
                               searchButtonClickHandler={getArticleByKeyWord}/>
                    <ArticleFiling articleFilingObj={articleFilingObj}/>
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
        this.props.getArticleListData(0,this.props.paginationObj.get('pageScale'))
        this.props.getArticleFilingData()
        this.props.getArticleLabelData()
    }

    componentDidUpdate(preProps){
        if(preProps.paginationObj.get('currentPage') !== this.props.paginationObj.get('currentPage')){

            this.props.getArticleListData((this.props.paginationObj.get('currentPage') - 1) * this.props.paginationObj.get('pageScale'),
                                            this.props.paginationObj.get('pageScale'))
        }
    }

}

const mapState = (state) => ({
        isLoading: state.get('managePage').get('isLoading'),
        articleList: state.get('managePage').get('articleList'),
        paginationObj: state.get('pagination').get('managePage'),
        articleFilingObj: state.get('managePage').get('articleFilingObj'),
        articleLabelObjList: state.get('managePage').get('articleLabelObjList'),
        heightOfBrowser: state.get('rootState').get('heightOfBrowser')
    })

const mapActions = (dispatch) => {
    return {
        pushPrograssBarToEnd() {
            const pushPrograssBarToEndAction = createPushPrograssToEndAction({page: 'managePage'})
            dispatch(pushPrograssBarToEndAction)
        },

        getArticleListData(startIndex, pageScale) {
            const triggerIsLoadingManagePageArticleListDataAction = createTriggerIsLoadingManagePageArticleListDataAction(true)
            dispatch(triggerIsLoadingManagePageArticleListDataAction)

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

        getArticleByKeyWord(keyWord){

            const pageScale = store.getState().get('pagination').get('managePage').get('pageScale')

            const value = {
                keyWord: keyWord,
                startIndex: 0,
                pageScale: pageScale
            }

            const getArticleByKeyWordAction = createGetManagePageArticleListDataByKeyWordAction(value)
            dispatch(getArticleByKeyWordAction)
        }
    }
}

export default connect(mapState, mapActions)(withRouter(ManagePage))


