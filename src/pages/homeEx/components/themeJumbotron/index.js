import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import { Logo } from "./components";
import {Footer} from '../../../../common'
import {ThemeJumbotronWrapper,
        LogoAndSimpleDescription,
        LogoAndSimpleDescriptionFixer,
        ThemeImage,
        ThemeBackground,
        LogoWrapper} from './style'
import {imageLoader} from "../../../../exJs/imageLoader";


class ThemeJumbotron extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            themeImage: 'https://pengblogimage-1257899590.cos.ap-guangzhou.myqcloud.com/theme.png',
            backgroundImage: 'https://pengblogimage-1257899590.cos.ap-guangzhou.myqcloud.com/black-and-white-nature-sky-field.440ec64e.jpg',
            themeImageReady: false,
            backgroundImageReady: false
        }
    }

    render() {

        const {heightOfBrowser} = this.props

        const {themeImage,backgroundImage,backgroundImageReady,themeImageReady} = this.state

        return (
            <ThemeJumbotronWrapper>
                <LogoAndSimpleDescription heightOfBrowser={heightOfBrowser}>

                    <ThemeBackground backgroundImage={backgroundImage} backgroundImageReady={backgroundImageReady}/>

                    <ThemeImage src={themeImage} themeImageReady={themeImageReady}/>

                    <LogoAndSimpleDescriptionFixer>

                        <LogoWrapper>
                            <Logo scale={1}/>
                        </LogoWrapper>

                    </LogoAndSimpleDescriptionFixer>

                </LogoAndSimpleDescription>

                <Footer/>
            </ThemeJumbotronWrapper>
        );
    }

    componentDidMount(){
        imageLoader(this.state.backgroundImage,() => {
            this.setState({
                backgroundImageReady: true
            })
        })
        imageLoader(this.state.themeImage,() => {
            this.setState({
                themeImageReady: true
            })
        })
    }
}



const mapState = (state) =>({
    heightOfBrowser: state.get('rootState').get('heightOfBrowser')
})


export default connect(mapState)(ThemeJumbotron)
