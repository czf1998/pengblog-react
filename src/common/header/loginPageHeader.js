import React, { PureComponent} from 'react'
import {
    HeaderWrapper,
    HeaderMainArea
} from './style'
import { connect } from 'react-redux'
import { CommonClassNameConstants } from '../../commonStyle'
import { withRouter } from 'react-router-dom'
import {Logo} from './components'


class LoginPageHeader extends PureComponent {


    render() {

        const {
                height,
                backgroundColor,
                basicUIFeatures} = this.props

        return (
            <HeaderWrapper id="_header" className={CommonClassNameConstants.FLEX_ROW_ROW_CENTER}
                           height={height}
                           backgroundColor={backgroundColor}>
                <HeaderMainArea   widthOfMainArea={basicUIFeatures.get('widthOfMainArea')}>

                    <Logo/>

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
        submitable: state.get('router').get('submitable')
    }
}


export default connect(mapState)(withRouter(LoginPageHeader))