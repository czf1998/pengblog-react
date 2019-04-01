import React, { PureComponent} from 'react'
import {
    HeaderWrapper,
    HeaderMainArea,
    NavItem,
    NavItemWrapper, Info
} from './style'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { CommonClassNameConstants } from '../../commonStyle'
import { withRouter } from 'react-router-dom'
import {Logo} from './components'
import {GapLineVertical} from "../gapLine";


class CommonHeader extends PureComponent {


    render() {

        const { height,
                backgroundColor,
                basicUIFeatures,
                goTo,
            currentPath,
                alreadyLoggedIn} = this.props

        return (
            <HeaderWrapper id="_header" className={CommonClassNameConstants.FLEX_ROW_ROW_CENTER}
                           height={height}
                           backgroundColor={backgroundColor}>
                <HeaderMainArea   widthOfMainArea={basicUIFeatures.get('widthOfMainArea')}>

                    <NavItemWrapper>

                        <Logo/>

                        {
                            currentPath.match('^/home') === null &&  <GapLineVertical/>
                        }


                        <NavItem style={{fontWeight:'bold'}}>
                            {
                                currentPath === '/manage' &&  <span>索引</span>
                            }
                        </NavItem>
                    </NavItemWrapper>

                    <NavItemWrapper>

                        {
                            currentPath !== '/manage' &&
                            <NavItem cursorp={true}>
                                <span className="iconfont" onClick={() => {goTo('/manage')}}
                                      style={{fontSize:'1.6rem'}}>&#xe76a;</span>
                                <Info onClick={() => {goTo('/manage')}}>
                                    索引
                                </Info>
                            </NavItem>

                        }


                        {
                            alreadyLoggedIn &&
                            <NavItem cursorp={true}>
                                <span className="iconfont"
                                  onClick={() => {goTo('/edit')}}
                                  style={{fontSize:'1.6rem'}}>&#xe67f;</span>
                                <Info onClick={() => {goTo('/edit')}}>
                                    写作
                                </Info>
                            </NavItem>
                        }

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
        basicUIFeatures: state.get('rootState').get('basicUIFeatures'),
        goTo: state.get('router').get('goTo'),
        currentPath: state.get('router').get('currentPath'),
        submitable: state.get('router').get('submitable'),
        alreadyLoggedIn: state.get('loginPage').get('alreadyLoggedIn')
    }
}


export default connect(mapState)(withRouter(CommonHeader))