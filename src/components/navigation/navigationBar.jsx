import React from 'react';
// import { Layout, Content, Sider } from 'micro-design';
// import 'micro-design/dist/es/components/layout/style.css';

import router from '../../router';

function NavigationBar(props) {
    const { paddingHorizontal, paddingVertical } = props;

    const handleCreateClick = () => {
        router.push('create');
    };

    const handleBackClick = () => {
        router.back();
    };

    // console.log(props);

    return (
        <div style={{ padding: `${paddingVertical}px 0` }} className="navigation--bar">
            <div style={ { padding: `${paddingVertical}px ${paddingHorizontal}px` } } class="btns--box">
                { props.showBack && (<div className="back--btn" onClick={handleBackClick}>
                    <wx-image mode="widthFix" className="back--icon" src="/assets/images/navigation/back.svg"></wx-image>
                </div>) }
                { props.showCreate && (<div className="create--btn" onClick={handleCreateClick}>
                    <wx-image mode="widthFix" className="create--icon" src="/assets/images/navigation/create.svg"></wx-image>
                </div>) } 
            </div>
            { props.navigationTitle }
        </div>
    )
}

NavigationBar.defaultProps = {
    showBack: false,
    showCreate: true,
    navigationTitle: '',
    paddingVertical: 0,
    paddingHorizontal: 0,
    
};

export default NavigationBar;