import React, { Component } from 'react'
import { HeaderWrapper, HeaderMainArea, LogoWrapper, Logo } from './style'
import { connect } from 'react-redux'
import * as commonClassNameConstant from '../../commonStyle/commonClassNameConstant'

class Header extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { height, backgroundColor, basicUIFeatures } = this.props
        return (
            <HeaderWrapper className={commonClassNameConstant.FLEX_ROW_ROW_CENTER} height={height} backgroundColor={backgroundColor}>
                <HeaderMainArea widthOfMainArea={basicUIFeatures.get('widthOfMainArea')}>
                        <Logo className={commonClassNameConstant.FONT_LARGE +
                                         commonClassNameConstant.FONT_SONG +
                                         commonClassNameConstant.FLEX_COLUMN_ROW_CENTER}>
                            远方有鱼
                        </Logo>
                </HeaderMainArea>
            </HeaderWrapper>
        );
    }
}

const mapState = (state) => {
    return  {
        height: state.get('header').get('height'),
        backgroundColor: state.get('header').get('backgroundColor'),
        basicUIFeatures: state.get('rootState').get('basicUIFeatures')
    }
}


export default connect(mapState)(Header)