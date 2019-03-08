import React, { Component } from 'react'
import {connect} from 'react-redux'
import {CaptchaWrapper,CaptchaImage,LoadingIconWrapper,LoadingIcon} from "./style";
import {createAppointCaptchaCodeAction,
        createGetCaptchaImageAction} from './store'
import InputEX from "../inputEX";
import {createTriggerShowCaptchaInputWarnAction} from "../../store/actionCreators";
const uuidv4 = require('uuid/v4');

class Captcha extends Component{


    render() {


        const {captchaHost,onChange,captchaManager,getCaptchaImage,shutdownWarnMsg} = this.props

        const captchaImage = captchaManager.get(captchaHost).get('captchaImage')
        const captchaCode = captchaManager.get(captchaHost).get('captchaCode')
        const isLoading = captchaManager.get(captchaHost).get('isLoading')
        const showWarn = captchaManager.get(captchaHost).get('showWarn')
        const warnMsg = captchaManager.get(captchaHost).get('warnMsg')

        return (
            <CaptchaWrapper>
                <CaptchaImage onClick={() => {getCaptchaImage(captchaHost)}}
                              captchaImage={captchaImage}
                              isLoading={isLoading}>
                    {
                        isLoading &&
                        <LoadingIconWrapper>
                            <LoadingIcon className="fa fa-spinner fa-pulse"/>
                        </LoadingIconWrapper>
                    }

                </CaptchaImage>
                <InputEX value={captchaCode}
                         placeholder="验证码"
                         type="text"
                         lineColor="#CCCCCC"
                         showWarn={showWarn}
                         warnMsg={warnMsg}
                         onFocus={() => {shutdownWarnMsg(captchaHost)}}
                         onChange={(e) => {onChange(captchaHost,e)}}/>
            </CaptchaWrapper>
        )
    }

    componentDidMount(){
        this.props.getCaptchaImage(this.props.captchaHost)
    }

}

const mapState = (state) => ({
    captchaManager: state.get('captcha')
})

const mapActions = (dispatch) => ({
    getCaptchaImage(captchaHost){
        const value = {
            captchaHost: captchaHost,
            captchaId: uuidv4()
        }
        const action = createGetCaptchaImageAction(value)
        dispatch(action)
    },
    onChange(captchaHost,e){
        const value = {
            captchaHost: captchaHost,
            captchaCode: e.target.value
        }
        const action = createAppointCaptchaCodeAction(value)
        dispatch(action)
    },
    shutdownWarnMsg(captchaHost){

        const value = {
            captchaHost: captchaHost,
            showWarn: false
        }

        const action = createTriggerShowCaptchaInputWarnAction(value)
        dispatch(action)

    }
})

export default connect(mapState,mapActions)(Captcha)

