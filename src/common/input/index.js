import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import {InputWrapper,
        Inputer,
        InputIcon,
        WarnPopover,
        PopoverArrow,InputIconWrapper} from "./style";
import {CommonClassNameConstants} from "../../commonStyle";

class Input extends Component{

    render() {

        const {id,
                maxLenght,
                type,
                placeholder,
                fontSize,
                padding,
                value,
                onChange,
                iconClassName,
                iconColor,
                showWarn,
                warnMsg,
                onBlur,
                onFocus,
                style,
                backgroundColor,
                disableFocusStyle,
                fontColor } = this.props

        return (
            <InputWrapper style={style}>

                <Inputer id={id}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        showWarn={showWarn}
                        fontSize={fontSize}
                        padding={padding}
                        maxLenght={maxLenght}
                        backgroundColor={backgroundColor}
                        disableFocusStyle={disableFocusStyle}
                        fontColor={fontColor}/>

                <InputIconWrapper>
                    <InputIcon iconColor={iconColor}>
                        <i className={iconClassName}/>
                    </InputIcon>
                </InputIconWrapper>



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
