import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import E from 'wangeditor'
import {ArticleEditorWrapper,ToolBar,TextArea,ToolBarWrapper} from './style'
import {createAppointArticleEditorContent} from './store'

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
        initEditor(this.refs.toolBar,this.refs.textArea,this.props.appointArticleEditorContent)
    }
}

const initEditor = (toolBarElem, textAreaElem, changeHandler) => {
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
    articleEditor.create()
}

const mapState = (state) => ({
    content: state.get('articleEditor').get('content')
})

const mapActions = (dispatch) => ({
    appointArticleEditorContent(content){
        const appointArticleEditorContentAction = createAppointArticleEditorContent(content)
        dispatch(appointArticleEditorContentAction)
    }
})

export default connect(mapState,mapActions)(ArticleEditor)
