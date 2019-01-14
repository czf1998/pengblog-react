import React, { Component } from 'react'
import {TextareaWrapper,
        WarnPopover,
        PopoverArrow,Textarear} from "./style";

class Textarea extends Component{

    render() {

        const { placeholder, value, onChange, showWarn, warnMsg, rows, onBlur, onFocus } = this.props

        return (
            <TextareaWrapper>

                <Textarear  placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                            showWarn={showWarn}
                            rows={rows}
                            onBlur={onBlur}
                            onFocus={onFocus}/>


                {
                    showWarn &&
                    <WarnPopover>
                        {warnMsg ? warnMsg : '格式有误'}
                        <PopoverArrow/>
                    </WarnPopover>
                }

            </TextareaWrapper>
        )
    }
}

export default Textarea
