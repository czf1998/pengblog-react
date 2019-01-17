import React, { PureComponent } from 'react'
import { ForMoreWrapper } from './style'
import { connect } from 'react-redux'
import { CommonClassNameConstants } from '../../commonStyle'
import loadingSpin from "../loading/svg/loading-spin.svg";

class ForMore extends PureComponent{
    constructor(props){
        super(props)
        this.clickHandler = this.clickHandler.bind(this)
    }

    render() {

        const { widthOfMainArea, isLoading, noMore } = this.props

        return (
            <ForMoreWrapper widthOfMainArea={widthOfMainArea}
                            className={CommonClassNameConstants.FLEX_ROW_CENTER +
                                       CommonClassNameConstants.FONT_MIDDLE}>
                {
                    noMore ?
                        <span  style={{color:'#BB0025'}}>NO MORE TO SHOW (￣﹁￣)</span>
                    :
                        (
                            isLoading ?
                                <img src={loadingSpin} alt="Loading icon"/>
                            :
                                <span className={CommonClassNameConstants.HOVER_UNDERLINE +
                                                 CommonClassNameConstants.CURSORP}
                                      onClick={this.clickHandler}>
                                    CLICK FOR MORE づ￣ 3￣)づ
                                </span>

                        )
                }


            </ForMoreWrapper>
        )
    }

    clickHandler() {
        this.props.clickHandler(...this.props.meta)
    }
}

const mapState = (state) => {
    return {
        widthOfMainArea: state.get('rootState').get('widthOfMainArea')
    }
}

export default connect(mapState)(ForMore)