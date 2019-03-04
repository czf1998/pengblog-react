import React, { PureComponent} from 'react'
import { connect } from 'react-redux'
import {ModalItemWrapper,
        ModalTitle,
        ModalContent,
        CloseButton,
        OperationColumn,
        ConfirmButton,
        CancelButton,
        LoadingWraper,
        LoadingIcon} from "./style";
import loadingSpin from "../../../loading/svg/loading-spin.svg";
import {createTriggerShowModalAction} from "../../store";

class CommonModalItem extends PureComponent{

    render(){

        const {
                closeThisModal,
                modalTitle,
                modalContent,
                browser,
                postProcessor,
                isLoading} = this.props

        return (
            <ModalItemWrapper>

                <ModalTitle>
                    {modalTitle}
                </ModalTitle>

                {
                    isLoading ?
                        <LoadingWraper>
                            <LoadingIcon src={loadingSpin} alt="Loading icon"/>&nbsp;IS LOADING...
                        </LoadingWraper>
                        :
                        <ModalContent>
                            {modalContent}
                        </ModalContent>
                }

                <OperationColumn>
                    <ConfirmButton browser={browser} onClick={postProcessor}>确认</ConfirmButton>
                    <CancelButton onClick={closeThisModal}>取消</CancelButton>
                </OperationColumn>

            </ModalItemWrapper>
        )
    }

    componentDidUpdate() {

    }
}

const mapState = (state) => ({
    showModal: state.get('modal').get('showModal'),
    modalTitle: state.get('modal').get('modalTitle'),
    modalContent: state.get('modal').get('modalContent'),
    browser: state.get('rootState').get('browser'),
    postProcessor: state.get('modal').get('postProcessor'),
    isLoading: state.get('modal').get('isLoading'),
    context: state.get('modal').get('context')
})

const mapActions = (dispatch) => ({
    closeThisModal(){
        const triggerShowModalAction = createTriggerShowModalAction(false)
        dispatch(triggerShowModalAction)
    }
})

export default connect(mapState, mapActions)(CommonModalItem)
