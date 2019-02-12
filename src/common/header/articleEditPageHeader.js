import React, { PureComponent,Fragment } from 'react'
import {HeaderWrapper,
        HeaderMainArea,
        NavItem,
        NavItemWrapper,
        LogoWrapper,
        SubmitButton,
        Info } from './style'
import { connect } from 'react-redux'
import {GapLineVertical} from '../../common'
import { CommonClassNameConstants } from '../../commonStyle'
import { withRouter } from 'react-router-dom'
import {Logo} from './components'
import {saveArticle} from "../../pages/articleEditPage";
import {createTriggerIsSavingArticleAction} from "./store";


class ArticleEditPageHeader extends PureComponent {


    render() {

        const {
            height,
            backgroundColor,
            basicUIFeatures,
            widthOfBrowser,
            isSaving,
            showSaveTag,
            submitable,
            submitArticle} = this.props

        return (
            <HeaderWrapper id="_header" className={CommonClassNameConstants.FLEX_ROW_ROW_CENTER}
                           height={height}
                           backgroundColor={backgroundColor}>
                {
                    widthOfBrowser > 1030 &&
                    <LogoWrapper>
                        <Logo/>
                    </LogoWrapper>
                }



                <HeaderMainArea   widthOfMainArea={basicUIFeatures.get('widthOfMainArea')}>
                    <NavItemWrapper>
                        {
                            widthOfBrowser < 1030 &&
                            <Fragment>
                                <Logo/>
                                <GapLineVertical/>
                            </Fragment>
                        }


                            <NavItem style={{fontWeight:'bold'}}>
                                写文章
                            </NavItem>

                        {
                            showSaveTag && (isSaving ?
                                <NavItem style={{fontSize:'1rem'}}>
                                    草稿保存中 . . .
                                </NavItem>
                                :
                                <NavItem style={{fontSize:'1rem'}}>
                                    草稿已保存
                                </NavItem>)

                        }

                    </NavItemWrapper>




                    <NavItemWrapper>
                        <NavItem>
                                <SubmitButton submitable={submitable}>
                                    <span className="iconfont"
                                          style={{fontSize:'1.4rem'}}
                                          onClick={submitArticle}>&#xe600;</span>
                                    <Info onClick={submitArticle}>
                                        发布
                                    </Info>
                                </SubmitButton>
                        </NavItem>
                    </NavItemWrapper>
                </HeaderMainArea>
            </HeaderWrapper>
        );
    }

}


const mapState = (state) => {
    return  {
        height: state.get('header').get('height'),
        backgroundColor: state.get('header').get('backgroundColor'),
        basicUIFeatures: state.get('rootState').get('basicUIFeatures'),
        widthOfBrowser: state.get('rootState').get('widthOfBrowser'),
        isSaving: state.get('articleEditPage').get('isSaving'),
        showSaveTag: state.get('header').get('articleEditPageHeader').get('showSaveTag'),
        currentPath: state.get('router').get('currentPath'),
        submitable: state.get('articleEditPage').get('submitable'),
        goTo: state.get('router').get('goTo')
    }
}

const mapActions = (dispatch) => ({
    submitArticle(){
        saveArticle(dispatch,'article')
        const triggerIsSavingArticleAction = createTriggerIsSavingArticleAction(true)
        dispatch(triggerIsSavingArticleAction)
    }
})


export default connect(mapState,mapActions)(withRouter(ArticleEditPageHeader))