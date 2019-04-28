//Libreria de React
import React, {Component} from 'react';

//Estilos generales
import './docs.css';

//Componentes
import Modal from '../components/Modal/Modal';
import BackDrop from '../components/BackDrop/BackDrop';

class DocsPage extends Component{

    state ={
        creating: false
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
        return (
            <React.Fragment>
                {this.state.creating && (<div>
                    <BackDrop />
                    <Modal title="Agregar documentos" canConfirm onCancel={this.modalCancelHandler} onConfirm={this.modalConfirmHandler}>
                        <p>
                            Modal content
                        </p>
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