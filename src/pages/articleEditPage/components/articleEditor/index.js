import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import E from 'wangeditor'
import {ArticleEditorWrapper,ToolBar,TextArea,ToolBarWrapper} from './style'
import {createAppointArticleEditorContent} from './store'
import {API_UPLOAD_IMAGE} from "../../../../store/apiConstant";
import {createAppointNoticeContent} from "../../../../store/actionCreators";

class ArticleEditor extends PureComponent{

    render(){
        return (
           <ArticleEditorWrapper>
               <ToolBarWrapper>
                   <ToolBar ref="toolBar"></ToolBar>
               </ToolBarWrapper>

               <TextArea ref="textArea"></TextArea>
           </ArticleEditorWrapper>
        )
    }

    componentDidMount(){
        initEditor(this.refs.toolBar,this.refs.textArea,this.props.appointArticleEditorContent,this.props.failNotice)
    }
}

const mapState = (state) => ({
    content: state.get('articleEditor').get('content')
})

const mapActions = (dispatch) => ({
    appointArticleEditorContent(content){
        const appointArticleEditorContentAction = createAppointArticleEditorContent(content)
        dispatch(appointArticleEditorContentAction)
    },
    failNotice(){
        const appointNoticeContent = createAppointNoticeContent('图片上传失败，详情请查看控制台')
        dispatch(appointNoticeContent)
    }
})

export default connect(mapState,mapActions)(ArticleEditor)



const initEditor = (toolBarElem, textAreaElem, changeHandler, failNotice) => {
    const articleEditor = new E(toolBarElem,textAreaElem)
    articleEditor.customConfig.onchange = (html) => {
        changeHandler(html)
    }
    articleEditor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        'video',  // 插入视频
        'code',  // 插入代码
        'undo'  // 撤销
    ]
    articleEditor.customConfig.uploadImgServer = API_UPLOAD_IMAGE
    articleEditor.customConfig.uploadFileName = 'img'
    articleEditor.customConfig.uploadImgHooks = {

        fail: function (xhr, editor, result) {
            console.log(result)
        },

        customInsert: function (insertImg, result, editor) {
            var url = result.imgUrl
            insertImg(url)

        }
    }
    articleEditor.customConfig.customAlert = function (info) {
        failNotice()
    }
    articleEditor.create()
}
