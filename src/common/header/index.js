import React, { PureComponent } from 'react'
import { HeaderWrapper, HeaderMainArea, Logo, NavItem, NavItemWrapper } from './style'
import { connect } from 'react-redux'
import { CommonClassNameConstants } from '../../commonStyle'
import { withRouter } from 'react-router-dom'

const HOME_PATH = '/'

class Header extends PureComponent {


    render() {

        const { history, height, backgroundColor, basicUIFeatures, metaColor } = this.props

        return (
            <HeaderWrapper id="_header" className={CommonClassNameConstants.FLEX_ROW_ROW_CENTER}
                           height={height}
                           backgroundColor={backgroundColor}>
                <HeaderMainArea   widthOfMainArea={basicUIFeatures.get('widthOfMainArea')}>

                    <div onClick={() => {redirectToHome(history)}}>
                        <Logo className={CommonClassNameConstants.FONT_LARGE +
                                        CommonClassNameConstants.FONT_SONG +
                                        CommonClassNameConstants.CURSORP +
                                        CommonClassNameConstants.FLEX_COLUMN_CENTER}
                              metaColor={metaColor}>
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

    componentDidMount() {
        /*let nanobar = new Nanobar();
        nanobar.go(20)*/
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


export default connect(mapState)(withRouter(Header))