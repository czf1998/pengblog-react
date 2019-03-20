import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import {ButtonWrapper, InputWrapper, LoginerWrapper,CaptchaWrapper} from "../../style";
import InputEX from "../../../../common/inputEX";
import {PASSWORD, USERNAME} from "../../constant";
import {Button,Captcha} from "../../../../common";



class Loginer extends PureComponent {

    render() {

        const { isMobile,
                username,
                password,
                isLogging,
                alreadyLoggedIn,
                shutdownShowWarn,
                appointLoginPageInputValue,
                tryToLogout,
                tryToLogin} = this.props

        return (
            <LoginerWrapper>

                <InputWrapper>
                    <InputEX width="100%"
                             value={username.get('value')}
                             showWarn={username.get('showWarn')}
                             warnMsg={username.get('warnMsg')}
                             placeholder="用户名"
                             disabled={isLogging || alreadyLoggedIn}
                             onFocus={() => {shutdownShowWarn(USERNAME)}}
                             onChange={(e) => {appointLoginPageInputValue(USERNAME,e)}}/>


                </InputWrapper>

                <InputWrapper>
                    <InputEX width="100%"
                             value={password.get('value')}
                             showWarn={password.get('showWarn')}
                             warnMsg={password.get('warnMsg')}
                             placeholder="密码"
                             type="password"
                             disabled={isLogging || alreadyLoggedIn}
                             onFocus={() => {shutdownShowWarn(PASSWORD)}}
                             onChange={(e) => {appointLoginPageInputValue(PASSWORD,e)}}/>
                </InputWrapper>

                <CaptchaWrapper>
                    <Captcha captchaHost="loginPage" manualInit={true}/>
                </CaptchaWrapper>

                <ButtonWrapper>
                    {
                        alreadyLoggedIn ?
                            <Button onClick={() => {!isLogging && tryToLogout()}}
                                    disabled={isLogging}
                                    backgroundColor="#FFDDE4"
                                    color="#99001F"
                                    width={isMobile ? '100%' : '6rem'}
                                    borderColor="#FFDDE4">
                                <i className="fa fa-sign-out"/>&nbsp;&nbsp;登出&nbsp;&nbsp;
                            </Button>
                            :
                            (
                                isLogging ?

                                    <Button disabled={true}
                                            backgroundColor='#CCFFCC'
                                            borderColor='#CCFFCC'
                                            color="#009900"
                                            width={isMobile ? '100%' : '6rem'}>
                                        &nbsp;&nbsp;请稍等&nbsp;&nbsp;
                                    </Button>
                                    :
                                    <Button
                                            backgroundColor='#CCFFCC'
                                            borderColor='#CCFFCC'
                                            color="#009900"
                                            width={isMobile ? '100%' : '6rem'}
                                            onClick={() => {!isLogging && tryToLogin(username.get('value'),password.get('value'))}}
                                            disabled={isLogging}>
                                        <i className='fa fa-sign-in'/>&nbsp;&nbsp;登录&nbsp;&nbsp;
                                    </Button>
                            )
                    }
                </ButtonWrapper>
            </LoginerWrapper>
        );
    }

}



const mapState = (state) =>({
    isMobile: state.get('rootState').get('isMobile'),
    isLogging: state.get('loginPage').get('isLogging')
})

const mapActions = (dispatch) => ({

})

export default connect(mapState, mapActions)(Loginer)
