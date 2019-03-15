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
        LoadingWrapper,
        ArticleDetail,
    CentralControllerMobile,
        MultipleSelectTitle,
        ShutDownMultipleSelect,ArticleItemWrapper,FreshCommentsTitle} from './style'
import {ArticleFiling,
        ArticleClassification,
        FreshComments,
        ArticleItem,
        ArticleItemMobile} from './components'
import {createPushPrograssToEndAction} from "../articlePage/store";
import {createTriggerIsLoadingManagePageArticleListDataAction,
        createGetManagePageArticleListDataAction,
        createGetManagePageArticleFilingDataAction,
        createGetManagePageArticleLabelDataAction,
        createGetManagePageArticleListDataByKeyWordAction,
        createGetManagePageArticleListDataByFilingAction,
        createGetManagePageArticleListDataByLabelAction,
        createResetCentralControllerOfManagePage,
        createTiggerIsMultipleSelectingInManagePageAction,
        createDeleteArticleListAction,
        createResetPageIndexOfPaginationAction} from "./store";
import {Pagination,SearchBar} from '../../common'
import Loading from "../../common/loading";
import store from '../../store'
import {COMMON_CONTEXT, FILING_CONTENT, LABEL_CONTEXT, SEARCH_CONTEXT} from "./store/reducer";
import {
    createAppointModalMsgAction,
    createTriggerModalIsLoadingAction,
    createTriggerShowModalAction
} from "../../common/modal/store";
import {SLIDE_UP_FAST} from "../../commonStyle/commonClassNameConstant";
import ScrollToThePositionOnMount from "../../common/scrollBehaviour/scrollToThePositionOnMount";

class ManagePage extends PureComponent {

