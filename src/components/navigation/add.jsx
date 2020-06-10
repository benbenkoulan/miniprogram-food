import React from 'react';

import withUserInfoScope from '~/hoc/withUserInfoScope';

function Add(props) {
    const { onClick } = props;

    return (
        <div className="create--btn" onClick={onClick}>
            <wx-image mode="widthFix" className="create--icon" src="/assets/images/navigation/create.svg"></wx-image>
        </div>
    );
}

export default withUserInfoScope(Add);
