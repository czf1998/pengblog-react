import React, { Component } from 'react'
import { HeaderWrapper, HeaderMainArea, LogoWrapper, Logo } from './style'
import { connect } from 'react-redux'

class Header extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { height, backgroundColor, widthOfMainArea } = this.props
        return (
            <HeaderWrapper className="flex-row-center" height={height} backgroundColor={backgroundColor}>
                <HeaderMainArea widthOfMainArea={widthOfMainArea}>
                    <LogoWrapper className="flex-column-center">
                        <Logo className="font-large font-song flex-column-center">远方有鱼</Logo>
                    </LogoWrapper>
                </HeaderMainArea>
            </HeaderWrapper>
        );
    }
}

const mapState = (state) => {
    return  {
        height: state.header.height,
        backgroundColor: state.header.backgroundColor,
        widthOfMainArea: state.rootState.widthOfMainArea
    }
}


export default connect(mapState)(Header)