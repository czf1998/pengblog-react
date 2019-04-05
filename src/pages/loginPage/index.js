import React, {Fragment, PureComponent} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

import {LoginPageWrapper,
        ThemeJumbotron,
        Gap,
        LogoWrapper,LoginBar,SwitchButton,Item,Space} from './style'

import {createAppointLoginPageInputValueAction,
        createTriggerIsLoggingInAction,
        createLoginAction,
        createLoginWithDynamicPasswordAction,
        createTriggerShowWarnOfInputOfLoginPageAction,
        createGetSmsAction,
        createCountDownSmsSecondAction,createTriggerIsLoginWithDynamicPassword} from './store'

import {LoginerWithDynamicPassword,Loginer,Logouter} from './components'

import Logo from "../homeEx/components/themeJumbotron/components/logo";
import {createPushPrograssToEndAction} from "../home/store";
import {FADE_IN, SLIDE_UP_FAST} from "../../commonStyle/commonClassNameConstant";
import {PASSWORD, PHONENUMBER} from "./constant";
import {createAppointNoticeContent, createTriggerAlreadyLoggedInAction} from "../../store/actionCreators";
import {createGetCaptchaImageAction} from "../../common/captcha/store";
import {USERNAME} from "../noFoundPage/constant";

const uuidv4 = require('uuid/v4');

class LoginPage extends PureComponent {


    render() {

        const {
                appointLoginPageInputValue,
                username,
                phoneNumber,
                password,
                tryToLogin,
                tryToLoginWithDynamicPassword,
                alreadyLoggedIn,
                tryToLogout,
                shutdownShowWarn,triggerIsLoginWithDynamicPassword,loginWithDynamicPassword,
                tryToGetSms,
                haveGotSmsOnce,
                currentSecond} = this.props

        const themeImage = '\thttps://pengblogimage-1257899590.cos.ap-guangzhou.myqcloud.com/black-and-white-nature-sky-field.440ec64e.jpg'

        return (
           <LoginPageWrapper>

               <ThemeJumbotron className={SLIDE_UP_FAST} themeImage={themeImage}>




                   <LogoWrapper className={FADE_IN}>
                       <Logo scale={1}/>
                   </LogoWrapper>


               </ThemeJumbotron>

               <Gap/>


               <LoginBar>

                   {
                       alreadyLoggedIn ?

                           <Logouter tryToLogout={tryToLogout}/>

                           :

                           <Fragment>

                               <SwitchButton>
                                   <Item onClick={() => {triggerIsLoginWithDynamicPassword(false)}}
                                         active={!loginWithDynamicPassword}>账户登录</Item>
                                   <Item onClick={() => {triggerIsLoginWithDynamicPassword(true)}}
                                         active={loginWithDynamicPassword}>短信登录</Item>
                                   <Space/>
                               </SwitchButton>


                               {
                                   !loginWithDynamicPassword &&
                                   <Loginer username={username}
                                            password={password}
                                            alreadyLoggedIn={alreadyLoggedIn}
                                            shutdownShowWarn={shutdownShowWarn}
                                            appointLoginPageInputValue={appointLoginPageInputValue}
                                            tryToLogout={tryToLogout}
                                            tryToLogin={tryToLogin}/>
                               }

                               {
                                   loginWithDynamicPassword &&
                                   <LoginerWithDynamicPassword phoneNumber={phoneNumber}
                                                               password={password}
                                                               alreadyLoggedIn={alreadyLoggedIn}
                                                               shutdownShowWarn={shutdownShowWarn}
                                                               appointLoginPageInputValue={appointLoginPageInputValue}
                                                               currentSecond={currentSecond}
                                                               tryToGetSms={tryToGetSms}
                                                               tryToLogout={tryToLogout}
                                                               haveGotSmsOnce={haveGotSmsOnce}
                                                               tryToLoginWithDynamicPassword={tryToLoginWithDynamicPassword}/>
                               }

                           </Fragment>
                   }

               </LoginBar>

           </LoginPageWrapper>
        )
    }

    componentDidMount() {

        this.props.pushPrograssBarToEnd()

        this.props.initCaptcha()
    }

    componentDidUpdate(preProps){

        if(preProps.currentSecond !== this.props.currentSecond && this.props.currentSecond > -1){
            setTimeout(() => {
                this.props.countDownCurrentSmsSecond(this.props.currentSecond)
            },1000)
        }
    }


}

