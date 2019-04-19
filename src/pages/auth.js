//Librerias de React
import React, {Component} from 'react';

//Estilos
import './auth.css';

class AuthPage extends Component{


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
            console.log(resData);
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

        const Register = () => {return !this.state.isLogin ? 
            <div className="form-control">
                <label htmlFor="name">
                    Nombre
                </label>
                <input type="text" id="Nombre" name='nombre' value={this.state.nombre} onChange={this.handleInputChange}/>
            </div>
            :
            <div></div>
        }
    
        return ( 
        <form className="auth-form" onSubmit={this.submitHandler}>

            <header>
                <h1>
                    {!this.state.isLogin ? 'Registro':'Login'}
                </h1>
            </header>

            <Register/>
            
            <div className="form-control">
                <label htmlFor="email">
                    E-mail
                </label>
                <input type="email" id="email" name='email' value={this.state.email} onChange={this.handleInputChange}/>
            </div>

            <div className="form-control">
                <label htmlFor="password">
                    Contraseña
                </label>
                <input type="password" id="password" name='password' value={this.state.password} onChange={this.handleInputChange}/>
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