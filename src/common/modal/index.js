import React, { PureComponent,Fragment } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import {ModalWrapper,
        ModalCover,
        ModalBodyWrapper,
        ModalTitle,
        ModalContent,
        CloseButton,
        QrcodeContainer,
        OperationColumn,
        ConfirmButton,
        CancelButton,
        LoadingWraper,
        LoadingIcon} from "./style";
import {CommonClassNameConstants} from "../../commonStyle";
import {createTriggerShowModalAction} from "./store";
import {SHARE_TO_WECHAT} from "../../pages/articlePage/components/share";
import QRCode from 'qrcodejs2'
import loadingSpin from "../loading/svg/loading-spin.svg";
import {FADE_IN} from "../../commonStyle/commonClassNameConstant";

class Modal extends PureComponent{

    render(){

        const {showModal,
                closeThisModal,
                modalTitle,
                modalContent,
                onlyQrcode,
                browser,
                postProcessor,
                isLoading} = this.props

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

                        <ModalTitle>
                            {modalTitle}
                        </ModalTitle>

                        {
                            onlyQrcode ?
                                <QrcodeContainer id="qrcode"/>
                                :
                                (
                                    isLoading ?
                                        <LoadingWraper>
                                            <LoadingIcon src={loadingSpin} alt="Loading icon"/>&nbsp;IS LOADING...
                                        </LoadingWraper>
                                        :
                                        <ModalContent>
                                            {modalContent}
                                        </ModalContent>
                                )

                        }

                        {
                            !onlyQrcode &&
                            <OperationColumn>
                                <ConfirmButton browser={browser} onClick={postProcessor}>确认</ConfirmButton>
                                <CancelButton onClick={closeThisModal}>取消</CancelButton>
                            </OperationColumn>
                        }



                        <CloseButton className="iconfont"
                                     onClick={closeThisModal}>&#xe70b;</CloseButton>

                    </ModalBodyWrapper>
                </CSSTransition>

            </ModalWrapper>
        )
    }

    componentDidUpdate() {
        if(this.props.modalContent === SHARE_TO_WECHAT && this.props.showModal){
            initQrcode()
        }
    }
}

const mapState = (state) => ({
    showModal: state.get('modal').get('showModal'),
    modalTitle: state.get('modal').get('modalTitle'),
    modalContent: state.get('modal').get('modalContent'),
    onlyQrcode: state.get('modal').get('onlyQrcode'),
    browser: state.get('rootState').get('browser'),
    postProcessor: state.get('modal').get('postProcessor'),
    isLoading: state.get('modal').get('isLoading')
})

const mapActions = (dispatch) => ({
    closeThisModal(){
        const triggerShowModalAction = createTriggerShowModalAction(false)
        dispatch(triggerShowModalAction)
    }
})

export default connect(mapState, mapActions)(Modal)

const initQrcode = () => {

    let qrcode = new QRCode(document.getElementById('qrcode'), {
        width: 180, //图像宽度
        height: 180, //图像高度
        colorDark : "#000000", //前景色
        colorLight : "#ffffff", //背景色
        typeNumber:4,
        correctLevel : QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
    })
    qrcode.clear() //清除二维码
    qrcode.makeCode(window.location.href) //生成另一个新的二维码
}