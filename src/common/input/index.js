import React, { Component } from 'react'
import {InputWrapper,
        Inputer,
        InputIcon,
        WarnPopover,
        PopoverArrow} from "./style";
import * as CommonClassNameConstants from "../../commonStyle/commonClassNameConstant";

class Input extends Component{

    render() {

        const { type, placeholder, value, onChange, iconClassName, showWarn, warnMsg } = this.props

        return (
            <InputWrapper>

                <Inputer    type={type}
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                            showWarn={showWarn}/>

                <InputIcon>
                    <i className={CommonClassNameConstants.FONT_DARK + iconClassName}/>
                </InputIcon>

                {
                    showWarn &&
                    <WarnPopover>
                        {warnMsg ? warnMsg : '格式有误'}
                        <PopoverArrow/>
                    </WarnPopover>
                }

            </InputWrapper>
        )
    }
}

export default Input
