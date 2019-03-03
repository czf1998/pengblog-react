import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import {FreshCommentsWrapper} from './style'
import {createTriggerIsLoadingFreshCommentsAction,
        createGetFreshCommentsDataAction} from './store'
import {ForMore} from '../../../../common'
import {FreshCommentItem} from './components'

class FreshComments extends PureComponent {

    render() {


        const {browser,isLoading,currentPage,maxPage,commentList} = this.props

        return (
            <FreshCommentsWrapper browser={browser}>
                {
                    commentList.map((item) => {
                        return <FreshCommentItem key={item.get('comment_id')}
                                                 comment={item}/>
                    })
                }
                <ForMore fontSize="0.9rem;"
                         isLoading={isLoading}
                         noMore={currentPage === maxPage}/>
            </FreshCommentsWrapper>
        );
    }

    componentDidMount(){
        this.props.getData(this.props.state)
    }

    componentDidUpdate(preProps){

    }
}



const mapState = (state) => ({
    state: state,
    browser: state.get('rootState').get('browser'),
    isLoading: state.get('freshComments').get('isLoading'),
    currentPage: state.get('freshComments').get('currentPage'),
    maxPage: state.get('freshComments').get('maxPage'),
    commentList: state.get('freshComments').get('commentList')
})

const mapActions = (dispatch) => ({
    getData(state){

        const startIndex = state.get('freshComments').get('startIndex')
        const pageScale = state.get('freshComments').get('pageScale')
        const currentPage = state.get('freshComments').get('currentPage')
        const maxPage = state.get('freshComments').get('maxPage')

        //trigger当前组件为loading状态
        const triggerIsLoadingFreshCommentsAction = createTriggerIsLoadingFreshCommentsAction(true)
        dispatch(triggerIsLoadingFreshCommentsAction)

        //请求数据
        const getFreshCommentsDataActionValue = {
            startIndex: startIndex,
            pageScale: pageScale
        }

        const getFreshCommentsDataAction = createGetFreshCommentsDataAction(getFreshCommentsDataActionValue)
        dispatch(getFreshCommentsDataAction)
    }
})

export default connect(mapState, mapActions)(FreshComments)

