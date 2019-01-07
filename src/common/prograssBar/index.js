import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
const Nanobar = require('nanobar');

class PrograssBar extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Fragment></Fragment>
        )
    }

    componentDidMount() {
        let prograssBarHandler = handlePrograssBar()
        this.props.appointPrograssBarHandler()
    }
}

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

    yield milePost.forEach((item, index) => {
            window.setTimeout(() => {checkMilePost(item)}, index * 100)
    })

    yield nanobar.go(100)
}

const mapActions = (dispatch) => ({
    appointPrograssBarHandler() {

    }
})

export default connect(null, mapActions)(PrograssBar)