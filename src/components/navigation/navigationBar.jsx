import React from 'react';
import throttle from 'lodash/throttle';

import router from '../../router';

function NavigationBar(props) {
    const { shouldShowBack, shouldShowCreate, paddingHorizontal, paddingVertical } = props;

    const handleCreateClick = () => {
        router.push('create');
    };

    const handleBackClick = throttle(() => {
        router.back();
    }, 1000);

    return (
        <div style={{ padding: `${paddingVertical}px 0` }} className="navigation--bar">
            <div style={ { padding: `${paddingVertical}px ${paddingHorizontal}px` } } class="btns--box">
                { shouldShowBack && (<div className="back--btn" onClick={handleBackClick}>
                    <wx-image mode="widthFix" className="back--icon" src="/assets/images/navigation/back.svg"></wx-image>
                </div>) }
                { shouldShowCreate && (<div className="create--btn" onClick={handleCreateClick}>
                    <wx-image mode="widthFix" className="create--icon" src="/assets/images/navigation/create.svg"></wx-image>
                </div>) } 
            </div>
            { props.navigationTitle }
        </div>
    )
}

NavigationBar.defaultProps = {
    shouldShowBack: false,
    shouldShowCreate: true,
    navigationTitle: '',
    paddingVertical: 0,
    paddingHorizontal: 0,
};

export default NavigationBar;