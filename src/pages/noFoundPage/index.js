import React, { PureComponent} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

import {NoFoundPageWrapper, Image, Title} from './style'

import {createPushPrograssToEndAction} from "../home/store";


class NoFoundPage extends PureComponent {


    render() {


        const imageUrl = 'https://pengblogimage-1257899590.cos.ap-guangzhou.myqcloud.com/box_PNG132.png'

        return (
          <NoFoundPageWrapper>
              <Image src={imageUrl}/>
              <Title>404 NOT FOUND</Title>
          </NoFoundPageWrapper>
        )
    }

    componentDidMount() {
        this.props.pushPrograssBarToEnd()
    }


}



const mapActions = (dispatch) => {
    return {
        pushPrograssBarToEnd() {
            const pushPrograssBarToEndAction = createPushPrograssToEndAction({page: 'home'})
            dispatch(pushPrograssBarToEndAction)
        }
    }
}

export default connect(mapActions)(withRouter(NoFoundPage))
