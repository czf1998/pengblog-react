import React, { PureComponent,Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {ModalItemWrapper,
        ModalTitle,Warn,CaptchaWrapper
        } from "./style";
import Captcha from '../../../captcha'
import {CancelButton, ConfirmButton, OperationColumn} from "../commonModalItem/style";
import {createTriggerModalIsLoadingAction, createTriggerShowModalAction} from "../../store";
import {put} from "redux-saga/effects";



class CaptchaComment extends PureComponent{

    render(){

        const {modalTitle,modalContent,browser,multiPostProcessor,postProcessor,closeThisModal,isLoading} = this.props

        return (
            <ModalItemWrapper>

                <ModalTitle>
                    {modalTitle}
                </ModalTitle>

                <CaptchaWrapper>
                    <Captcha captchaHost="modal"/>

                </CaptchaWrapper>

                {
                    modalContent !== '' && <Warn>{modalContent}</Warn>
                }
                <OperationColumn>
                    <ConfirmButton browser={browser} onClick={() => {multiPostProcessor(postProcessor)}}>
                        {
                            isLoading ?
                                <i className="fa fa-spinner fa-pulse"/>
                                :
                                '确认'
                        }
                    </ConfirmButton>
                    <CancelButton onClick={closeThisModal}>取消</CancelButton>
                </OperationColumn>

            </ModalItemWrapper>
        )
    }

}

const mapState = (state) => ({
    browser: state.get('rootState').get('browser'),
    postProcessor: state.get('modal').get('postProcessor'),
    modalTitle: state.get('modal').get('modalTitle'),
    modalContent: state.get('modal').get('modalContent'),
    isLoading: state.get('modal').get('isLoading')
})

const mapActions = (dispatch) => ({
    closeThisModal(){
        const triggerShowModalAction = createTriggerShowModalAction(false)
        dispatch(triggerShowModalAction)
    },
    multiPostProcessor(postProcessor){
        const triggerModalIsLoadingAction = createTriggerModalIsLoadingAction(true)
        dispatch(triggerModalIsLoadingAction)
        postProcessor()
    }
})

export default connect(mapState,mapActions)(CaptchaComment)
