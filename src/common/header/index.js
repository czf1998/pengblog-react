import React, { Component } from 'react'
import { HeaderWrapper } from './style'
import { connect } from 'react-redux'

class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            height: '60px',
            backgroundColor: 'red'
        }
    }
    render() {
        const { height, backgroundColor } = this.state
        return (
            <HeaderWrapper height={height} backgroundColor={backgroundColor}></HeaderWrapper>
        );
    }
}

export default connect()(Header)