import React from 'react';
import { Layout, Sider, Content } from 'micro-design';
import 'micro-design/dist/es/components/layout/style.css';

import router from '~/router';

import './style.css';

function CookBook(props) {
    const { imagePath, title, id, userName, avatarUrl, } = props;

    const handleCookBookClick = () => {
        console.log('---handleCookBookClick--')
        router.push('cookbook', { id });
    };

    console.log('-----CookBook------');

    return (
        <div style={{ marginBottom: '20px' }} onClick={handleCookBookClick}>
            <div className="cookbook-image--box">
                <wx-image mode="aspectFill" className="cookbook--image" src={imagePath}></wx-image>
            </div>
            <Layout hasSider>
                <Content className="one-row--text cookbook-title--text">
                    {title}
                </Content>
                <Sider width="100px" className="author-info--box">
                    <wx-image className="author--icon" src={avatarUrl}></wx-image>
                </Sider>
            </Layout>
            <Layout hasSider className="cookbook-follow--text">
                <Content>
                    收藏10人
                </Content>
                <Sider width="100px" className="author-info--box">
                    {userName}
                </Sider>
            </Layout>
        </div>
    )
}

CookBook.defaultProps = {
    imagePath: null,
    title: '',
    avatarUrl: null,
    userName: '',
}

export default CookBook;
