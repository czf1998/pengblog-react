import React, { PureComponent } from 'react'
import { FooterWrapper,Row } from './style'
import { CommonClassNameConstants } from '../../commonStyle'


class Footer extends PureComponent {
    render() {
        return (
            <FooterWrapper className={CommonClassNameConstants.FLEX_COLUMN_CENTER}>

                <Row>粤ICP备18156165号 |&nbsp;
                    <span>
                        与我联系
                    </span>
                </Row>
                <Row style={{borderTop: "solid 1px grey", paddingTop:"0.2rem"}}>Copyright © 2019-2020 Kaifan Peng</Row>
            </FooterWrapper>
        )
    }
}

export default Footer