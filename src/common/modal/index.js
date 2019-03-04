import React, { PureComponent} from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import {ModalWrapper,
        ModalCover,
        ModalBodyWrapper,
        CloseButton} from "./style";
import {CommonClassNameConstants} from "../../commonStyle";
import {createTriggerShowModalAction} from "./store";

import {CommonModalItem,ShareToWechatModalItem,ContactMeModalItem} from './modalItem'
import {COMMON_MODAL, SHARE_TO_WECHAT_MODAL,CONTACT_ME_MODAL} from "./store/reducer";

class Modal extends PureComponent{

    render(){

        const { showModal,
                closeThisModal,
                context} = this.props

        return (
            <ModalWrapper>

                <CSSTransition in={showModal}
                               timeout={400}
                               classNames={CommonClassNameConstants.FADE_IN_CSSTRANSITION}
                               appear={true}
                               unmountOnExit>
                    <ModalCover onClick={closeThisModal}/>
                </CSSTransition>

                <CSSTransition in={showModal}
                               timeout={400}
                               classNames={CommonClassNameConstants.SLIDE_DOWN}
                               appear={true}
                               unmountOnExit>
                    <ModalBodyWrapper >

                        {
                            context === COMMON_MODAL &&
                                <CommonModalItem/>
                        }

                        {
                            context === SHARE_TO_WECHAT_MODAL &&
                                <ShareToWechatModalItem/>
                        }

                        {
                            context === CONTACT_ME_MODAL &&
                                <ContactMeModalItem/>
                        }


                        <CloseButton className="iconfont"
                                     onClick={closeThisModal}>&#xe70b;</CloseButton>

                    </ModalBodyWrapper>
                </CSSTransition>

            </ModalWrapper>
        )
    }

}

const mapState = (state) => ({
    showModal: state.get('modal').get('showModal'),
    context: state.get('modal').get('context')
})

const mapActions = (dispatch) => ({
    closeThisModal(){
        const triggerShowModalAction = createTriggerShowModalAction(false)
        dispatch(triggerShowModalAction)
    }
})

export default connect(mapState, mapActions)(Modal)
