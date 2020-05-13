import React from 'react';
import ReactDOM from 'react-dom';

import './style.css';

function Modal(props) {
    const modalRoot = document.getElementById('modalRoot');

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
            modalRoot,
        )
    );
}

Modal.defaultProps = {
    onModalClick: () => {},
};

export default Modal;
