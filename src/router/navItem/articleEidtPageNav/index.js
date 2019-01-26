import React, {PureComponent,Fragment} from 'react'
import {connect} from 'react-redux'
import {ArticleEditPageNavWrapper,Info} from "./style";
import loadingSpin from "../../../common/loading/svg/loading-spin.svg";
import {createTriggerIsSavingArticleAction} from './store'

class ArticleEditPageNav extends PureComponent{

    constructor(props){
        super(props)
        this.state = {
            showSaved: true
        }
    }

    render(){

        const {goTo,currentPath,isSaving,testSave} = this.props
        const {showSaved} = this.state

        return (
                <ArticleEditPageNavWrapper>
                    {
                        currentPath === '/edit' ?
                                (
                                    isSaving ?
                                        <Fragment>
                                            {
                                                this.setState({
                                                    showSaved: true
                                                })
                                            }
                                            <img src={loadingSpin} alt="Loading icon" style={{transform:'scale(0.7)'}}/>
                                            <Info>
                                                保存中...
                                            </Info>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            {
                                                showSaved && <Info>保存成功</Info>
                                            }
                                            {
                                                nextTick(this)
                                            }
                                            {
                                                !showSaved &&
                                                <Fragment>
                                                    <span className="iconfont" onClick={() => {goTo('/edit')}}>&#xe600;</span>
                                                    <Info onClick={testSave}>
                                                        发布
                                                    </Info>
                                                </Fragment>
                                            }
                                        </Fragment>
                                )
                            :
                            <Fragment>
                                <span className="iconfont" onClick={() => {goTo('/edit')}}>&#xe67f;</span>
                                <Info onClick={() => {goTo('/edit')}}>
                                    写作
                                </Info>
                            </Fragment>
                    }
                </ArticleEditPageNavWrapper>
        )
    }

}

const mapState = (state) => ({
    currentPath: state.get('router').get('currentPath'),
    goTo: state.get('router').get('goTo'),
    isSaving: state.get('articleEditPage').get('isSaving')
})

const mapActions = (dispatch) => ({
    testSave() {
        const action = createTriggerIsSavingArticleAction(true)
        dispatch(action)
        setTimeout(() => {
            const actionn = createTriggerIsSavingArticleAction(false)
            dispatch(actionn)
        },3000)
    }
})

export default connect(mapState,mapActions)(ArticleEditPageNav)

const nextTick = (_this) => {
    setTimeout(() => {
        _this.setState({
            showSaved: false
        })
    },500)
}