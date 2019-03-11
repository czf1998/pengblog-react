import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import {InputEX,Button,Captcha} from '../../common'
import {LoginPageWrapper,
        ThemeJumbotron,
        Loginer,
        InputWrapper,
        CaptchaWrapper,
        CaptchaImage,
        ThemeImage,
        Gap,
        LogoWrapper,
        ButtonWrapper,
        Loading,
        GetSmsButtonWrapper} from './style'

import {createAppointLoginPageInputValueAction,
        createTriggerIsLoggingInAction,
        createLoginAction,
        createTriggerShowWarnOfInputOfLoginPageAction,
        createGetSmsAction} from './store'

import Logo from "../homeEx/components/themeJumbotron/components/logo";
import {createPushPrograssToEndAction} from "../home/store";
import themeImage from "../../static/image/background/black-and-white-nature-sky-field.jpg";
import {SLIDE_UP_FAST} from "../../commonStyle/commonClassNameConstant";
import {PASSWORD, PHONENUMBER, CAPTCHA} from "./constant";
import loadingSpin from "../../common/loading/svg/loading-spin.svg";
import {createAppointNoticeContent, createTriggerAlreadyLoggedInAction} from "../../store/actionCreators";

class LoginPage extends PureComponent {



    render() {

        const { heightOfBrowser,
                appointLoginPageInputValue,
                phoneNumber,
                password,
                tryToLogin,
                isLogging,
                alreadyLoggedIn,
                tryToLogout,shutdownShowWarn} = this.props


        return (
           <LoginPageWrapper heightOfBrowser={heightOfBrowser}>

               <ThemeJumbotron className={SLIDE_UP_FAST} themeImage={themeImage}>




                   <LogoWrapper>
                       <Logo scale={1}/>
                   </LogoWrapper>


               </ThemeJumbotron>

               <Gap/>

               <Loginer>

                   <InputWrapper>
                       <InputEX width="100%"
                                value={phoneNumber.get('value')}
                                showWarn={phoneNumber.get('showWarn')}
                                warnMsg={phoneNumber.get('warnMsg')}
                                placeholder="手机号码"
                                disabled={isLogging || alreadyLoggedIn}
                                onFocus={() => {shutdownShowWarn(PHONENUMBER)}}
                                onChange={(e) => {appointLoginPageInputValue(PHONENUMBER,e)}}/>


                   </InputWrapper>

                   <InputWrapper>
                       <InputEX width="60%"
                                value={password.get('value')}
                                showWarn={password.get('showWarn')}
                                warnMsg={password.get('warnMsg')}
                                placeholder="动态密码"
                                type="password"
                                width="100%"
                                disabled={isLogging || alreadyLoggedIn}
                                onFocus={() => {shutdownShowWarn(PASSWORD)}}
                                onChange={(e) => {appointLoginPageInputValue(PASSWORD,e)}}/>
                       <GetSmsButtonWrapper>
                           <Button fontSize="0.8rem;">
                               获取动态密码
                           </Button>
                       </GetSmsButtonWrapper>
                   </InputWrapper>

                   <Captcha captchaHost="loginPage"/>

                   <ButtonWrapper>
                       {
                           alreadyLoggedIn ?
                               <Button onClick={() => {!isLogging && tryToLogout()}}
                                       disabled={isLogging}>
                                   &nbsp;&nbsp;登出&nbsp;&nbsp;
                               </Button>
                               :
                               (
                                   isLogging ?

                                       <Button disabled={true}
                                               style={{width:'6rem'}}>
                                           &nbsp;&nbsp;请稍等&nbsp;&nbsp;
                                        </Button>
                                       :
                                       <Button style={{width:'6rem'}}
                                               onClick={() => {!isLogging && tryToLogin(phoneNumber.get('value'),password.get('value'))}}
                                               disabled={isLogging}>
                                           &nbsp;&nbsp;登录&nbsp;&nbsp;
                                       </Button>
                               )
                       }
                   </ButtonWrapper>
               </Loginer>

           </LoginPageWrapper>
        )
    }

    componentDidMount() {
        this.props.pushPrograssBarToEnd()

        //this.props.tryToGetSms()
    }


}

const mapState = (state) => ({
        browser: state.get('rootState').get('browser'),
        isMobile: state.get('rootState').get('isMobile'),
        heightOfBrowser: state.get('rootState').get('heightOfBrowser'),
        phoneNumber: state.get('loginPage').get('phoneNumber'),
        password: state.get('loginPage').get('password'),
        isLogging: state.get('loginPage').get('isLogging'),
        alreadyLoggedIn: state.get('loginPage').get('alreadyLoggedIn'),
    })

const mapActions = (dispatch) => {
    return {
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
        tryToGetSms(){
            const getSmsAction = createGetSmsAction()
            dispatch(getSmsAction)
        }
    }
}

export default connect(mapState, mapActions)(withRouter(LoginPage))
