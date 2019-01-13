import React, { Component } from 'react'
import { InputWrapper, Inputer, InputIcon } from "./style";
import * as CommonClassNameConstants from "../../commonStyle/commonClassNameConstant";

class Input extends Component{

    render() {

        const { type, placeholder, value, onChange, iconClassName } = this.props

        return (
            <InputWrapper>

                <Inputer type={type}
                       placeholder={placeholder}
                       value={value}
                       onChange={onChange}/>

                <InputIcon>
                    <i className={CommonClassNameConstants.FONT_DARK + iconClassName}/>
                </InputIcon>

            </InputWrapper>
        )
    }
}

export default Input
