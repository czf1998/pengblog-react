import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import { FooterWrapper,Row,ContactMe } from './style'
import { CommonClassNameConstants } from '../../commonStyle'
import {CONTACT_ME_MODAL} from "../modal/store/reducer";
import {createAppointModalMsgAction, createTriggerShowModalAction} from "../modal/store";


class Footer extends PureComponent {


    render() {

        const {triggerContactMeModal} = this.props

        return (
            <FooterWrapper className={CommonClassNameConstants.FLEX_COLUMN_CENTER}>

                <Row><a href="http://www.miit.gov.cn/">粤ICP备18156165号</a> |&nbsp;
                    <ContactMe onClick={triggerContactMeModal}>
                        与我联系
                    </ContactMe>
                </Row>
                <Row style={{borderTop: "solid 1px grey", paddingTop:"0.2rem"}}>Copyright © 2019-2020 Kaifan Peng</Row>
            </FooterWrapper>
        )
    }
}

const mapActions = (dispatch) => ({
    triggerContactMeModal(){
        const appointModalMsgValue = {
            context: CONTACT_ME_MODAL
        }

        const appointModalMsgAction = createAppointModalMsgAction(appointModalMsgValue)
        dispatch(appointModalMsgAction)

        const triggerShowModalAction = createTriggerShowModalAction(true)
        dispatch(triggerShowModalAction)
    }
})

export default connect(null,mapActions)(Footer)