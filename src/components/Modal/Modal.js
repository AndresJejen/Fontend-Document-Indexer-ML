//Librerias de React
import React from 'react';

//Estilos
import './Modal.css';


const Modal = props => (
    <div className="modal">
        <header className="modal__header"><h1>{props.title}</h1></header>
        <section className="modal__content">
            {props.children}
        </section>
        <section className="modal__actions">
            <button className="btn" onClick={props.onCancel}>
                Cancelar
            </button>
            {props.canConfirm && <button className="btn" onClick={props.onConfirm}>
                Confirmar
            </button>}
        </section>
    </div>
    );

export default Modal;