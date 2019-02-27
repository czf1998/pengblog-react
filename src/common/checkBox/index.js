import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import {CheckBoxWrapper,CheckBoxButton} from "./style";
import {} from './store'

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

const mapState = (state) => ({

})

const mapActions = (dispatch) => ({

})

export default connect(mapState,mapActions)(CheckBox)

