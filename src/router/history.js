import { createBrowserHistory } from 'history'
import store from '../store'

const history = createBrowserHistory()

const unlisten = history.listen((location, action) => {
    // location is an object like window.location
    rebootPrograssBar()
});

export default history

const rebootPrograssBar = () => {

    store.getState().get('prograssBar').get('prograssBarManager').get('prograssBarGoToTheMilePost')()
}