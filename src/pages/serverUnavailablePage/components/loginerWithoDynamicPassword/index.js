import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import {ButtonWrapper, GetSmsButtonWrapper, InputWrapper, LoginerWrapper} from "../../style";
import InputEX from "../../../../common/inputEX";
import {PASSWORD, PHONENUMBER} from "../../constant";
import {Button} from "../../../../common/button";



class LoginerWithDynamicPassword extends PureComponent {

    render() {

        const {phoneNumber,
            password,
            isLogging,
            alreadyLoggedIn,
            shutdownShowWarn,
            appointLoginPageInputValue,
            currentSecond,
            tryToGetSms,
            tryToLogout,
            haveGotSmsOnce,
            isMobile,
            tryToLoginWithDynamicPassword} = this.props

        return (
            <LoginerWrapper>

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
                             disabled={isLogging || alreadyLoggedIn}
                             onFocus={() => {shutdownShowWarn(PASSWORD)}}
                             onChange={(e) => {appointLoginPageInputValue(PASSWORD,e)}}/>
                    <GetSmsButtonWrapper>
                        <Button fontSize="0.8rem;"
                                backgroundColor="#EEEEEE"
                                borderColor="#EEEEEE"
                                width="6rem"
                                disabled={currentSecond > -1}
                                onClick={() => {tryToGetSms(currentSecond)}}>
                            {
                                currentSecond === -1 ?
                                    (haveGotSmsOnce ? '再试一次' : '获取动态密码')
                                    :
                                    '已发送（' + currentSecond + 's）'
                            }
                        </Button>
                    </GetSmsButtonWrapper>
                </InputWrapper>



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
                                    <Button width={isMobile ? '100%' : '6rem'}
                                            backgroundColor='#CCFFCC'
                                            borderColor='#CCFFCC'
                                            color="#009900"
                                            onClick={() => {!isLogging && tryToLoginWithDynamicPassword(phoneNumber.get('value'),password.get('value'))}}
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

export default connect(mapState, mapActions)(LoginerWithDynamicPassword)
