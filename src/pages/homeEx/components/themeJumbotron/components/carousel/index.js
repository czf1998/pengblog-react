import React, { PureComponent } from 'react'
import {SwiperWrapper} from './style'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


class Carousel extends PureComponent {


    render() {

        const { metaColor} = this.props

        return (
                <SwiperWrapper>



                </SwiperWrapper>
        );
    }


}

const mapState = (state) => {
    return  {
        metaColor: state.get('header').get('metaColor'),
    }
}


export default connect(mapState)(withRouter(Carousel))
