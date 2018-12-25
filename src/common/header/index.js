import React, { Component } from 'react'
import { HeaderWrapper, HeaderMainArea, LogoWrapper } from './style'
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
                    <LogoWrapper></LogoWrapper>
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

const mapActions = (dispatch) => {
    return {

    }
}

export default connect(mapState, mapActions)(Header)