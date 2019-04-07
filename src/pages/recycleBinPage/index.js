import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {RecycleBinPageWrapper,
        LoadingWrapper,
        MainArea,
        PaginationFixer,
        Title,Cover} from './style'
import {createGetArticleListDataOfRecycleBinPageAction,createTriggerIsLoadingAction} from './store'
import Pagination from "../../common/pagination";
import {createPushPrograssToEndAction} from "../articlePage/store";
import {ArticleItem} from "./components";
import Loading from "../../common/loading";


class RecycleBinPage extends PureComponent {

    render() {

        const {isMobile, paginationObj,articleList,isLoading,recycleBinIsNull} = this.props

        return (
                <RecycleBinPageWrapper>

                    {
                        isLoading &&
                        <LoadingWrapper>
                            <Loading/>
                        </LoadingWrapper>
                    }

                    {
                        isMobile &&  <Title>所有封禁IP</Title>

                    }

                    <MainArea recycleBinIsNull={recycleBinIsNull}>
                        {
                            recycleBinIsNull ?
                                <span style={{fontSize:'4rem',color:'#CCCCCC'}} className="iconfont">&#xe673;</span>
                                :
                            articleList && articleList.map((item,index) => {
                                return <ArticleItem withHeader={index===0} key={item.get('article_id')} article={item}/>
                            })
                        }
                    </MainArea>
                    {
                        !recycleBinIsNull &&
                        <PaginationFixer>
                            <Pagination paginationId="recycleBinPage"
                                        currentPage={paginationObj.get('currentPage')}
                                        maxPage={paginationObj.get('maxPage')}/>
                        </PaginationFixer>
                    }

                    {
                        isLoading &&
                        <Cover/>
                    }


                </RecycleBinPageWrapper>
        )
    }

    componentDidMount(){
        if(this.props.dataIsReady){
            this.props.pushPrograssBarToEnd()
        }
    }

    componentDidUpdate(preProps){

        const prePage = preProps.paginationObj.get('currentPage')

        const currentPage = this.props.paginationObj.get('currentPage')

        if(currentPage !== 0 && prePage !== currentPage){
            this.props.getData(this.props.state)
        }

        if((!preProps.dataIsReady) && this.props.dataIsReady){
            this.props.pushPrograssBarToEnd()
        }
    }
}

const mapState = (state) => ({
    paginationObj: state.get('pagination').get('recycleBinPage'),
    dataIsReady: state.get('recycleBinPage').get('dataIsReady'),
    articleList: state.get('recycleBinPage').get('articleList'),
    isLoading: state.get('recycleBinPage').get('isLoading'),
    isMobile: state.get('rootState').get('isMobile'),
    state: state,
    recycleBinIsNull: state.get('recycleBinPage').get('recycleBinIsNull')
})

const mapActions = (dispatch) => {
    return {
        getData(state){

            if(!state){
                return
            }

            const startIndex = state.get('pagination').get('recycleBinPage').get('startIndex')
            const pageScale = state.get('pagination').get('recycleBinPage').get('pageScale')


            let value = {
                startIndex: startIndex,
                pageScale: pageScale
            }

            const getArticleListDataAction = createGetArticleListDataOfRecycleBinPageAction(value)
            dispatch(getArticleListDataAction)

            let triggerIsLoadingValue = {
                isLoadingId: 'recycleBinPage',
                isLoading: true
            }

            const triggerIsLoadingAction = createTriggerIsLoadingAction(triggerIsLoadingValue)
            dispatch(triggerIsLoadingAction)
        },

        pushPrograssBarToEnd() {

            const pushPrograssBarToEndAction = createPushPrograssToEndAction({page: 'recycleBinPage'})
            dispatch(pushPrograssBarToEndAction)

        }
    }
}

export default connect(mapState, mapActions)(withRouter(RecycleBinPage))
