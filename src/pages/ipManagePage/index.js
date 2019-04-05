import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {IpManagePageWrapper, LoadingWrapper, MainArea, PaginationFixer,Title} from './style'
import {createGetIpListDataOfManagePageAction,createTriggerIsLoadingAction} from './store'
import Pagination from "../../common/pagination";
import {createPushPrograssToEndAction} from "../articlePage/store";
import {IpItem} from "./components";
import Loading from "../../common/loading";


class IpManagePage extends PureComponent {

    render() {

        const {isMobile, paginationObj,ipList,isLoading} = this.props

        return (
                <IpManagePageWrapper>

                    {
                        isLoading &&
                        <LoadingWrapper>
                            <Loading/>
                        </LoadingWrapper>
                    }

                    {
                        isMobile &&  <Title>所有封禁IP</Title>

                    }

                    <MainArea>
                        {
                            ipList && ipList.map((item,index) => {
                                return <IpItem withHeader={index===0} key={item.get('ip_id')} ipObject={item} isLoading={isLoading}/>
                            })
                        }
                    </MainArea>
                    <PaginationFixer>
                        <Pagination paginationId="ipManagePage"
                                    currentPage={paginationObj.get('currentPage')}
                                    maxPage={paginationObj.get('maxPage')}/>
                    </PaginationFixer>


                </IpManagePageWrapper>
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
    paginationObj: state.get('pagination').get('ipManagePage'),
    dataIsReady: state.get('ipManagePage').get('dataIsReady'),
    ipList: state.get('ipManagePage').get('ipList'),
    isLoading: state.get('ipManagePage').get('isLoading'),
    isMobile: state.get('rootState').get('isMobile'),
    state: state
})

const mapActions = (dispatch) => {
    return {
        getData(state){

            if(!state){
                return
            }

            const startIndex = state.get('pagination').get('ipManagePage').get('startIndex')
            const pageScale = state.get('pagination').get('ipManagePage').get('pageScale')


            let value = {
                startIndex: startIndex,
                pageScale: pageScale
            }

            const getIpManagePageArticleListDataAction = createGetIpListDataOfManagePageAction(value)
            dispatch(getIpManagePageArticleListDataAction)

            let triggerIsLoadingValue = {
                isLoadingId: 'ipManagePage',
                isLoading: true
            }

            const triggerIsLoadingAction = createTriggerIsLoadingAction(triggerIsLoadingValue)
            dispatch(triggerIsLoadingAction)
        },
        pushPrograssBarToEnd() {
            const pushPrograssBarToEndAction = createPushPrograssToEndAction({page: 'managePage'})
            dispatch(pushPrograssBarToEndAction)
        }
    }
}

export default connect(mapState, mapActions)(withRouter(IpManagePage))
