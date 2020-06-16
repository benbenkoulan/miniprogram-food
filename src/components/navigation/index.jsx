import React from 'react';

import usePageStack from '~/hooks/usePageStack';

import NavigationBar from './navigationBar';
import './style.css';

export function Navigation(props) {
    const {
        shouldShowHome,
        shouldShowCreate,
        navigationTitle,
    } = props;
    const pageCount = usePageStack();

    const rect = wx.getMenuButtonBoundingClientRect();
    const systemInfo = wx.getSystemInfoSync();

    const navigationProps = {
        navigationTitle,
        shouldShowCreate,
        shouldShowHome,
        shouldShowBack: pageCount > 1,
        paddingVertical: rect.top,
        paddingHorizontal: systemInfo.windowWidth - rect.right,
    };

    return (
        <NavigationBar {...navigationProps} />
    );
}
