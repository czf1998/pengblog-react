import React, {Fragment, PureComponent} from 'react'
import { connect } from 'react-redux'
import {withRouter,Link,Route} from 'react-router-dom'

import {InputEX,Button,Captcha} from '../../common'
import {LoginPageWrapper,
        ThemeJumbotron,
        LoginerWrapper,
        InputWrapper,
        Gap,
        LogoWrapper,LoginBar,SwitchButton,Item,Space,
        ButtonWrapper,
        GetSmsButtonWrapper} from './style'

import {createAppointLoginPageInputValueAction,
        createTriggerIsLoggingInAction,
        createLoginAction,
        createLoginWithDynamicPasswordAction,
        createTriggerShowWarnOfInputOfLoginPageAction,
        createGetSmsAction,
        createCountDownSmsSecondAction} from './store'

import {LoginerWithDynamicPassword,Loginer,Logouter} from './components'

import Logo from "../homeEx/components/themeJumbotron/components/logo";
import {createPushPrograssToEndAction} from "../home/store";
import themeImage from "../../static/image/background/black-and-white-nature-sky-field.jpg";
import {FADE_IN, SLIDE_UP_FAST} from "../../commonStyle/commonClassNameConstant";
import {PASSWORD, PHONENUMBER, CAPTCHA} from "./constant";
import loadingSpin from "../../common/loading/svg/loading-spin.svg";
import {createAppointNoticeContent, createTriggerAlreadyLoggedInAction} from "../../store/actionCreators";
import {createGetCaptchaImageAction} from "../../common/captcha/store";

const uuidv4 = require('uuid/v4');

class LoginPage extends PureComponent {

    constructor(props){
        super(props)
        this.state = {
            loginWithDynamicPassword: false
        }
        this.triggerLoginModern = this.triggerLoginModern.bind(this)
    }

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
                shutdownShowWarn,
                tryToGetSms,
                haveGotSmsOnce,
                currentSecond} = this.props

        const {loginWithDynamicPassword} = this.state

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
                                   <Item onClick={() => {this.triggerLoginModern(false)}}
                                         active={!loginWithDynamicPassword}>账户登录</Item>
                                   <Item onClick={() => {this.triggerLoginModern(true)}}
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

    triggerLoginModern(flag){

        this.setState({
            loginWithDynamicPassword: flag
        })

    }


}

const mapState = (state) => ({
        browser: state.get('rootState').get('browser'),
        isMobile: state.get('rootState').get('isMobile'),
        //heightOfBrowser: state.get('rootState').get('heightOfBrowser'),
        username: state.get('loginPage').get('username'),
        phoneNumber: state.get('loginPage').get('phoneNumber'),
        password: state.get('loginPage').get('password'),
        alreadyLoggedIn: state.get('loginPage').get('alreadyLoggedIn'),
        isGettingSms: state.get('loginPage').get('isGettingSms'),
        haveGotSmsOnce: state.get('loginPage').get('haveGotSmsOnce'),
        currentSecond: state.get('loginPage').get('currentSecond'),
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
        tryToLoginWithDynamicPassword(username,password){
            if(username === ''){
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

            if(username === '' || password === ''){
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
        }
    }
}

export default connect(mapState, mapActions)(withRouter(LoginPage))
