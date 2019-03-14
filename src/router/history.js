import { createBrowserHistory } from 'history'
import store from '../store'
import {createAppointCurrentPathAction} from './store'
import {createTriggerShowModalAction} from "../common/modal/store";

const history = createBrowserHistory()

history.listen((location, action) => {
    handlerModal()
    registerCurrentPath(location)

    if(location.pathname === '/login/dynamic'){
        return
    }

    if(store.getState().get('router').get('lastPath') === '/login/dynamic'){
        return
    }

    if(action === 'PUSH'){
        rebootPrograssBar()
    }
});

export default history

const rebootPrograssBar = () => {
    store.getState().get('prograssBar').get('prograssBarManager').get('prograssBarGoToTheMilePost')()
}

export const registerCurrentPath = (location) => {
    const appointCurrentPathAction = createAppointCurrentPathAction(location.pathname)
    store.dispatch(appointCurrentPathAction)
}

const handlerModal = () => {
    const isShowingModal = store.getState().get('modal').get('showModal')
    if(isShowingModal){
        const triggerShowModalAction = createTriggerShowModalAction(false)
        store.dispatch(triggerShowModalAction)
    }
}