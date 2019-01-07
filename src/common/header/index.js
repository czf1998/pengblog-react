import React, { PureComponent } from 'react'
//import { Link as ReactKeeperLink } from 'react-keeper'
import { Link } from 'react-router-dom'
import { HeaderWrapper, HeaderMainArea, LogoWrapper, Logo, NavItem, NavItemWrapper } from './style'
import { connect } from 'react-redux'
import { CommonClassNameConstants } from '../../commonStyle'
const Nanobar = require('nanobar');

class Header extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {

        const { height, backgroundColor, basicUIFeatures, metaColor } = this.props

        const HOME_PATH = '/'

        return (
            <HeaderWrapper id="_header" className={CommonClassNameConstants.FLEX_ROW_ROW_CENTER}
                           height={height}
                           backgroundColor={backgroundColor}>
                <HeaderMainArea   widthOfMainArea={basicUIFeatures.get('widthOfMainArea')}>
                    <Link to={HOME_PATH}>
                        <Logo className={CommonClassNameConstants.FONT_LARGE +
                                        CommonClassNameConstants.FONT_SONG +
                                        CommonClassNameConstants.CURSORP +
                                        CommonClassNameConstants.FLEX_COLUMN_CENTER}
                              metaColor={metaColor}>
                            <div>
                                远方有鱼
                            </div>
                            <div style={{borderTop: "solid 1px " + metaColor}}
                                 className={CommonClassNameConstants.FONT_TINY}>
                                It's a Wonderful Life
                            </div>
                        </Logo>
                    </Link>

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

    componentDidMount() {
        /*let nanobar = new Nanobar();
        nanobar.go(20)*/
    }
}

const mapState = (state) => {
    return  {
        height: state.get('header').get('height'),
        backgroundColor: state.get('header').get('backgroundColor'),
        metaColor: state.get('header').get('metaColor'),
        basicUIFeatures: state.get('rootState').get('basicUIFeatures')
    }
}


export default connect(mapState)(Header)