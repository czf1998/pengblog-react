import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {FreshCommentsWrapper} from './style'
import {createTriggerIsLoadingFreshCommentsAction,
        createGetFreshCommentsDataAction} from './store'
import {ForMore} from '../../../../common'
import {FreshCommentItem} from './components'
import {SLIDE_FROM_LEFT_CSSTRANSITION} from "../../../../commonStyle/commonClassNameConstant";

class FreshComments extends PureComponent {

    render() {


        const {browser,isLoading,currentPage,maxPage,commentList,getData,state,startIndex,pageScale} = this.props

        return (
            <FreshCommentsWrapper browser={browser}>
                <TransitionGroup>
                    {
                        commentList.map((item) => {
                            return <CSSTransition key={item.get('comment_id')}
                                                  timeout={400}
                                                  classNames={SLIDE_FROM_LEFT_CSSTRANSITION}>
                                        <FreshCommentItem
                                                          comment={item}/>
                                    </CSSTransition>
                        })
                    }
                </TransitionGroup>

                <ForMore fontSize="0.9rem;"
                         isLoading={isLoading}
                         height={60}
                         noMore={currentPage >= maxPage}
                         clickHandler={() => {getData(state)}}/>
            </FreshCommentsWrapper>
        );
    }

    componentDidMount(){
        if(this.props.commentList.size !== 0){
            return
        }
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
    commentList: state.get('freshComments').get('commentList'),
    startIndex: state.get('freshComments').get('startIndex'),
    pageScale: state.get('freshComments').get('pageScale')
})

const mapActions = (dispatch) => ({
    getData(state){

        const startIndex = state.get('freshComments').get('startIndex')
        const pageScale = state.get('freshComments').get('pageScale')

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

