import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import {CheckBoxWrapper,CheckBoxButton} from "./style";

class CheckBox extends PureComponent{



    render() {


        const {isSelected, selecter} = this.props

        return (
            <CheckBoxWrapper>
                {
                    isSelected ?
                        <CheckBoxButton onClick={() => {selecter(false)}}
                           className="fa fa-check-square-o"/>
                    :
                        <CheckBoxButton onClick={() => {selecter(true)}}
                           className="fa fa-square-o"/>
                }
            </CheckBoxWrapper>
        )
    }


}


export default connect()(CheckBox)

