import React, { PureComponent} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

import {NoFoundPageWrapper, Image, Title} from './style'

import {createPushPrograssToEndAction} from "../home/store";


class ServerUnavailablePage extends PureComponent {


    render() {

        const imageUrl = 'https://pengblogimage-1257899590.cos.ap-guangzhou.myqcloud.com/503.png'

        return (
          <NoFoundPageWrapper>
              <Image src={imageUrl}/>
              <Title>503 TAKE A BREAK</Title>
          </NoFoundPageWrapper>
        )
    }

    componentDidMount() {
        this.props.pushPrograssBarToEnd()
    }


}

const mapState = (state) => ({

    })

const mapActions = (dispatch) => {
    return {
        pushPrograssBarToEnd() {
            const pushPrograssBarToEndAction = createPushPrograssToEndAction({page: 'home'})
            dispatch(pushPrograssBarToEndAction)
        }
    }
}

export default connect(mapState, mapActions)(withRouter(ServerUnavailablePage))
