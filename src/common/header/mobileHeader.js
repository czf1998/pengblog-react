import React, {Fragment, PureComponent} from 'react'
import {HeaderWrapper,
        MobileHeaderMainArea,
        NavItemWrapper,
        MenuButtonWrapper,
        Button,
        MenuList,
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
                showMenuList,
                goTo} = this.props

        return (
            <HeaderWrapper id="_header" className={CommonClassNameConstants.FLEX_ROW_ROW_CENTER}
                           height={height}
                           backgroundColor={backgroundColor}>


                <MenuList showMenuList={showMenuList}>

                    {
                        showMenuList && <Cover/>
                    }

                    <MenuItem onClick={() => {goTo('/')}}>
                            <span className="iconfont"
                                  style={{fontSize: '1.6rem'}}>&#xe626;</span>
                        主页
                    </MenuItem>

                    <MenuItem onClick={() => {goTo('/manage')}}>
                            <span className="iconfont"
                                  style={{fontSize: '1.6rem'}}>&#xe76a;</span>
                        索引
                    </MenuItem>

                    <MenuItem onClick={() => {goTo('/edit')}}
                              style={{borderBottom:'none'}}>
                            <span className="iconfont"
                                  style={{fontSize: '1.6rem'}}>&#xe67f;</span>
                        写作
                    </MenuItem>
                </MenuList>
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
        showMenuList: state.get('header').get('showMenuList')
    }
}

const mapActions = (dispatch) => ({
    triggerShowMenuListOfMobileHeader(flag){
        const action = createTriggerShowMenuListOfMobileHeader(flag)
        dispatch(action)
    }
})


export default connect(mapState,mapActions)(withRouter(MobileHeader))