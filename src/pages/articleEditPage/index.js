import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {createPushPrograssToEndAction} from "../home/store";
import {ArticleEditor,TitleImage} from './components'
import {ArticleEditorPageWrapper,
        ArticleEditorWrapper,
        TitleImageWrapper,
        ArticleTitleTextArea,
        TitleLengthWarn,
        ArticleMetaWrapper,
        ArticleMetaInput,Gap} from "./style";
import {CommonClassNameConstants} from "../../commonStyle";
import {AutoInput, AutoTextarea} from "../../exJs";
import {createAppointArticleEditInfoAction} from './store'
import { TITLE,LABEL,AUTHOR} from './constant'


class ArticleEditPage extends PureComponent{

    render(){

        const { title,
                appointArticleEditInfo,
                maxTitleLength,
                label,
                author} = this.props

        let remnantTitleLength = maxTitleLength - title.length


        return (
            <ArticleEditorPageWrapper  className={CommonClassNameConstants.FLEX_ROW_COLUMN_CENTER}>

                <TitleImageWrapper>
                    <TitleImage/>
                </TitleImageWrapper>

                <ArticleTitleTextArea rows="1"
                                      onKeyDown={keydownHandler}
                                      placeholder="请输入标题"
                                      id="titleTextarea"
                                      value={title}
                                      onChange={(event) => {appointArticleEditInfo(event, TITLE)}}/>

                {
                    remnantTitleLength < 20 &&
                    <TitleLengthWarn className={CommonClassNameConstants.FONT_DARK}>
                        {
                            remnantTitleLength  > 0 ?
                            <span>还可以输入{remnantTitleLength}个字</span>
                                :
                            <span style={{color:'red'}}>已超过{-remnantTitleLength}个字</span>
                        }

                    </TitleLengthWarn>
                }

                <ArticleMetaWrapper>
                    <ArticleMetaInput id='labelInput'
                                      value={label}
                                      onChange={(event) => {appointArticleEditInfo(event, LABEL)}}
                                      placeholder="标签"
                                      type="text"
                                      maxLength={11}/>
                    <Gap>&nbsp;/&nbsp;</Gap>
                    <ArticleMetaInput id='authorInput'
                                      value={author}
                                      onChange={(event) => {appointArticleEditInfo(event, AUTHOR)}}
                                      placeholder="署名"
                                      type="text"
                                      maxLength={20}/>
                </ArticleMetaWrapper>

                <ArticleEditorWrapper>
                    <ArticleEditor/>
                </ArticleEditorWrapper>

            </ArticleEditorPageWrapper>
        )
    }

    componentDidMount(){
        this.props.pushPrograssBarToEnd()
        initTitleTextarea()
        initMetaInput()
    }
}

const mapState = (state) => ({
    title: state.get('articleEditPage').get('title'),
    maxTitleLength: state.get('articleEditPage').get('maxTitleLength'),
    label: state.get('articleEditPage').get('label'),
    author: state.get('articleEditPage').get('author')
})

const mapActions = (dispatch) => ({
    pushPrograssBarToEnd() {
        const pushPrograssBarToEndAction = createPushPrograssToEndAction({page: 'edit'})
        dispatch(pushPrograssBarToEndAction)
    },
    appointArticleEditInfo(event, infoType) {
        const appointArticleEditInfoActionValue = {
            infoType: infoType,
            infoValue: event.target.value
        }
        const appointArticleEditInfoAction = createAppointArticleEditInfoAction(appointArticleEditInfoActionValue)
        dispatch(appointArticleEditInfoAction)
    }
})

export default connect(mapState,mapActions)(ArticleEditPage)



const keydownHandler = (event) => {
    if(event.keyCode === 13){
        if (window.event) {
            window.event.returnValue = false;
        } else {
            event.preventDefault(); //for firefox
        }
    }
}

const initTitleTextarea = () => {
    let titleTextarea = document.getElementById("titleTextarea")
    AutoTextarea(titleTextarea)
}

const initMetaInput = () => {
    let labelInput = document.getElementById('labelInput')
    let authorInput = document.getElementById('authorInput')
    AutoInput(labelInput,26)
    AutoInput(authorInput,26)
}
