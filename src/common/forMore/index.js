import React, { PureComponent } from 'react'
import { ForMoreWrapper } from './style'
import { connect } from 'react-redux'
import { CommonClassNameConstants } from '../../commonStyle'
import loadingSpin from "../loading/svg/loading-spin.svg";

class ForMore extends PureComponent{

    render() {

        const { widthOfMainArea, isLoading, noMore, height, forMoreText, noMoreText, fontSize } = this.props

        return (
            <ForMoreWrapper widthOfMainArea={widthOfMainArea}
                            className={CommonClassNameConstants.FLEX_ROW_CENTER}
                            height={height} fontSize={fontSize}>
                {
                    noMore ?
                        <span  style={{color:'#BB0025'}}>
                            {
                                noMoreText ? noMoreText : 'NO MORE TO SHOW (￣﹁￣)'
                            }
                        </span>
                    :
                        (
                            isLoading ?
                                <img src={loadingSpin} alt="Loading icon"/>
                            :
                                <span className={CommonClassNameConstants.HOVER_UNDERLINE +
                                                 CommonClassNameConstants.CURSORP}
                                      onClick={this._clickHandler.bind(this)}>
                                    {
                                        forMoreText ? forMoreText : 'CLICK FOR MORE づ￣ 3￣)づ'
                                    }
                                </span>

                        )
                }


            </ForMoreWrapper>
        )
    }

    _clickHandler(){
        if(this.props.isLoading || this.props.noMore)
            return
        this.props.clickHandler(...this.props.meta)
    }

}

const mapState = (state) => {
    return {
        widthOfMainArea: state.get('rootState').get('widthOfMainArea')
    }
}

export default connect(mapState)(ForMore)