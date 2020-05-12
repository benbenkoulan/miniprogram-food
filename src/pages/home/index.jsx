import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { settingSelector } from '../../store/selector';
import router from '../../router';

import './style.css';

function Index() {
    const settings = useSelector(settingSelector);

    useEffect(() => {
        // console.log('settings: ', settings);
    }, [settings]);

    const handleSearchLink = () => {
        console.log(settings);
        router.push('search');
    }

    return (
        <div className="page home--page">
            <div className="search--link" onClick={handleSearchLink}>今天想吃点什么?</div>
        </div>
    );
}

export default Index;
