import React, {PureComponent, Fragment} from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import {CentralController, ArticleDetailWrapper,ArticleDetailFixer} from './style'
import {SearchBar} from './components'
import {createPushPrograssToEndAction} from "../articlePage/store";

class ManagePage extends PureComponent {

    render() {

        const {browser} = this.props

        return (
            <Fragment>
                <CentralController>
                    <SearchBar/>
                </CentralController>

                <ArticleDetailWrapper>
                    <ArticleDetailFixer>
                    </ArticleDetailFixer>
                </ArticleDetailWrapper>
            </Fragment>
        )
    }

    componentDidMount() {
        this.props.pushPrograssBarToEnd()
    }

    componentWillUnmount() {

    }

}

const mapState = (state) => ({
        browser:state.get('rootState').get('browser')
    })

const mapActions = (dispatch) => {
    return {
        pushPrograssBarToEnd() {
            const pushPrograssBarToEndAction = createPushPrograssToEndAction({page: 'managePage'})
            dispatch(pushPrograssBarToEndAction)
        },
    }
}

export default connect(mapState, mapActions)(withRouter(ManagePage))
