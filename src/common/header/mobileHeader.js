import React, {Fragment, PureComponent} from 'react'
import {HeaderWrapper,
        MobileHeaderMainArea,
        NavItemWrapper,
        MenuButtonWrapper,
        Button,
        MenuList,MenuListWrapper,
        MenuItem,
        Cover} from './style'
import { connect } from 'react-redux'
import { CommonClassNameConstants } from '../../commonStyle'
import { withRouter } from 'react-router-dom'
import {Logo} from './components'
import {createTriggerShowMenuListOfMobileHeader} from './store'

class MobileHeader extends PureComponent {

    constructor(props){
        super(props)

        this.showMenu = this.showMenu.bind(this)
        this.closeMenu = this.closeMenu.bind(this)
    }

    render() {

        const { height,
                backgroundColor,
                basicUIFeatures,
                showMenuList,alreadyLoggedIn,
                goTo} = this.props

        return (
            <HeaderWrapper id="_header" className={CommonClassNameConstants.FLEX_ROW_ROW_CENTER}
                           height={height}
                           backgroundColor={backgroundColor}>

                <MenuListWrapper showMenuList={showMenuList}>
                    <MenuList showMenuList={showMenuList}>

                        {
                            showMenuList && <Cover/>
                        }

                        <MenuItem onClick={() => {goTo('/')}}>
                            <span className="iconfont"
                                  style={{fontSize: '1.6rem'}}>&#xe626;</span>
                            &nbsp;主页
                        </MenuItem>

                        <MenuItem onClick={() => {goTo('/manage')}}>
                            <span className="iconfont"
                                  style={{fontSize: '1.6rem'}}>&#xe76a;</span>
                            &nbsp;索引
                        </MenuItem>

                        {
                            !alreadyLoggedIn &&
                            <MenuItem onClick={() => {goTo('/login')}}>
                                        <span className="iconfont"
                                              style={{fontSize: '1.6rem'}}>&#xe624;</span>
                                &nbsp;登录
                            </MenuItem>
                        }

                        {
                            alreadyLoggedIn &&
                                <Fragment>
                                    <MenuItem onClick={() => {goTo('/edit')}}>
                                        <span className="iconfont"
                                              style={{fontSize: '1.6rem'}}>&#xe67f;</span>
                                        &nbsp;写作
                                    </MenuItem>

                                    <MenuItem onClick={() => {goTo('/logout')}}>
                                        <span className="iconfont"
                                              style={{fontSize: '1.6rem'}}>&#xe7cd;</span>
                                        &nbsp;登出
                                    </MenuItem>

                                    <MenuItem onClick={() => {goTo('/ip')}}
                                              style={{borderBottom:'none'}}>
                                        <span className="iconfont"
                                              style={{fontSize: '1.6rem'}}>&#xe64f;</span>
                                        &nbsp;管理IP
                                    </MenuItem>
                                </Fragment>
                        }


                    </MenuList>
                </MenuListWrapper>


                <MobileHeaderMainArea   widthOfMainArea={basicUIFeatures.get('widthOfMainArea')}>

                    <Logo/>

                    <NavItemWrapper>
                        <MenuButtonWrapper showMenuList={showMenuList}>
                            <Button className="iconfont"
                                    ref="menuButton"
                                    style={{fontSize: '1.6rem'}}>&#xe60b;</Button>
                        </MenuButtonWrapper>
                    </NavItemWrapper>


                </MobileHeaderMainArea>


            </HeaderWrapper>
        );
    }



    componentDidMount(){
        this.refs.menuButton.addEventListener('click', this.showMenu)
    }

    showMenu(){
        this.props.triggerShowMenuListOfMobileHeader(true)
        this.refs.menuButton.removeEventListener('click',this.showMenu)
        setTimeout(() => {
            window.addEventListener('click', this.closeMenu)
        },100)
    }

    closeMenu(){
        this.props.triggerShowMenuListOfMobileHeader(false)
        window.removeEventListener('click', this.closeMenu)
        this.refs.menuButton && this.refs.menuButton.addEventListener('click', this.showMenu)
    }
}

const mapState = (state) => {
    return  {
        height: state.get('header').get('height'),
        backgroundColor: state.get('header').get('backgroundColor'),
        basicUIFeatures: state.get('rootState').get('basicUIFeatures'),
        goTo: state.get('router').get('goTo'),
        showMenuList: state.get('header').get('showMenuList'),
        alreadyLoggedIn: state.get('loginPage').get('alreadyLoggedIn')
    }
}

const mapActions = (dispatch) => ({
    triggerShowMenuListOfMobileHeader(flag){
        const action = createTriggerShowMenuListOfMobileHeader(flag)
        dispatch(action)
    }
})


export default connect(mapState,mapActions)(withRouter(MobileHeader))