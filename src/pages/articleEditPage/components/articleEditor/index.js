import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import E from 'wangeditor'
import {ArticleEditorWrapper,ToolBar,TextArea,ToolBarWrapper} from './style'
import {createAppointArticleEditorContent,createAppointArticleEditorAction} from './store'
import {API_UPLOAD_IMAGE} from "../../../../store/apiConstant";
import {createAppointNoticeContent} from "../../../../store/actionCreators";
import {checkIfSubmitable, saveArticle} from "../../index";
import {getToken} from "../../../../store/request/articleRequest";

class ArticleEditor extends PureComponent{

    render(){

        const {isMobile} = this.props
        return (
           <ArticleEditorWrapper>
               <ToolBarWrapper isMobile={isMobile}>
                   <ToolBar ref="toolBar" isMobile={isMobile}/>
               </ToolBarWrapper>

               <TextArea ref="textArea">
               </TextArea>
           </ArticleEditorWrapper>
        )
    }

    componentWillUnmount(){
        this.props.appointArticleEditor(undefined)
    }

    componentDidMount(){
            initEditor( this.refs.toolBar,
                this.refs.textArea,
                this.props.appointArticleEditorContent,
                this.props.failNotice,
                this.props.appointArticleEditor,
                this.props.widthOfBrowser)
    }
}

const mapState = (state) => ({
    content: state.get('articleEditor').get('content'),
    articleEditor: state.get('articleEditor').get('editor'),
    widthOfBrowser: state.get('rootState').get('widthOfBrowser'),
    isMobile: state.get('rootState').get('isMobile')
})

const mapActions = (dispatch) => ({
    appointArticleEditorContent(content){
        const appointArticleEditorContentAction = createAppointArticleEditorContent(content)
        dispatch(appointArticleEditorContentAction)
        saveArticle(dispatch,'draft')
        checkIfSubmitable(dispatch)
    },
    failNotice(){
        const appointNoticeContent = createAppointNoticeContent('图片上传失败，详情请查看控制台')
        dispatch(appointNoticeContent)
    },
    appointArticleEditor(editor){
        const appointArticleEditorAction = createAppointArticleEditorAction(editor)
        dispatch(appointArticleEditorAction)
    }
})

export default connect(mapState,mapActions)(ArticleEditor)



const initEditor = (toolBarElem,
                    textAreaElem,
                    changeHandler,
                    failNotice,
                    articleEditorAppointer,
                    widthOfBrowser) => {
    const articleEditor = new E(toolBarElem,textAreaElem)
    articleEditor.customConfig.onchange = (html) => {
        changeHandler(html)
    }

    let allMenus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'image',  // 插入图片
        'code',  // 插入代码
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'justify',  // 对齐方式
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'quote',  // 引用
        'video',  // 插入视频
        'undo',  // 撤销
        'table',  // 表格
        'list',  // 列表
    ]

    if(widthOfBrowser <= 750){
        allMenus = [
            'image',
            'video'
        ]
    }

    articleEditor.customConfig.menus = allMenus

    articleEditor.customConfig.uploadImgServer = API_UPLOAD_IMAGE
    articleEditor.customConfig.uploadFileName = 'img'
    articleEditor.customConfig.uploadImgHeaders = {
        'Authorization': getToken()
    }
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

    articleEditor.customConfig.zIndex = 1

    setTimeout(() => {

        articleEditor.create()

        //articleEditor.$textElem.attr('contenteditable', false)

        articleEditorAppointer(articleEditor)

    }, 500)

}
