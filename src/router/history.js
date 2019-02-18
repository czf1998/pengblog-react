import { createBrowserHistory } from 'history'
import store from '../store'
import {createAppointCurrentPathAction} from './store'

const history = createBrowserHistory()

history.listen((location, action) => {
    registerCurrentPath(location)
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