import React, { PureComponent} from 'react'
import {
    HeaderWrapper,
    HeaderMainArea, NavItem, NavItemWrapper, Info,
} from './style'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { CommonClassNameConstants } from '../../commonStyle'
import { withRouter } from 'react-router-dom'
import {Logo} from './components'
import {GapLineVertical} from "../gapLine";
import {
    createAppointModalMsgAction,
    createCleanRecycleBinAction,
    createTriggerModalIsLoadingAction,
    createTriggerShowModalAction
} from "../modal/store";
import {COMMON_MODAL} from "../modal/store/reducer";


class RecycleBinPageHeader extends PureComponent {


    render() {

        const {
                height,
                backgroundColor,
                basicUIFeatures,tryToCleanRecycleBin,recycleBinIsNull} = this.props

        return (
            <HeaderWrapper id="_header" className={CommonClassNameConstants.FLEX_ROW_ROW_CENTER}
                           height={height}
                           backgroundColor={backgroundColor}>
                <HeaderMainArea   widthOfMainArea={basicUIFeatures.get('widthOfMainArea')}>
                    <NavItemWrapper>

                        <Logo/>

                        <GapLineVertical/>

                        <NavItem style={{fontWeight:'bold'}}>
                            回收站
                        </NavItem>
                    </NavItemWrapper>

                    <NavItemWrapper>


                        <NavItem cursorp={true}>
                                <span className="iconfont"
                                      onClick={() => {tryToCleanRecycleBin(recycleBinIsNull)}}
                                      style={{fontSize:'1.4rem'}}>&#xef52;</span>
                            <Info onClick={() => {tryToCleanRecycleBin(recycleBinIsNull)}}>
                                清空回收站
                            </Info>
                        </NavItem>
                    </NavItemWrapper>

                </HeaderMainArea>
            </HeaderWrapper>
        );
    }


}

const mapState = (state) => {
    return  {
        goTo: state.get('router').get('goTo'),
        height: state.get('header').get('height'),
        backgroundColor: state.get('header').get('backgroundColor'),
        basicUIFeatures: state.get('rootState').get('basicUIFeatures'),
        recycleBinIsNull: state.get('recycleBinPage').get('recycleBinIsNull')
    }
}

const mapActions = (dispatch) => {
    return {
        tryToCleanRecycleBin(recycleBinIsNull){

            if(recycleBinIsNull){
                return
            }

            const postHandler = () => {
                const cleanRecycleBinAction = createCleanRecycleBinAction()
                dispatch(cleanRecycleBinAction)

                const modalIsLoadingAction = createTriggerModalIsLoadingAction(true)
                dispatch(modalIsLoadingAction)
            }

            const modalMsgValue = {
                modalTitle: 'warning',
                modalContent: '你正在尝试清空回收站，这是不可逆的。',
                notifyOnly: false,
                postProcessor: postHandler,
                context: COMMON_MODAL
            }


            const appointModalMsgAction = createAppointModalMsgAction(modalMsgValue)
            dispatch(appointModalMsgAction)

            const showModalAction = createTriggerShowModalAction(true)
            dispatch(showModalAction)
        }
    }
}


export default connect(mapState,mapActions)(withRouter(RecycleBinPageHeader))