const mapState = (state) => ({
        browser: state.get('rootState').get('browser'),
        isMobile: state.get('rootState').get('isMobile'),
        username: state.get('loginPage').get('username'),
        phoneNumber: state.get('loginPage').get('phoneNumber'),
        password: state.get('loginPage').get('password'),
        alreadyLoggedIn: state.get('loginPage').get('alreadyLoggedIn'),
        isGettingSms: state.get('loginPage').get('isGettingSms'),
        haveGotSmsOnce: state.get('loginPage').get('haveGotSmsOnce'),
        currentSecond: state.get('loginPage').get('currentSecond'),
        loginWithDynamicPassword: state.get('loginPage').get('loginWithDynamicPassword')
    })

const mapActions = (dispatch) => {
    return {
        initCaptcha(){
            const value = {
                captchaHost: "loginPage",
                captchaId: uuidv4()
            }
            const action = createGetCaptchaImageAction(value)
            dispatch(action)
        },
        appointLoginPageInputValue(inputId,e){
            const value = {
                inputId: inputId,
                inputValue: e.target.value
            }
            const action = createAppointLoginPageInputValueAction(value)
            dispatch(action)
        },
        pushPrograssBarToEnd() {
            const pushPrograssBarToEndAction = createPushPrograssToEndAction({page: 'home'})
            dispatch(pushPrograssBarToEndAction)
        },
        tryToLoginWithDynamicPassword(phoneNumber,password){
            if(phoneNumber === ''){
                const value = {
                    inputId: PHONENUMBER,
                    showWarn: true
                }
                const triggerShowWarnOfInputOfLoginPageAction = createTriggerShowWarnOfInputOfLoginPageAction(value)
                dispatch(triggerShowWarnOfInputOfLoginPageAction)
            }
            if(password === ''){
                const value = {
                    inputId: PASSWORD,
                    showWarn: true
                }
                const triggerShowWarnOfInputOfLoginPageAction = createTriggerShowWarnOfInputOfLoginPageAction(value)
                dispatch(triggerShowWarnOfInputOfLoginPageAction)
            }

            if(phoneNumber === '' || password === ''){
                return
            }

            const triggerIsLoggingInAction = createTriggerIsLoggingInAction(true)
            dispatch(triggerIsLoggingInAction)

            const loginWithDynamicPasswordAction = createLoginWithDynamicPasswordAction()
            dispatch(loginWithDynamicPasswordAction)
        },
        tryToLogin(username,password){
            if(username === ''){
                const value = {
                    inputId: USERNAME,
                    showWarn: true
                }
                const triggerShowWarnOfInputOfLoginPageAction = createTriggerShowWarnOfInputOfLoginPageAction(value)
                dispatch(triggerShowWarnOfInputOfLoginPageAction)
            }
            if(password === ''){
                const value = {
                    inputId: PASSWORD,
                    showWarn: true
                }
                const triggerShowWarnOfInputOfLoginPageAction = createTriggerShowWarnOfInputOfLoginPageAction(value)
                dispatch(triggerShowWarnOfInputOfLoginPageAction)
            }
            if(username === '' || password === ''){
                return
            }

            const triggerIsLoggingInAction = createTriggerIsLoggingInAction(true)
            dispatch(triggerIsLoggingInAction)

            const loginAction = createLoginAction()
            dispatch(loginAction)
        },
        tryToLogout(){
            const triggerIsLoggingInAction = createTriggerIsLoggingInAction(true)
            dispatch(triggerIsLoggingInAction)

            localStorage.removeItem('token')

            const triggerAlreadyLoggedInAction = createTriggerAlreadyLoggedInAction(false)
            dispatch(triggerAlreadyLoggedInAction)

            const triggerIsLoggingInAction2 = createTriggerIsLoggingInAction(false)
            dispatch(triggerIsLoggingInAction2)

            const appointNoticeContent = createAppointNoticeContent('登出成功')
            dispatch(appointNoticeContent)
        },
        shutdownShowWarn(inputId){
            const value = {
                inputId: inputId,
                showWarn: false
            }
            const triggerShowWarnOfInputOfLoginPageAction = createTriggerShowWarnOfInputOfLoginPageAction(value)
            dispatch(triggerShowWarnOfInputOfLoginPageAction)
        },
        tryToGetSms(currentSecond){

            const getSmsAction = createGetSmsAction()
            dispatch(getSmsAction)

        },
        countDownCurrentSmsSecond(){
            const action = createCountDownSmsSecondAction()
            dispatch(action)
        },
        triggerIsLoginWithDynamicPassword(flag){

            const action = createTriggerIsLoginWithDynamicPassword(flag)

            dispatch(action)

        }
    }
}

export default connect(mapState, mapActions)(withRouter(LoginPage))
