import { createBrowserHistory } from 'history'
import store from '../store'

const history = createBrowserHistory()

history.listen((location, action) => {
    // location is an object like window.location
    //console.log(location)
    //console.log(history)
    if(action === 'PUSH'){
        rebootPrograssBar()
    }
});

export default history

const rebootPrograssBar = () => {
    store.getState().get('prograssBar').get('prograssBarManager').get('prograssBarGoToTheMilePost')()
}