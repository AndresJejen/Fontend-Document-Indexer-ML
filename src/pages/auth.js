//Librerias de React
import React, {Component} from 'react';

//Estilos
import './auth.css';

//Contexto
import AuthContext from '../context/auth-context';

//Componentes
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AuthPage extends Component{

    static contextType = AuthContext;

    constructor(props){
        super(props);

        this.state = {
            isLogin: true,
            message: '',
            email: '',
            password: '',
            nombre: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e){
        const {value, name} = e.target;
        this.setState({
            [name]: value
        });
    }


    submitHandler = event =>{
        event.preventDefault();

        let requestBody = {};

        if(this.state.isLogin){

            if(this.state.email === '' || this.state.password === ''){
                this.setState({message:'Diligencie todos los campos'});
                return;
            }

            requestBody = {
                query: `
                    query {
                        login(email: "${this.state.email}", password: "${this.state.password}"){
                            userId
                            token
                            tokenExpiration
                        }
                    } 
                `
            };
        }
        else{

            if(this.state.nombre === '' || this.state.email === '' || this.state.password === ''){
                this.setState({message:'Diligencie todos los campos'});
                return;
            }

            requestBody = {
                query: `
                    mutation {
                        createUser(userInput: {email: "${this.state.email}", password: "${this.state.password}", name: "${this.state.nombre}"}){
                            _id
                            email
                        }
                    } 
                `
            };
        }

        fetch('http://localhost:8000/api',{
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( res => {
            if(res.status !== 200 && res.status !== 201){
                console.log(res);
                throw new Error('Failed!');
            }
            return res.json()
        })
        .then(resData => {
            if(this.state.isLogin){
                if(resData.data.login.token){
                    this.context.login(
                        resData.data.login.token,
                        resData.data.login.userId,
                        resData.data.login.tokenExpiration
                    );
                }    
            }
        })
        .catch(err => {
            console.error("Ha ocurrido un error en Registrar" + err);
        });
    }

    switchModeHandler = () => {
        this.setState(
            prevState =>{
                return {
                    isLogin: !prevState.isLogin,
                    nombre :"",
                    email: "",
                    password: "",
                    message: ''
                }
            }
        );
    }

    render(){

    
        return ( 
        <form className="auth-form active" onSubmit={this.submitHandler} innactive>

            <header>
                <h1>
                    {!this.state.isLogin ? 'Registro':'Login'}
                </h1>
            </header>

            {!this.state.isLogin&&(
                <div className="form-control">
                    <div className="icon"><FontAwesomeIcon icon="user-alt" /></div>
                    <input type="text" id="nombre" name='nombre' value={this.state.nombre} onChange={this.handleInputChange} placeholder="Nombre" required/>
                </div>
            )}
            
            <div className="form-control">
                <div className="icon"><FontAwesomeIcon icon="envelope" /></div>
                <input type="email" id="email" name='email' value={this.state.email} onChange={this.handleInputChange} placeholder="E-mail" required/>
            </div>

            <div className="form-control">
                <div className="icon"><FontAwesomeIcon icon="key" /></div>
                <input type="password" id="password" name='password' value={this.state.password} onChange={this.handleInputChange} required placeholder="Contraseña"/>
            </div>

            <label className="message">
                {this.state.message}        
            </label>
            
            <div className="form-actions">
                <button type="submit">{!this.state.isLogin ? 'Registrame':'Ingresar'}</button>
                <button type="button" onClick = {this.switchModeHandler}>Ir a {this.state.isLogin ? 'Registro':'Login'}</button>
            </div>
        </form>
        );
    }
}

export default AuthPage;