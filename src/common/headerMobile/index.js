import React, { PureComponent } from 'react'
import { HeaderWrapper, HeaderMainArea,  Logo, NavItem, NavItemWrapper } from './style'
import { connect } from 'react-redux'
import { CommonClassNameConstants } from '../../commonStyle'

class Header extends PureComponent {


    render() {
        const { height, backgroundColor, basicUIFeatures } = this.props
        return (
            <HeaderWrapper height={height} 
                           backgroundColor={backgroundColor}>
                <HeaderMainArea widthOfMainArea={basicUIFeatures.get('widthOfMainArea')}>
                        <Logo className={CommonClassNameConstants.FONT_LARGE +
                                         CommonClassNameConstants.FONT_SONG +
                                         CommonClassNameConstants.CURSORP +
                                         CommonClassNameConstants.FLEX_COLUMN_CENTER}
                              backgroundColor={backgroundColor}>
                            <div>
                                远方有鱼
                            </div>
                            <div style={{borderTop: "solid 1px " + backgroundColor}}
                                 className={CommonClassNameConstants.FONT_TINY}>
                                It's a Wonderful Life
                            </div>
                        </Logo>
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

const mapState = (state) => {
    return  {
        height: state.get('header').get('height'),
        backgroundColor: state.get('header').get('backgroundColor'),
        basicUIFeatures: state.get('rootState').get('basicUIFeatures')
    }
}


export default connect(mapState)(Header)