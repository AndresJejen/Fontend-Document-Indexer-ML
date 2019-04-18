//Librerias de React
import React, {Component} from 'react';

//Estilos
import './auth.css';

class AuthPage extends Component{

    constructor(props){
        super(props);
        this.emailEL = React.createRef();
        this.passwordEL = React.createRef();
        this.nameEL = React.createRef();
        this.levelEL = React.createRef();
    }

    submitHandler = event =>{
        event.preventDefault();
        const email = this.emailEL.current.value;
        const password = this.passwordEL.current.value;
        const name = this.nameEL.current.value;
        const level = this.levelEL.current.value;

        if(email.trim().length === 0 || password.trim().length === 0 || name.trim().length === 0 || level.trim().length === 0){
            return;
        }

        const requestBody = {
            query: `
                mutation {
                    createUser(userInput: {email: "${email}", password: "${password}", name: "${name}", level: "${level}"}){
                        _id
                        email
                        name
                    }
                } 
            `
        };

        fetch('http://localhost:8000/api',{
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( res => {
            if(res.status !== 200 && res.status !== 201){
                throw new Error('Failed!');
            }
            return res.json()
        })
        .then(resData => {
            console.log(resData);
        })
        .catch(err => {
            console.error("Ha ocurrido un error en ingresar" + err);
        });
    }

    render(){
        return ( 
        <form className="auth-form" onSubmit={this.submitHandler}>
            
            <div className="form-control">
                <label htmlFor="name">
                    Nombre
                </label>
                <input type="text" id="Nombre" ref={this.nameEL}/>
            </div>
            
            <div className="form-control">
                <label htmlFor="email">
                    E-mail
                </label>
                <input type="email" id="email" ref={this.emailEL}/>
            </div>

            <div className="form-control">
                <label htmlFor="password">
                    Contraseña
                </label>
                <input type="password" id="password" ref={this.passwordEL}/>
            </div>
            
            <div className="form-control">
                <label htmlFor="Level">
                    Nivel de Seguridad
                </label>
                <input type="text" id="Level" ref={this.levelEL}/>
            </div>

            <div className="form-actions">
                <button type="button">Registrarme</button>
                <button type="submit">Log In</button>
            </div>
        </form>
        );
    }
}

export default AuthPage;