import React, { useState, useEffect } from 'react';

import { Layout, Content, Header } from 'micro-design';
import 'micro-design/dist/es/components/layout/style.css';

import { getPageCount } from '../../router';

import NavigationBar from './navigationBar';
import './style.css';

function withNavigation(PageComponent, { showCreate = true, navigationTitle = '' } = {}) {
    return (props) => {
        const [pageCount, setPageCount] = useState(getPageCount());

        const rect = wx.getMenuButtonBoundingClientRect();
        const systemInfo = wx.getSystemInfoSync();

        const navigationProps = {
            showCreate,
            navigationTitle,
            showBack: pageCount > 1,
            paddingVertical: rect.top,
            paddingHorizontal: systemInfo.windowWidth - rect.right,
        };

        useEffect(() => {
            setPageCount(getPageCount());
        }, []);

        return (
            <Layout className="page">
                <Header>
                    <NavigationBar {...navigationProps} />
                </Header>
                <Content>
                    <PageComponent {...props} />
                </Content>
            </Layout>
        )
    }
}

export default withNavigation;
