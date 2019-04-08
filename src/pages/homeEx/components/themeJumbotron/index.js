import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import { Logo,Carousel } from "./components";
import {Footer} from '../../../../common'
import {ThemeJumbotronWrapper,
        LogoAndSimpleDescription,
        LogoAndSimpleDescriptionFixer,
        ThemeImage,
        Gap,
        LogoWrapper,
        SimpleDescription,
        SponsorDisplayCabinet,
        PowerBy,
        SponsorContain,
        SponsorItem} from './style'
import * as CommonClassNameConstants from "../../../../commonStyle/commonClassNameConstant";

import {reactLogo,
        immutableLogo,
        reduxLogo,
        reduxSagaLogo,
        springLogo,
        mysqlLogo,
        webpackLogo,
        npmLogo,
        centosLogo,
        tomcatLogo,
        nginxLogo,reactRouterLogo} from '../../../../static/svg/logo'

import mybatisLogo from '../../../../static/image/logo/mybatis.png'
import mavenLogo from '../../../../static/image/logo/maven.png'
import tencentcloud from '../../../../static/image/logo/tencentcloud.png'



class ThemeJumbotron extends PureComponent {

    render() {

        const themeImage = 'https://pengblogimage-1257899590.cos.ap-guangzhou.myqcloud.com/theme.a5d5fc1c.png'

        const {heightOfBrowser} = this.props

        return (
            <ThemeJumbotronWrapper>
                <LogoAndSimpleDescription heightOfBrowser={heightOfBrowser}>

                 <ThemeImage src={themeImage}/>

                    <LogoAndSimpleDescriptionFixer>

                        <LogoWrapper>
                            <Logo scale={1}/>
                        </LogoWrapper>

                        <Gap/>

                        <SimpleDescription className={CommonClassNameConstants.FONT_SONG}>
                            是<br/>一个<br/>简单的<br/>个人博客
                        </SimpleDescription>
                    </LogoAndSimpleDescriptionFixer>

                   {/* <Carousel/>*/}

                </LogoAndSimpleDescription>

                <SponsorDisplayCabinet>
                    <PowerBy>Powered by</PowerBy>
                    <SponsorContain>
                        <SponsorItem src={reactLogo} title="react"/>
                        <SponsorItem src={reactRouterLogo} title="reactRouter"/>
                        <SponsorItem src={reduxLogo} title="redux"/>
                        <SponsorItem src={reduxSagaLogo} title="reduxSaga"/>
                        <SponsorItem src={springLogo} title="spring"/>
                        <SponsorItem src={mysqlLogo} title="mysql"/>
                        <SponsorItem src={webpackLogo} title="webpack"/>
                        <SponsorItem src={npmLogo} title="npm"/>
                        <SponsorItem src={mybatisLogo} title="mybatis"/>
                        <SponsorItem src={tencentcloud} title="tencentCloud"/>
                        <SponsorItem src={centosLogo} title="centOS"/>
                        <SponsorItem src={tomcatLogo} title="tomcat"/>
                        <SponsorItem src={nginxLogo} title="nginx"/>
                        <SponsorItem src={mavenLogo} title="maven" style={{width: '120px',height:'100%',padding:'10px'}}/>
                        <SponsorItem src={immutableLogo} title="immutable"/>
                    </SponsorContain>
                </SponsorDisplayCabinet>

                <Footer/>
            </ThemeJumbotronWrapper>
        );
    }

    componentDidMount(){
    }
}



const mapState = (state) =>({
    heightOfBrowser: state.get('rootState').get('heightOfBrowser')
})


export default connect(mapState)(ThemeJumbotron)
