import React, { Component } from 'react'
import { HeaderWrapper } from './style'
import { connect } from 'react-redux'

class Header extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        const { height, backgroundColor } = this.props
        return (
            <HeaderWrapper height={height} backgroundColor={backgroundColor}></HeaderWrapper>
        );
    }
}

const mapState = (state) => {
    return  {
        height: state.header.height,
        backgroundColor: state.header.backgroundColor
    }
}

const mapActions = (dispatch) => {
    return {

    }
}

export default connect(mapState, mapActions)(Header)