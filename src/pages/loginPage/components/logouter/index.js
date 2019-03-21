import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import {ButtonWrapper} from "../../style";
import {LogouterWrapper, Title, Info,CurrentAutoInfo} from './style'
import {Button,Captcha} from "../../../../common";
import {DateFormat} from "../../../../exJs";



class Logouter extends PureComponent {

    render() {

        const {isLogging,
                tryToLogout} = this.props

        let currentUser = 'unknow'

        let expireTime = 'unknow'

        if(localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null) {
            let tokenObj = JSON.parse(localStorage.getItem('token'))
            currentUser = tokenObj.username ? tokenObj.username : tokenObj.phoneNumber
            expireTime = tokenObj.expTime
        }

            return (
            <LogouterWrapper>

                <Title>
                    已登录
                </Title>


                <CurrentAutoInfo>
                    <Info>
                        <span>当前用户:&nbsp;</span>
                        <span>{currentUser}</span>
                    </Info>

                    <Info>
                        <span>过期时间:&nbsp;</span>
                        <span>{DateFormat('MM/dd hh:mm:ss',new Date(expireTime))}</span>
                    </Info>
                </CurrentAutoInfo>



                <ButtonWrapper>

                    <Button onClick={() => {tryToLogout()}}
                            disabled={isLogging}
                            backgroundColor="#FFDDE4"
                            color="#99001F"
                            width="100%"
                            borderColor="#FFDDE4">
                        <i className="fa fa-sign-out"/>&nbsp;&nbsp;登出&nbsp;&nbsp;
                    </Button>

                </ButtonWrapper>
            </LogouterWrapper>
        );
    }

    componentDidMount(){
    }
}



const mapState = (state) =>({

    isLogging: state.get('loginPage').get('isLogging')
})

const mapActions = (dispatch) => ({

})

export default connect(mapState, mapActions)(Logouter)
