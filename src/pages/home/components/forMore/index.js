import React, { PureComponent } from 'react'
import { CSSTransition } from 'react-transition-group'
import { ForMoreWrapper } from './style'
import { connect } from 'react-redux'
import { CommonClassNameConstants } from '../../../../commonStyle'

class ForMore extends PureComponent{

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
                                                 CommonClassNameConstants.CURSORP}>
                                    CLICK FOR MORE づ￣ 3￣)づ
                                </span>

                        )
                }


            </ForMoreWrapper>
        )
    }
}

const mapState = (state) => {
    return {
        widthOfMainArea: state.get('rootState').get('widthOfMainArea')
    }
}

export default connect(mapState)(ForMore)