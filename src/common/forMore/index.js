import React, { PureComponent } from 'react'
import { ForMoreWrapper } from './style'
import { connect } from 'react-redux'
import { CommonClassNameConstants } from '../../commonStyle'

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
                                <i className={'fa fa-spinner fa-pulse fa-2x'} style={{color:'black'}}/>
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