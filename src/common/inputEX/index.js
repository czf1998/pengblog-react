import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import {InputWrapper,
        Inputer,Line,Color,
        InputIcon,
        WarnPopover,
        PopoverArrow,InputIconWrapper} from "./style";
import {CommonClassNameConstants} from "../../commonStyle";

class InputEX extends Component{

    constructor(props){
        super(props)
        this.state = {
            isFocus: false
        }
        this.focusHandler = this.focusHandler.bind(this)
        this.blurHandler = this.blurHandler.bind(this)
    }

    render() {

        const { width,
                id,
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
                style,
                disabled,
                backgroundColor,
                disableFocusStyle,
                fontColor,
                lineColor } = this.props

        const {isFocus} = this.state

        return (
            <InputWrapper style={style} width={width}>

                <Inputer autocomplete="false" readonly
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        onFocus={this.focusHandler}
                        onBlur={this.blurHandler}
                        showWarn={showWarn}
                        fontSize={fontSize}
                        padding={padding}
                        maxLenght={maxLenght}
                        backgroundColor={backgroundColor}
                        disableFocusStyle={disableFocusStyle}
                        fontColor={fontColor}
                        disabled={disabled}
                        isFocus={isFocus}/>

                <Line>
                    <Color isFocus={isFocus} lineColor={lineColor}/>
                </Line>

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

    focusHandler(){
        this.setState({
            isFocus: true
        })
        this.props.onFocus && this.props.onFocus()
    }

    blurHandler(){
        this.setState({
            isFocus: false
        })
        this.props.onBlur && this.props.onBlur()
    }
}

export default InputEX
