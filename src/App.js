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

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <MainNavigation>

          </MainNavigation>
          <main className="main-content">
            <Switch>
                <Redirect from= "/" to="auth" exact/>
                <Route path="/auth" component={AuthPage}/>
                <Route path="/documentos" component={DocsPage}/>
                <Route path="/donaciones" component={DonacionesPage}/>
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
