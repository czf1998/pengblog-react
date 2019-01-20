import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import {InputWrapper,
        Inputer,
        InputIcon,
        WarnPopover,
        PopoverArrow} from "./style";
import {CommonClassNameConstants} from "../../commonStyle";

class Input extends Component{

    render() {

        const { type, placeholder, value, onChange, iconClassName, showWarn, warnMsg, onBlur, onFocus, style } = this.props

        return (
            <InputWrapper style={style}>

                <Inputer    type={type}
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            showWarn={showWarn}/>

                <InputIcon>
                    <i className={CommonClassNameConstants.FONT_DARK + iconClassName}/>
                </InputIcon>


                    <CSSTransition in={showWarn}
                                   timeout={200}
                                   classNames={CommonClassNameConstants.SLIDE_ZOOM_LEFT}
                                   appear={true}
                                   unmountOnExit>
                        <WarnPopover>
                            {warnMsg ? warnMsg : '格式有误'}
                            <PopoverArrow/>
                        </WarnPopover>
                    </CSSTransition>


            </InputWrapper>
        )
    }
}

export default Input
