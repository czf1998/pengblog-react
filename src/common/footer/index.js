import React, { PureComponent } from 'react'
import { FooterWrapper } from './style'
import { CommonClassNameConstants } from '../../commonStyle'


class Footer extends PureComponent {
    render() {
        return (
            <FooterWrapper className={CommonClassNameConstants.FLEX_COLUMN_CENTER}>
                <div>远方有鱼</div>
                <div style={{borderTop: "solid 1px black"}}>IS MAINTAINED BY PENG</div>
            </FooterWrapper>
        )
    }
}

export default Footer