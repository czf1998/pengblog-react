import React, {Component, Fragment} from 'react';
import { Provider } from 'react-redux'
import RouterComponent from './router'
import store from './store'
import './commonStyle'
import './exJs/throttle'
import { createObserveScrollTopOfElementElAction } from "./store/actionCreators";
import { CommonClassNameConstants } from './commonStyle'
import { Header, Footer, HeaderMobile, PrograssBar } from './common'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            isMobile: false
        }
        store.subscribe(() => {
            this.setState({
                isMobile: store.getState().get('rootState').get('isMobile')
            })
        })
    }


  render() {
    const { isMobile } = this.state

    return (
        <Provider store={store}>

            <PrograssBar/>

            <RouterComponent/>

            <div className={CommonClassNameConstants.FADE_IN}>
                <Footer/>
            </div>

        </Provider>
    );
  }

  componentDidMount() {
      //this.initRecordDocumentScrollTop()
      store.dispatch(createObserveScrollTopOfElementElAction())
      store.getState().get('prograssBar').get('prograssBarManager').get('prograssBarGoToTheMilePost')()
  }

  initRecordDocumentScrollTop() {
      window.addEventListener('scroll', () => {
          store.dispatch(createObserveScrollTopOfElementElAction())
      })
  }

}



export default App;
