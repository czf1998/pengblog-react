import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {ModalItemWrapper,
        ModalTitle,
        QrcodeContainer} from "./style";
import QRCode from 'qrcodejs2'

class ShareToWechatModalItem extends PureComponent{

    render(){

        const {
                modalTitle,
            } = this.props

        return (
            <ModalItemWrapper>

                <ModalTitle>
                    {modalTitle}
                </ModalTitle>

                <QrcodeContainer id="qrcode"/>

            </ModalItemWrapper>
        )
    }

    componentDidMount() {
        initQrcode()
    }
}

const mapState = (state) => ({
    modalTitle: state.get('modal').get('modalTitle'),
})

export default connect(mapState)(ShareToWechatModalItem)

const initQrcode = () => {

    let qrcode = new QRCode(document.getElementById('qrcode'), {
        width: 180, //图像宽度
        height: 180, //图像高度
        colorDark : "#000000", //前景色
        colorLight : "#ffffff", //背景色
        typeNumber:4,
        correctLevel : QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
    })

    qrcode.clear() //清除二维码
    qrcode.makeCode(window.location.href) //生成另一个新的二维码
}