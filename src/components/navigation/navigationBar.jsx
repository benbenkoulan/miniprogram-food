import React from 'react';

import router from '~/router';
import throttle from '~/modules/utils/throttle';
import Add from './add';
import Home from './home';

const handleCreateClick = throttle(() => {
    router.push('create');
}, 500);

const handleBackClick = throttle(() => {
    router.back();
}, 500);

const handleHomeClick = throttle(() => {
    router.switchTab('home');
}, 500);

function NavigationBar(props) {
    const {
        shouldShowBack,
        shouldShowCreate,
        shouldShowHome,
        paddingHorizontal,
        paddingVertical,
        navigationTitle
    } = props;

    return (
        <div style={{ padding: `${paddingVertical}px 0` }} className="navigation--bar">
            <div style={ { padding: `${paddingVertical}px ${paddingHorizontal}px` } } class="btns--box">
                { shouldShowBack && (<div className="back--btn" onClick={handleBackClick}>
                    <wx-image mode="widthFix" className="back--icon" src="/assets/images/navigation/back.svg"></wx-image>
                </div>) }
                { shouldShowCreate && (<Add onClick={handleCreateClick} />) } 
                { shouldShowHome && (<Home onClick={handleHomeClick} />) } 
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