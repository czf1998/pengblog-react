import React, { PureComponent } from 'react'
import { FooterWrapper } from './style'
import { CommonClassNameConstants } from '../../commonStyle'


class Footer extends PureComponent {
    render() {
        return (
            <FooterWrapper className={CommonClassNameConstants.FLEX_COLUMN_CENTER +
                                      CommonClassNameConstants.FONT_MIDDLE}>
                <div>远方有鱼</div>
                <div style={{borderTop: "solid 1px black", marginTop:"3px"}}>MAINTAINED BY PENG</div>
            </FooterWrapper>
        )
    }
}

export default Footer