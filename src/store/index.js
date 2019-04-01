import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer.js'
import createSagaMiddleware from 'redux-saga'
import mySaga from './saga'


/*// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
)*/

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))

const store = createStore(reducer, enhancer)




sagaMiddleware.run(mySaga)

// then run the saga
//sagaMiddleware.run(mySaga)


export default store