import React, { PureComponent } from 'react'
import {LogoWrapper,Elem1,Elem2} from './style'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as CommonClassNameConstants from "../../../../../../commonStyle/commonClassNameConstant";


class Logo extends PureComponent {


    render() {

        const { metaColor} = this.props

        return (
                <LogoWrapper className={CommonClassNameConstants.FONT_SONG}>

                    <Elem1 style={{borderBottom: "solid 1px " + metaColor}}>
                        It's a Wonderful Life
                    </Elem1>

                    <Elem2>
                        「人生の宝物を探しにいこう」
                    </Elem2>

                </LogoWrapper>
        );
    }
}

const mapState = (state) => {
    return  {
        metaColor: state.get('header').get('metaColor'),
    }
}


export default connect(mapState)(withRouter(Logo))
