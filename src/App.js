//Librerias React
import React, { Component } from 'react';                                   //React
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';  //Router

//Estilos App.js
import './App.css';

//Componentes de pagina
import DocsPage from './pages/docs';
import AuthPage from './pages/auth';
import DonacionesPage from './pages/donaciones';

//Componentes generales
import MainNavigation from './components/Navigations/MainNavigation';

//Contexto
import AuthContext from './context/auth-context';

class App extends Component {

  state = {
    token: null,
    userId: null
  }

  login = (token,userId,tokenExpiration) =>{
    this.setState({token: token, userId:userId});
  }

  logout = () => {
    this.setState({token:null,userId:null});
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider 
            value={{ 
              token: this.state.token, 
              userId: this.state.userId, 
              login: this.login, 
              logout: this.logout
            }}
          >
          <MainNavigation/>
          <main className="main-content">
            <Switch>
                {!this.state.token && <Redirect from= "/" to="auth" exact/>}
                {this.state.token && <Redirect from= "/" to="/documentos" exact/>}
                {this.state.token && <Redirect from= "/auth" to="/documentos" exact/>}
                {!this.state.token && <Route path="/auth" component={AuthPage}/>}
                <Route path="/documentos" component={DocsPage}/>
                <Route path="/donaciones" component={DonacionesPage}/>
            </Switch>
          </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
