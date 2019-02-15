import React, {Fragment, PureComponent} from 'react'
import { connect } from 'react-redux'
import {ShareWrapper,ShareItem} from './style'
import {createAppointModalMsgAction} from "../../../../common/modal/store";
import {createTriggerShowModalAction} from "../../../../common/modal/store";
import {createAppointNoticeContent} from "../../../../store/actionCreators";

export const SHARE_TO_WECHAT = 'share to Wechat'

class Share extends PureComponent {

    render() {

        const {shareToWechat,copyToClipBoard} = this.props

        return (
          <ShareWrapper>
              <ShareItem color="#00bb29"><i className="fa fa-wechat" onClick={shareToWechat}/></ShareItem>
              <ShareItem color="#e05244"><i className="fa fa-weibo"/></ShareItem>
              <ShareItem color="grey"><i className="fa fa-link" onClick={copyToClipBoard}/></ShareItem>
          </ShareWrapper>
        );
    }

    componentDidMount(){

    }
}



const mapState = (state) => {
    return  {

    }
}

const mapActions = (dispatch) => ({
    shareToWechat(){

        const appointModalMsgValue = {
            modalTitle: '打开微信扫描以下二维码',
            modalContent: SHARE_TO_WECHAT
        }

        const appointModalMsgAction = createAppointModalMsgAction(appointModalMsgValue)
        dispatch(appointModalMsgAction)

        const triggerShowModalAction = createTriggerShowModalAction(true)
        dispatch(triggerShowModalAction)
    },
    copyToClipBoard(){
        const input = document.createElement('input')
        document.body.appendChild(input)
        input.setAttribute('value', window.location.href)
        input.select()
        if (document.execCommand('copy')) {
            document.execCommand('copy')
            console.log('复制成功')
            const appointNoticeContent = createAppointNoticeContent('已复制链接到剪贴板')
            dispatch(appointNoticeContent)
        }
        document.body.removeChild(input)
    }
})

export default connect(mapState, mapActions)(Share)
