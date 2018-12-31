import React, {Component, Fragment} from 'react';
import { Provider } from 'react-redux'
import store from './store'
import './commonStyle'
import { createObserveScrollTopOfElementElAction } from "./store/actionCreators";
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/home'

import { Header, Footer, HeaderMobile } from './common'


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
            {
                isMobile ?
                    <HeaderMobile/>
                :
                    <Header/>
            }

            <BrowserRouter>
                <Fragment>
                    <Route path='/' exact component={Home}/>
                    <Route path='/article' exact render={() => <div>article</div>}/>
                </Fragment>
            </BrowserRouter>

            <Footer/>

        </Provider>
    );
  }

  componentDidMount() {
      this.initRecordDocumentScrollTop()
      store.dispatch(createObserveScrollTopOfElementElAction())
  }

  initRecordDocumentScrollTop() {
      window.addEventListener('scroll', () => {
          store.dispatch(createObserveScrollTopOfElementElAction())
      })
  }

}



export default App;
