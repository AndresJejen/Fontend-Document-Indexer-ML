//Libreria de React
import React, {Component} from 'react';

//Estilos generales
import './docs.css';

//Componentes
import Modal from '../components/Modal/Modal';
import BackDrop from '../components/BackDrop/BackDrop';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class DocsPage extends Component{

    state ={
        creating: false,
        stagecreating: 1
    }
      
    startCreateDocHandler = () =>{
        this.setState({creating:true});
    }

    modalConfirmHandler = () => {
        this.setState({creating:false});
    }

    modalCancelHandler = () => {
        this.setState({creating:false});
    }

    render(){

        const mlanguages = [
            { value: 'python', label: 'python' },
            { value: 'R', label: 'R' },
            { value: 'julia', label: 'julia' },
            { value: 'java', label: 'java' },
            { value: 'javascript', label: 'javascript' }
        ];

        const typedoc = [
            { value: 'PDF', label: 'PDF' },
            { value: 'Notebook', label: 'Notebook' },
            { value: 'Video', label: 'Video' },
            { value: 'BPost', label: 'Blog Post' }
        ];

        const wlanguages = [
            { value: 'English', label: 'English' },
            { value: 'Español', label: 'Español' },
            { value: 'Deutsch', label: 'Deutsch' }
        ];

        const levels = [
            { value: 'Básico', label: 'Básico' },
            { value: 'Medio', label: 'Medio' },
            { value: 'Avanzado', label: 'Avanzado' }
        ];

        return (

            <React.Fragment>
                {this.state.creating && (<div>
                    <BackDrop />
                    <Modal title="Agregar documentos" canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}>

                        <header>
                            <h1>
                                {this.state.creating ? 
                                    this.state.stagecreating ===1 ? 
                                        'Información Básica':  
                                        this.state.stagecreating ===2 ?
                                            'Información Técnica' :
                                            'Niveles de aprendizaje' :
                                ""}
                            </h1>
                        </header>

                        <form className="doc-form innactive">
                            <div className = "form-control">
                                <div className="icon"><FontAwesomeIcon icon="file-signature" /></div>
                                <input type="text" id="name" placeholder="Nombre"></input>
                            </div>

                            <div className = "form-control">
                                <div className="icon"><FontAwesomeIcon icon="user-alt" /></div>
                                <input type="text" id="author" placeholder="Autor"></input>
                            </div>

                            <div className = "form-control">
                                <div className="icon"><FontAwesomeIcon icon="link" /></div>
                                <input type="text" id="link" placeholder="URL"></input>
                            </div>
                        </form>    
                        <form className="doc-form active">


                            <div className = "form-control">
                                <div className="icon"><FontAwesomeIcon icon="code" /></div>
                                <Select
                                    defaultValue={null}
                                    isMulti
                                    name="mlanguaje"
                                    options={mlanguages}
                                    className="basic-multi-select selector"
                                    classNamePrefix="select"
                                    placeholder="Lenguaje de Computadora (Opcional)"
                                />
                            </div>

                            <div className = "form-control">
                                <div className="icon"><FontAwesomeIcon icon="file-alt" /></div>
                                <Select options={typedoc} className="selector" placeholder="Tipo de Documento"/>
                            </div>

                            <div className = "form-control">
                                <div className="icon"><FontAwesomeIcon icon="language" /></div>
                                <Select options={wlanguages} className="selector" placeholder="Idioma"/>
                            </div>
                        </form>

                        <form className="doc-form innactive">
                            <div className = "form-control">
                                <div className="icon"><FontAwesomeIcon icon="sort-amount-down" /></div>
                                <Select options={levels} className="selector" placeholder="Nivel inicial"/>
                            </div>

                            <div className = "form-control">
                                <div className="icon"><FontAwesomeIcon icon="sort-amount-up" /></div>
                                <Select options={levels} className="selector" placeholder="Nivel Final"/>
                            </div>


                        </form>
                    </Modal>
                    </div>
                )
                }
                <div className="docs-control">
                    <p>
                        Comparte un nuevo documento
                    </p>
                    <button className="btn" onClick={this.startCreateDocHandler}>
                        Agregar documento
                    </button>
                </div>
            </React.Fragment>
        );
    }
}

export default DocsPage;