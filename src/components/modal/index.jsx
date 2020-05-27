import React from 'react';
import ReactDOM from 'react-dom';

import './style.css'

function Modal(props) {
    const container = document.querySelector('.modal--container');
    
    const handleModalClick = (e) => {
        e.stopPropagation();
        props.onModalClick();
    }

    return (
        ReactDOM.createPortal(
            (
                <div className="modal--box" onClick={handleModalClick}>
                    {props.children}
                </div>
            ),
            container,
        )
    );
}

Modal.defaultProps = {
    onModalClick: () => {},
};

export default Modal;
