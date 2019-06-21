import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { auth } from './util/firebaseUtils';
import { Admin } from './Componentes/Admin'

import {
  Rodape,
  Cabecalho,
  Remote,
  Logoff,
  FormLogin,
  Hotel
} from './Componentes';

class App extends Component {

  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      logged: null
    }
  }

  componentDidMount() {
    this._isMounted = true
    auth.onAuthStateChanged(async user => {
      if (this._isMounted) {
        await this.setState({ logged: user })
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Cabecalho userLogged={this.state.logged} />

          <Route path='/' exact component={Hotel} />
          <Route path='/Remote' component={Remote} />


          {/* <Route path='/admin' 
              render={
                  (props) => <Admin {...props} userLogged={this.state.logged} />
              }/> 
          */}

          <Route path='/admin' component={Admin} />
          <Route path='/login' component={FormLogin} />
          <Route path='/logoff' component={Logoff} />

          <Rodape />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