    render() {

        const { isLoading,
                articleList,
                paginationObj,
                articleFilingObj,
                articleLabelObjList,
                heightOfBrowser,
                getArticleByKeyWord,
                getArticleByFiling,
                getArticleByLabel,
                showArticleDetail,
                widthOfBrowser,
                currentContext,
                triggerIsMultipleSelecting,
                isMultipleSelecting,
                tryToDeleteArticleList,
                articleListBeingSelected,
                confirmDeletePostProcessor,
                alreadyLoggedIn,
                isMobile} = this.props

        return (
            <Fragment>
                <CentralController>

                    <SearchBar searchBarId="managePage"
                               dataGetter={() => {getArticleByKeyWord(true)}}/>

                    <ArticleFiling articleFilingObj={articleFilingObj}
                                   dataGetter={() => {getArticleByFiling(true)}}/>

                    <ArticleClassification articleLabelObjList={articleLabelObjList}
                                           dataGetter={() => {getArticleByLabel(true)}}/>

                    <FreshCommentsTitle>最近评论</FreshCommentsTitle>
                    <FreshComments/>

                </CentralController>

                <ArticleListWrapper>
                    <ArticleListFixer heightOfBrowser={heightOfBrowser}>

                        <ArticleList>

                            {
                                window.innerWidth < 800 &&
                                <CentralControllerMobile>
                                    <SearchBar searchBarId="managePage"
                                               dataGetter={getArticleByKeyWord}/>
                                    <ArticleFiling articleFilingObj={articleFilingObj}
                                                   dataGetter={() => {getArticleByFiling(true)}}/>

                                    <ArticleClassification articleLabelObjList={articleLabelObjList}
                                                           dataGetter={() => {getArticleByLabel(true)}}/>
                                </CentralControllerMobile>
                            }




                            {
                                window.innerWidth > 800 &&
                                <Title>
                                    {
                                        currentContext !== 'common' ? '检索结果' : '所有文章'
                                    }
                                </Title>
                            }


                            {
                                widthOfBrowser > 800 &&
                                <Header>
                                    {
                                        alreadyLoggedIn &&
                                        <MultipleSelectTitle onClick={() => {triggerIsMultipleSelecting(true)}}>
                                            {
                                                isMultipleSelecting ?
                                                    <span onClick={(e) => {tryToDeleteArticleList(articleListBeingSelected,
                                                        confirmDeletePostProcessor,
                                                        e)}}>
                                                    批量删除
                                                </span>
                                                    :
                                                    '多选'
                                            }
                                        </MultipleSelectTitle>
                                    }

                                    {
                                        isMultipleSelecting &&
                                        <ShutDownMultipleSelect onClick={() => {triggerIsMultipleSelecting(false)}}>取消</ShutDownMultipleSelect>
                                    }
                                    <HeaderArticleTitle>文章标题</HeaderArticleTitle>
                                    <ArticleAuthor>作者</ArticleAuthor>
                                    <ArticleLabel>标签</ArticleLabel>
                                    <ArticleReleaseTime>发表时间</ArticleReleaseTime>
                                </Header>
                            }


                            {
                                isLoading ?
                                    <LoadingWrapper>
                                        <Loading/>
                                    </LoadingWrapper>
                                    :
                                    articleList && articleList.map((item) => {
                                    return (
                                        widthOfBrowser < 800 ?
                                            <ArticleItemWrapper currentPage={paginationObj.get('currentPage')}
                                                                className={SLIDE_UP_FAST}
                                                                key={item.get('article_id')}>
                                                <ArticleItemMobile isMultipleSelecting={isMultipleSelecting}
                                                                   article={item}/>
                                            </ArticleItemWrapper>
                                            :
                                            <ArticleItemWrapper currentPage={paginationObj.get('currentPage')}
                                                                className={SLIDE_UP_FAST}
                                                                key={item.get('article_id')}>
                                                <ArticleItem isMultipleSelecting={isMultipleSelecting}
                                                             article={item}/>
                                            </ArticleItemWrapper>

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

                    <ArticleDetail showArticleDetail={showArticleDetail}>

                    </ArticleDetail>
                </ArticleListWrapper>

                <ScrollToThePositionOnMount/>
            </Fragment>

    )
}

    componentDidMount() {
        this.props.getArticleFilingData()
        this.props.getArticleLabelData()
        if(this.props.dataIsReady){
            this.props.pushPrograssBarToEnd()
        }
    }

    componentDidUpdate(preProps){

        const currentContext = this.props.currentContext

        if(preProps.paginationObj.get('currentPage') !== this.props.paginationObj.get('currentPage') && preProps.currentContext === this.props.currentContext){

            this.props.triggerIsLoadingManagePageArticleListData()

            if(currentContext === COMMON_CONTEXT){
                if(this.props.paginationObj.get('currentPage') === 0){
                    return
                }
                this.props.getArticleListData()
            }

            if(currentContext === SEARCH_CONTEXT){
                this.props.getArticleByKeyWord()
            }

            if(currentContext === FILING_CONTENT){
                this.props.getArticleByFiling()
            }

            if(currentContext === LABEL_CONTEXT){
                this.props.getArticleByLabel()
            }
        }

        if(preProps.dataIsReady === false && this.props.dataIsReady === true){
            this.props.pushPrograssBarToEnd()
        }

        if(this.props.showArticleDetail === true){
            document.documentElement.style.overflowY = 'hidden'
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
        currentContext: state.get('managePage').get('currentContext'),
        dataIsReady: state.get('managePage').get('dataIsReady'),
        showArticleDetail: state.get('managePage').get('showArticleDetail'),
        widthOfBrowser: state.get('rootState').get('widthOfBrowser'),
        isMultipleSelecting: state.get('managePage').get('isMultipleSelecting'),
        articleListBeingSelected: state.get('managePage').get('articleListBeingSelected'),
        alreadyLoggedIn: state.get('loginPage').get('alreadyLoggedIn'),
        isMobile:state.get('rootState').get('isMobile')
    })

const mapActions = (dispatch) => {
    return {
        pushPrograssBarToEnd() {
            const pushPrograssBarToEndAction = createPushPrograssToEndAction({page: 'managePage'})
            dispatch(pushPrograssBarToEndAction)
        },

        triggerIsLoadingManagePageArticleListData(){
            const action = createTriggerIsLoadingManagePageArticleListDataAction(true)
            dispatch(action)
        },

        getArticleListData() {

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

        getArticleByKeyWord(resetPageIndexFlag){

            if(resetPageIndexFlag){
                const resetPageIndexAction = createResetPageIndexOfPaginationAction('managePage')
                dispatch(resetPageIndexAction)
            }

            const resetCentralControllerAction = createResetCentralControllerOfManagePage(SEARCH_CONTEXT)
            dispatch(resetCentralControllerAction)

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

        getArticleByFiling(resetPageIndexFlag){

            if(resetPageIndexFlag){
                const resetPageIndexAction = createResetPageIndexOfPaginationAction('managePage')
                dispatch(resetPageIndexAction)
            }

            const resetCentralControllerAction = createResetCentralControllerOfManagePage(FILING_CONTENT)
            dispatch(resetCentralControllerAction)

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
        },

        getArticleByLabel(resetPageIndexFlag){

            if(resetPageIndexFlag){
                const resetPageIndexAction = createResetPageIndexOfPaginationAction('managePage')
                dispatch(resetPageIndexAction)
            }


            console.log('get')
            console.log(resetPageIndexFlag)
            const resetCentralControllerAction = createResetCentralControllerOfManagePage(LABEL_CONTEXT)
            dispatch(resetCentralControllerAction)

            const currentLabel = store.getState().get('managePage').get('currentLabel')
            const startIndex = store.getState().get('pagination').get('managePage').get('startIndex')
            const pageScale = store.getState().get('pagination').get('managePage').get('pageScale')


            const value = {
                startIndex: startIndex,
                pageScale: pageScale,
                article_label: currentLabel
            }

            const getArticleByLableAction = createGetManagePageArticleListDataByLabelAction(value)
            dispatch(getArticleByLableAction)
        },

        triggerIsMultipleSelecting(flag){
            const triggerIsMultipleSelectingAction = createTiggerIsMultipleSelectingInManagePageAction(flag)
            dispatch(triggerIsMultipleSelectingAction)
        },

        tryToDeleteArticleList(articleListBeingSelected,confirmDeletePostProcessor,e){

            e.stopPropagation()

            const numberOfArticleListToDelete = articleListBeingSelected.size

            if(numberOfArticleListToDelete === 0){
                return
            }

            const appointModalMsgValue = {
                modalTitle: '提示',
                modalContent: '你正在试图删除选中的' + numberOfArticleListToDelete + '篇文章，这个操作将不可恢复。',
                onlyQrcode: false,
                postProcessor: () => {confirmDeletePostProcessor(articleListBeingSelected)}
            }

            const appointModalMsgAction = createAppointModalMsgAction(appointModalMsgValue)
            dispatch(appointModalMsgAction)

            const triggerShowModalAction = createTriggerShowModalAction(true)
            dispatch(triggerShowModalAction)
        },
        confirmDeletePostProcessor(articleListBeingSelected){

            const triggerModalIsLoadingAction = createTriggerModalIsLoadingAction(true)
            dispatch(triggerModalIsLoadingAction)

            const deleteArticleListAction = createDeleteArticleListAction(articleListBeingSelected)
            dispatch(deleteArticleListAction)

        }
    }
}

export default connect(mapState, mapActions)(withRouter(ManagePage))


