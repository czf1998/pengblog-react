import React, { PureComponent } from 'react'
import { HeaderWrapper, HeaderMainArea,  Logo, NavItem, NavItemWrapper } from './style'
import { connect } from 'react-redux'
import { CommonClassNameConstants } from '../../commonStyle'
import {withRouter} from "react-router-dom";

const HOME_PATH = '/'

class HeaderMobile extends PureComponent {


    render() {
        const { height, backgroundColor, basicUIFeatures, metaColor, history } = this.props
        return (
            <HeaderWrapper height={height}
                           metaColor={metaColor}>
                <HeaderMainArea widthOfMainArea={basicUIFeatures.get('widthOfMainArea')}>
                    <div onClick={() => {redirectToHome(history)}} className={CommonClassNameConstants.FLEX_ROW_CENTER}>
                        <Logo className={CommonClassNameConstants.FONT_LARGE +
                                         CommonClassNameConstants.FONT_SONG +
                                         CommonClassNameConstants.CURSORP +
                                         CommonClassNameConstants.FLEX_COLUMN_CENTER}
                              backgroundColor={backgroundColor} metaColor={metaColor}>
                            <div>
                                <span style={{color:metaColor, fontWeight:'bold', fontSize:'1.8rem'}}>遠</span>方有鱼
                            </div>
                            <div style={{borderTop: "solid 1px " + metaColor}}
                                 className={CommonClassNameConstants.FONT_TINY}>
                                It's a Wonderful Life
                            </div>
                        </Logo>
                    </div>
                        <NavItemWrapper>
                            <NavItem className={CommonClassNameConstants.FONT_MIDDLE +
                                                CommonClassNameConstants.CURSORP}>
                                杂谈
                            </NavItem>
                            <NavItem className={CommonClassNameConstants.FONT_MIDDLE +
                                                CommonClassNameConstants.CURSORP}>
                                索引
                            </NavItem>
                        </NavItemWrapper>
                </HeaderMainArea>
            </HeaderWrapper>
        );
    }
}

const redirectToHome = (history) => {
    if(history.location.pathname === HOME_PATH){
        return
    }
    history.push({
        pathname: HOME_PATH,
    })
}

const mapState = (state) => {
    return  {
        height: state.get('header').get('height'),
        backgroundColor: state.get('header').get('backgroundColor'),
        metaColor: state.get('header').get('metaColor'),
        basicUIFeatures: state.get('rootState').get('basicUIFeatures')
    }
}


export default connect(mapState)(withRouter(HeaderMobile))