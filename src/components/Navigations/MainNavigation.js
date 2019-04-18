// Librerias React
import React from 'react';

//Componente NavLink Router
import { NavLink } from 'react-router-dom';

//Estilos
import './MainNavigation.css';

const MainNavigation = props => (
    <header className="main-navigation">
        <div className="main-navigation__logo">
            <h1>Document Indexer</h1>
        </div>
        <nav className="main-navigation__item">
            <ul>
                <li> <NavLink to="/auth">Ingreso</NavLink> </li>
                <li> <NavLink to="/documentos">Documentos</NavLink> </li>
                <li> <NavLink to="/donaciones">Donaciones</NavLink> </li>
            </ul>
        </nav>
    </header>
);

export default MainNavigation;