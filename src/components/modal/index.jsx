import React from 'react';
import ReactDOM from 'react-dom';

import './style.css';

function Modal(props) {
    const modalRoot = document.getElementById('modalRoot');

    return (
        ReactDOM.createPortal(
            (
                <div className="modal--box">
                    {props.children}
                </div>
            ),
            modalRoot,
        )
    );
}

export default Modal;
