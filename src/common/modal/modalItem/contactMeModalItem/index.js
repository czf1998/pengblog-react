import React, { PureComponent,Fragment } from 'react'
import { connect } from 'react-redux'
import {ModalItemWrapper,
        ModalTitle,
        Email,WechatQrcodeWrapper,
        WechatQrcode} from "./style";
import wechatQrcode from '../../../../static/image/wechatQrcode/wechatQrcode.jpg'

class ContactMeModalItem extends PureComponent{

    render(){

        const {} = this.props

        return (
            <ModalItemWrapper>

                <ModalTitle>
                    与我联系（邮件、微信）
                </ModalTitle>

                <Email>
                    <i className="fa fa-envelope"/>&nbsp;2811825214@qq.com
                </Email>

                <WechatQrcodeWrapper>
                    <WechatQrcode src={wechatQrcode}/>

                </WechatQrcodeWrapper>

            </ModalItemWrapper>
        )
    }

}

const mapState = (state) => ({
    modalTitle: state.get('modal').get('modalTitle'),
})

export default connect(mapState)(ContactMeModalItem)

