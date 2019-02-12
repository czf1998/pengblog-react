import React, {Fragment, PureComponent} from 'react'
import {
    HeaderWrapper,
    HeaderMainArea,
    NavItem,
    NavItemWrapper, Info
} from './style'
import { connect } from 'react-redux'
import { CommonClassNameConstants } from '../../commonStyle'
import { withRouter } from 'react-router-dom'
import {Logo} from './components'
import {SubmitButton} from "../../pages/articlePage/components/comment/components/subCommentEditor/style";

class MobileHeader extends PureComponent {


    render() {

        const {height,
                backgroundColor,
                basicUIFeatures,goTo,currentPath,submitable} = this.props

        return (
            <HeaderWrapper id="_header" className={CommonClassNameConstants.FLEX_ROW_ROW_CENTER}
                           height={height}
                           backgroundColor={backgroundColor}>
                <HeaderMainArea   widthOfMainArea={basicUIFeatures.get('widthOfMainArea')}>

                    <Logo/>



                    <NavItemWrapper>
                        <NavItem className={CommonClassNameConstants.FONT_MIDDLE}>
                            {
                                currentPath === '/edit' ?
                                    <SubmitButton submitable={submitable}>
                                        <span className="iconfont" onClick={() => {goTo('/edit')}}>&#xe600;</span>
                                        <Info>
                                            发布
                                        </Info>
                                    </SubmitButton>
                                    :
                                    <Fragment>
                                        <span className="iconfont" onClick={() => {goTo('/edit')}}>&#xe67f;</span>
                                        <Info onClick={() => {goTo('/edit')}}>
                                            写作
                                        </Info>
                                    </Fragment>
                            }
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
        metaColor: state.get('header').get('metaColor'),
        basicUIFeatures: state.get('rootState').get('basicUIFeatures'),
        goTo: state.get('router').get('goTo'),
        currentPath: state.get('router').get('currentPath'),
        submitable: state.get('router').get('submitable')
    }
}


export default connect(mapState)(withRouter(MobileHeader))