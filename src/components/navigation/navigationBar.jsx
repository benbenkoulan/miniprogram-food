import React from 'react';
import throttle from 'lodash/throttle';

import router from '~/router';
import Add from './add';

const handleCreateClick = throttle(() => {
    router.push('create');
});

const handleBackClick = throttle(() => {
    router.back();
}, 1000);

function NavigationBar(props) {
    const { shouldShowBack, shouldShowCreate, paddingHorizontal, paddingVertical, navigationTitle } = props;

    return (
        <div style={{ padding: `${paddingVertical}px 0` }} className="navigation--bar">
            <div style={ { padding: `${paddingVertical}px ${paddingHorizontal}px` } } class="btns--box">
                { shouldShowBack && (<div className="back--btn" onClick={handleBackClick}>
                    <wx-image mode="widthFix" className="back--icon" src="/assets/images/navigation/back.svg"></wx-image>
                </div>) }
                { shouldShowCreate && (<Add onClick={handleCreateClick} />) } 
            </div>
            { navigationTitle }
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