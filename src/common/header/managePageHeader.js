import React, { PureComponent} from 'react'
import {
    HeaderWrapper,
    HeaderMainArea, NavItem, NavItemWrapper, Info,
} from './style'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { CommonClassNameConstants } from '../../commonStyle'
import { withRouter } from 'react-router-dom'
import {Logo} from './components'
import {GapLineVertical} from "../gapLine";


class ManagePageHeader extends PureComponent {


    render() {

        const {
                height,
                backgroundColor,
                basicUIFeatures,alreadyLoggedIn,goTo} = this.props

        return (
            <HeaderWrapper id="_header" className={CommonClassNameConstants.FLEX_ROW_ROW_CENTER}
                           height={height}
                           backgroundColor={backgroundColor}>
                <HeaderMainArea   widthOfMainArea={basicUIFeatures.get('widthOfMainArea')}>
                    <NavItemWrapper>

                        <Logo/>

                        <GapLineVertical/>

                        <NavItem style={{fontWeight:'bold'}}>
                            索引
                        </NavItem>
                    </NavItemWrapper>

                    <NavItemWrapper>

                        {
                            alreadyLoggedIn &&
                            <NavItem cursorp={true}>
                                <span className="iconfont"
                                      onClick={() => {goTo('/recycle')}}
                                      style={{fontSize:'1.4rem'}}>&#xe60c;</span>
                                <Info onClick={() => {goTo('/recycle')}}>
                                    回收站
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


export default connect(mapState)(withRouter(ManagePageHeader))