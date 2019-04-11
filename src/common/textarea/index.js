import React, { Component } from 'react'
import {TextareaWrapper,
        WarnPopover,
        PopoverArrow,Textarear} from "./style";
import { CSSTransition } from 'react-transition-group'
import { CommonClassNameConstants } from "../../commonStyle";

class Textarea extends Component{

    render() {

        const { placeholder, value, onChange, showWarn, warnMsg, rows, onBlur, onFocus, maxlength } = this.props

        return (
            <TextareaWrapper>

                <Textarear  placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                            showWarn={showWarn}
                            rows={rows}
                            maxLength={maxlength}
                            onBlur={onBlur}
                            onFocus={onFocus}/>


                <CSSTransition in={showWarn}
                               timeout={200}
                               classNames={CommonClassNameConstants.SLIDE_ZOOM_LEFT} appear={true} unmountOnExit>
                    <WarnPopover>
                        {warnMsg ? warnMsg : '格式有误'}
                        <PopoverArrow/>
                    </WarnPopover>
                </CSSTransition>

            </TextareaWrapper>
        )
    }
}

export default Textarea
