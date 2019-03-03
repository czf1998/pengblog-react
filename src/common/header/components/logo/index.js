import React, { PureComponent } from 'react'
import {LogoWrapper} from './style'
import { connect } from 'react-redux'
import { CommonClassNameConstants } from '../../../../commonStyle'
import { withRouter } from 'react-router-dom'


class Logo extends PureComponent {


    render() {

        const { metaColor,goTo, alreadyLoggedIn} = this.props

        return (
                <LogoWrapper className={CommonClassNameConstants.FONT_LARGE +
                                CommonClassNameConstants.FONT_SONG +
                                CommonClassNameConstants.CURSORP +
                                CommonClassNameConstants.FLEX_COLUMN_CENTER}
                                metaColor={metaColor}>
                    <div onClick={() => {goTo('/')}}>
                        <span style={{color:alreadyLoggedIn ? '#CCCCCC' : metaColor, fontWeight:'bold', fontSize:'1.8rem'}}>遠</span>方有鱼
                    </div>
                    <div style={{borderTop: "solid 1px " + (alreadyLoggedIn ? '#CCCCCC' : metaColor)}}
                         className={CommonClassNameConstants.FONT_TINY}
                         onClick={() => {goTo('/')}}>
                        It's a Wonderful Life
                    </div>
                </LogoWrapper>
        );
    }
}

const mapState = (state) => {
    return  {
        metaColor: state.get('header').get('metaColor'),
        history: state.get('router').get('history'),
        goTo: state.get('router').get('goTo'),
        alreadyLoggedIn: state.get('loginPage').get('alreadyLoggedIn')
    }
}


export default connect(mapState)(withRouter(Logo))
