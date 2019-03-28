import React, { Component } from 'react';
import {connect} from 'react-redux'
import {
    createAppointNoticeContent,
    createObserveScrollTopOfElementElAction,
    createRecordCurrentBrowserEdition
} from "../../store/actionCreators";
import history from '../../router/history'
import {createAppointCurrentPathAction} from "../../router/store";
import {createPushPrograssToMilePostAction} from './store'
import store from "../../store";
import {put} from "redux-saga/effects";


class Startup extends Component {


    render() {
        return (
            null
        );
    }

    componentDidMount() {
        this.props.recordScrollTopOfElementEl()
        this.props.recordCurrentPath()
        this.props.recordCurrentBrowserEdition()
        pushPrograssBarToMilepost(store)
        this.props.notifyNetworkCondition()
    }

}


const mapState = () => ({

})

const mapActions = (dispatch) => ({
    recordScrollTopOfElementEl() {
        const action = createObserveScrollTopOfElementElAction()
        dispatch(action)
        window.addEventListener('resize', () => {
            dispatch(action)
        })
    },
    recordCurrentPath() {
        const action = createAppointCurrentPathAction(history.location.pathname)
        dispatch(action)
    },
    recordCurrentBrowserEdition() {
        const action = createRecordCurrentBrowserEdition()
        dispatch(action)
    },
    pushPrograssBarToMilepost() {
        const action = createPushPrograssToMilePostAction()
        dispatch(action)
    },
    notifyNetworkCondition() {
        window.addEventListener('offline', () => {
            const appointNoticeContent = createAppointNoticeContent('网络连接不可用')
            dispatch(appointNoticeContent)
        })

        window.addEventListener('online', () => {
            const appointNoticeContent = createAppointNoticeContent('网络连接已恢复')
            dispatch(appointNoticeContent)
        })
    }
})

export default connect(mapState,mapActions)(Startup);

const pushPrograssBarToMilepost = (store) => {
    store.getState().get('prograssBar').get('prograssBarManager').get('prograssBarGoToTheMilePost')()
}