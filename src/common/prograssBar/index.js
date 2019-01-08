import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
const Nanobar = require('nanobar');


class PrograssBar extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {

        const { prograssBarStatus } = this.props

        return (
            <Fragment key={prograssBarStatus}>

            </Fragment>
        )
    }

    componentDidMount() {
        let prograssBarHandler = handlePrograssBar()
        this.props.appointPrograssBarHandler(prograssBarHandler)
    }

    componentDidUpdata() {
        console.log(this.props.prograssBarStatus)
    }
}

/*
const prograssRunning = () => {
    let prograssBarHandler =
    prograssBarHandler.next()
}

const prograssEnding = () => {
    let prograssBarHandler = handlePrograssBar()
    prograssBarHandler.next()
    prograssBarHandler.next()
}
*/

function* handlePrograssBar(){

    let nanobar = new Nanobar();

    let milePost = [25,30,35,40,45,50,55]

    for(let i = 56; i < 70; i+=2){
        milePost.push(i)
    }
    for(let i = 70; i < 90; i++){
        milePost.push(i)
    }

    const checkMilePost = (postIndex) => {
        nanobar.go(postIndex)
    }

    let timers = []

    yield milePost.forEach((item, index) => {
        timers.push(window.setTimeout(() => {checkMilePost(item)}, index * 100))
    })

    timers.forEach((item) => {
        clearTimeout(item)
    })

    yield nanobar.go(100)
}

const mapState = (state) => ({
    prograssBarStatus: state.get('prograssBar').get('prograssBarStatus')
})

const mapActions = (dispatch) => ({
    appointPrograssBarHandler(prograssBarHandler) {
        const action = actionCreators.createAppointPrograssBarHandlerAction(prograssBarHandler)
        dispatch(action)
    }
})

export default connect(mapState, mapActions)(PrograssBar)