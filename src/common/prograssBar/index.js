import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'


const Nanobar = require('nanobar');

class PrograssBar extends PureComponent {



    render() {

        const { prograssBarStatus } = this.props

        return (
            <Fragment key={prograssBarStatus}>
            </Fragment>
        )
    }

    componentDidMount() {
        const nanobar = new Nanobar();
        const nanobarManager = {
            nanobar: nanobar,
            prograssBarGoToTheMilePost: nanobarGoToTheMilePost(nanobar, this.props.dispatcher),
            prograssBarGoToTheEnd: nanobarGoToTheEnd(nanobar),
            prograssBarGoToTheEndAtOnce: nanobarGoToTheEndAtOnce(nanobar)
        }
        this.props.appointNanobarManager(nanobarManager)
    }

    componentDidUpdate() {

    }

}

const nanobarGoToTheMilePost = (nanobar, dispatcher) => {


    return function(){
        nanobar.go(40)

        let i = 40

        let prograssTimer = setInterval(() => {
            i++
            if(i < 90)
                nanobar.go(i)
        }, 500)

        const recordTimerAction = actionCreators.createRecordNanobarTimerAction(prograssTimer)
        dispatcher(recordTimerAction)
    }
}

const nanobarGoToTheEnd = (nanobar) => {
    return function(nanobarTimer) {
        window.throttleByGap(() => {
            clearInterval(nanobarTimer)
            nanobar.go(100)
        }, 500)

    }
}

const nanobarGoToTheEndAtOnce = (nanobar) => {
    return function(nanobarTimer, meta) {
        window.throttleByGap(() => {
            clearInterval(nanobarTimer)
            nanobar.go(100)
        }, 3600*1000*24*365, meta)

    }
}


const mapActions = (dispatch) => ({
    appointNanobarManager(nanobarManager) {
        const action = actionCreators.createAppointNanobarManagerAction(nanobarManager)
        dispatch(action)
    },
    appointNanobarGo(nanobar) {
        const action = actionCreators.createAppointNanobarGoAction(nanobar)
        dispatch(action)
    },
    resetPrograssBar() {
        const action = actionCreators.createResetPrograssBarAction()
        dispatch(action)
    },
    dispatcher(action) {
        dispatch(action)
    }
})

export default connect(null, mapActions)(PrograssBar)