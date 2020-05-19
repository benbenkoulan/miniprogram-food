import React from 'react';
import { Layout, Sider, Content } from 'micro-design';
import 'micro-design/dist/es/components/layout/style.css';

import router from '~/router';

import './style.css';

function CookBook(props) {
    const { cookBookInfo } = props;

    const handleCookBookClick = () => {
        console.log('---handleCookBookClick--')
        router.push('cookbook', { id: cookBookInfo.id });
    };

    console.log('-----CookBook------');

    return (
        <div style={{ marginBottom: '20px' }} onClick={handleCookBookClick}>
            <div className="cookbook-image--box">
                <wx-image mode="aspectFill" className="cookbook--image" src={cookBookInfo.imagePath}></wx-image>
            </div>
            <Layout hasSider>
                <Content className="one-row--text cookbook-title--text">
                    {cookBookInfo.title}
                </Content>
                <Sider width="100px" className="author-info--box">
                    <wx-image className="author--icon" src="https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eroNkExCxm1HAtujBMe2c7Ne5KOFBnic22hSiaPV28TDmvql1HW8w5mp9wMjrjVzia2t2qksgGoQX0yA/132"></wx-image>
                </Sider>
            </Layout>
            <Layout hasSider className="cookbook-follow--text">
                <Content>
                    收藏10人
                </Content>
                <Sider width="100px" className="author-info--box">
                    benkoulan
                </Sider>
            </Layout>
        </div>
    )
}

CookBook.defaultProps = {
    cookBookInfo: {},
    onClickCookBook: () => {}
}

export default CookBook;
