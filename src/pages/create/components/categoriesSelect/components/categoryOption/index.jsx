import React from 'react';
import noop from 'lodash/noop'

import './style.css';

function CategoryOption(props) {
    const { name, isChecked, isDisabled = false, onCheck } = props;
    const className = `option--box ${ isChecked ? 'checked' : '' } ${ isDisabled ? 'disabled' : '' }`;

    return (
        <div className={className} onClick={isDisabled ? noop : onCheck }>
            {name}
            { isChecked && <wx-image src="/assets/images/create/checked.svg" className="checked--icon"></wx-image> }
        </div>
    );
}

export default CategoryOption;
