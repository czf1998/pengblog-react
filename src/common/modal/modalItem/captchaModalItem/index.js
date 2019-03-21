import React, { PureComponent,Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {ModalItemWrapper,
        ModalTitle,Warn,CaptchaWrapper
        } from "./style";
import Captcha from '../../../captcha'
import {CancelButton, ConfirmButton, OperationColumn} from "../commonModalItem/style";
import {createTriggerModalIsLoadingAction, createTriggerShowModalAction,createSubmitCommentWithCaptchaAction} from "../../store";
import {put} from "redux-saga/effects";
import {createTriggerCommentEditorLoadingAction} from "../../../../pages/articlePage/components/commentEditor/store";



class CaptchaComment extends PureComponent{

    render(){

        const {modalTitle,modalContent,browser,multiPostProcessor,postProcessor,closeThisModal,isLoading,currentCommentEditorId} = this.props

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
                    <ConfirmButton browser={browser}
                                   isLoading={isLoading}
                                   onClick={() => {multiPostProcessor(currentCommentEditorId)}}>
                        {
                            isLoading ?
                                <i className="fa fa-spinner fa-pulse"/>
                                :
                                '确认'
                        }
                    </ConfirmButton>
                    {
                        !isLoading &&
                        <CancelButton onClick={() => {closeThisModal(currentCommentEditorId)}}>取消</CancelButton>
                    }
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
    isLoading: state.get('modal').get('isLoading'),
    currentCommentEditorId: state.get('commentEditor').get('currentCommentEditorId')
})

const mapActions = (dispatch) => ({
    closeThisModal(currentCommentEditorId){
        const triggerShowModalAction = createTriggerShowModalAction(false)
        dispatch(triggerShowModalAction)

        const triggerCommentEditorLoadingActionValue = {
            editorId: currentCommentEditorId,
            loading: false
        }
        const triggerCommentEditorLoadingAction = createTriggerCommentEditorLoadingAction(triggerCommentEditorLoadingActionValue)
        dispatch(triggerCommentEditorLoadingAction)
    },
    multiPostProcessor(currentCommentEditorId){
        const triggerModalIsLoadingAction = createTriggerModalIsLoadingAction(true)
        dispatch(triggerModalIsLoadingAction)

        const submitCommentAction = createSubmitCommentWithCaptchaAction(currentCommentEditorId)
        dispatch(submitCommentAction)
    }
})

export default connect(mapState,mapActions)(CaptchaComment)
