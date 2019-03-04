import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import {ShareWrapper,ShareItem} from './style'
import {createAppointModalMsgAction} from "../../../../common/modal/store";
import {createTriggerShowModalAction} from "../../../../common/modal/store";
import {createAppointNoticeContent} from "../../../../store/actionCreators";
import Clipboard from 'clipboard'
import {SHARE_TO_WECHAT_MODAL} from "../../../../common/modal/store/reducer";


export const SHARE_TO_WECHAT = 'share to Wechat'

class Share extends PureComponent {

    render() {

        const {shareToWechat,title,previewImageUrl} = this.props

        return (
          <ShareWrapper>
              <ShareItem color="#00bb29" onClick={shareToWechat}>
                  <i className="fa fa-wechat"/>
              </ShareItem>
              <ShareItem color="#e05244" onClick={() => {shareToWeibo(title,previewImageUrl)}}>
                  <i className="fa fa-weibo"/>
              </ShareItem>
              <ShareItem color="grey" id="copyLinkBtn" data-clipboard-text={window.location.href}>
                  <i className="fa fa-link"/>
              </ShareItem>

          </ShareWrapper>
        );
    }

    componentDidMount(){
        this.props.initClipboard()
    }
}



const mapState = (state) => {
    return  {
        title: state.get('articlePage').get('article').get('article_title'),
        previewImageUrl: state.get('articlePage').get('article').get('article_previewImageUrl')
    }
}

const mapActions = (dispatch) => ({
    shareToWechat(){

        const appointModalMsgValue = {
            modalTitle: '打开微信扫描以下二维码',
            modalContent: SHARE_TO_WECHAT,
            context: SHARE_TO_WECHAT_MODAL
        }

        const appointModalMsgAction = createAppointModalMsgAction(appointModalMsgValue)
        dispatch(appointModalMsgAction)

        const triggerShowModalAction = createTriggerShowModalAction(true)
        dispatch(triggerShowModalAction)
    },
    initClipboard(){
        var btn = document.getElementById('copyLinkBtn');
        var clipboard = new Clipboard(btn)

        clipboard.on('success', function(e) {
            const appointNoticeContent = createAppointNoticeContent('链接已复制到剪贴板')
            dispatch(appointNoticeContent)
        });

        clipboard.on('error', function(e) {
            const appointNoticeContent = createAppointNoticeContent('链接复制失败')
            dispatch(appointNoticeContent)
        });
    }
})

export default connect(mapState, mapActions)(Share)

const shareToWeibo = (title, picUrl) => {
    let shareToXinLangWeiboUrl = 'http://v.t.sina.com.cn/share/share.php?'
    shareToXinLangWeiboUrl = shareToXinLangWeiboUrl + 'title=我正在阅读文章:' + title + '，出自彭凯帆的博客www.pengblog.xyz。  -- '
    shareToXinLangWeiboUrl = shareToXinLangWeiboUrl + '&url=' + window.location.href
    shareToXinLangWeiboUrl = shareToXinLangWeiboUrl + '&content=utf-8&sourceUrl=' + window.location.href
    if(picUrl !== undefined)
        shareToXinLangWeiboUrl = shareToXinLangWeiboUrl + '&pic=' + picUrl

    window.open(shareToXinLangWeiboUrl,'newwindow','height=400,width=400,top=100,left=100');
}
