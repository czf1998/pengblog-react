import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {createPushPrograssToEndAction} from "../home/store";
import {ArticleEditor} from './components'
import {ArticleEditorPageWrapper,ArticleEditorWrapper,TitleImage,ArticleTitleTextArea,TitleLengthWarn} from "./style";
import * as CommonClassNameConstants from "../../commonStyle/commonClassNameConstant";
import {AutoTextarea,CountLength} from "../../exJs";
import {createAppointArticleEditTitleAction} from './store'

class ArticleEditPage extends PureComponent{

    render(){

        const {title,appointArticleEditTitle,remnantTitleLength} = this.props

        return (
            <ArticleEditorPageWrapper  className={CommonClassNameConstants.FLEX_ROW_COLUMN_CENTER}>
                <TitleImage/>

                <ArticleTitleTextArea rows="1"
                                      onKeyDown={keydownHandler}
                                      placeholder="请输入标题"
                                      id="titleTextarea"
                                      value={title}
                                      onChange={(event) => {appointArticleEditTitle(event)}}/>

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


                <ArticleEditorWrapper>
                    <ArticleEditor/>
                </ArticleEditorWrapper>

            </ArticleEditorPageWrapper>
        )
    }

    componentDidMount(){
        this.props.pushPrograssBarToEnd()
        initTitleTextarea()
    }
}

const mapState = (state) => ({
    title: state.get('articleEditPage').get('title'),
    remnantTitleLength: state.get('articleEditPage').get('remnantTitleLength')
})

const mapActions = (dispatch) => ({
    pushPrograssBarToEnd() {
        const pushPrograssBarToEndAction = createPushPrograssToEndAction({page: 'edit'})
        dispatch(pushPrograssBarToEndAction)
    },
    appointArticleEditTitle(event) {
        const appointArticleEditTitleAction = createAppointArticleEditTitleAction(event.target.value)
        dispatch(appointArticleEditTitleAction)
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
