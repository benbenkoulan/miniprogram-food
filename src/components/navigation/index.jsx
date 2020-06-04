import React, { useState, useEffect } from 'react';

import { getPageCount } from '~/router';

import NavigationBar from './navigationBar';
import './style.css';

export function Navigation(props) {
    const { showCreate, shouldShowCreate, navigationTitle } = props;
    const [pageCount, setPageCount] = useState(getPageCount());

    const rect = wx.getMenuButtonBoundingClientRect();
    const systemInfo = wx.getSystemInfoSync();

    const navigationProps = {
        navigationTitle,
        shouldShowCreate: shouldShowCreate === undefined ? showCreate : shouldShowCreate,
        shouldShowBack: pageCount > 1,
        paddingVertical: rect.top,
        paddingHorizontal: systemInfo.windowWidth - rect.right,
    };

    useEffect(() => {
        setPageCount(getPageCount());
    }, []);

    return (
        <NavigationBar {...navigationProps} />
    );
}
