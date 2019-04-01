import React, {PureComponent,Fragment} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {IpItemWrapper,
        Ip,
        DateOfBeingBanned,LiftedButton,Header,
    LiftedButtonWrapper} from './style'
import { DateFormat } from "../../../../exJs"
import {
    createAppointModalMsgAction,
    createTriggerModalIsLoadingAction,
    createTriggerShowModalAction
} from "../../../../common/modal/store";
import {createLiftedIPAction} from "../../../articlePage/components/comment/store";
import {SLIDE_UP_FAST} from "../../../../commonStyle/commonClassNameConstant";



class IpItem extends PureComponent {

    constructor(props){
        super(props)

        this.state = {
            isLifted: false
        }
    }

    render() {

        const {isMobile,ipObject, withHeader, tryToLiftedThisIP, isLoading} = this.props

        const {isLifted} = this.state

        const ip_ip = ipObject.get('ip_ip')

        const ip_isBanned = ipObject.get('ip_isBanned')

        return (
            <Fragment>

                {
                    withHeader &&
                    <Header>
                        <Ip>IP</Ip>
                        {
                            !isMobile && <DateOfBeingBanned>封禁日期</DateOfBeingBanned>
                        }
                        <LiftedButtonWrapper>操作</LiftedButtonWrapper>
                    </Header>
                }

                <IpItemWrapper  className={SLIDE_UP_FAST} >
                    <Ip isLifted={isLifted}>{ipObject.get('ip_ip')}</Ip>
                    {
                        !isMobile &&
                        <DateOfBeingBanned isLifted={isLifted}>{DateFormat('yyyy-MM-dd hh-mm',new Date(ipObject.get('ip_banTime')))}</DateOfBeingBanned>
                    }
                    <LiftedButtonWrapper>
                        <LiftedButton isLoading={isLoading} disabled={isLifted} onClick={() => tryToLiftedThisIP(ip_ip, ip_isBanned, this)}>Lifted</LiftedButton>
                    </LiftedButtonWrapper>
                </IpItemWrapper>
            </Fragment>

        )
    }

}

const mapState = (state) => ({
    isMobile: state.get('rootState').get('isMobile')
})

const mapActions = (dispatch) => {
    return {
        tryToLiftedThisIP(ip, isBanned, _this) {

            if(!isBanned){
                return
            }

            const  liftedIPPostHandler = () => {

                //trigger loading状态
                const triggerModalIsLoadingAction = createTriggerModalIsLoadingAction(true)
                dispatch(triggerModalIsLoadingAction)

                //向saga发送请求
                const value = {
                    ip: ip,
                    comment_id: undefined
                }
                const action = createLiftedIPAction(value)

                dispatch(action)

                _this.setState({
                    isLifted: true
                })
            }

            const value = {
                modalTitle: '提示',
                modalContent: '你正在尝试解封ip: ' + ip,
                postProcessor: liftedIPPostHandler
            }

            const appointModalMsgAction = createAppointModalMsgAction(value)
            dispatch(appointModalMsgAction)

            const triggerShowModalAction = createTriggerShowModalAction(true)
            dispatch(triggerShowModalAction)

        }
    }
}

export default connect(mapState, mapActions)(withRouter(IpItem))
