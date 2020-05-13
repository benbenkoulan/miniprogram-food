import React from 'react';
import { Layout, Sider, Content } from 'micro-design';
import 'micro-design/dist/es/components/layout/style.css';

import router from '~/router';

import './style.css';

function CookBook(props) {
    const handleCookBookClick = () => {
        console.log('---handleCookBookClick--')
        router.push('cookbook');
    };

    return (
        <div onClick={handleCookBookClick}>
            <div className="cookbook-image--box">
                <wx-image mode="aspectFill" className="cookbook--image" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1878693115,3508437105&fm=26&gp=0.jpg"></wx-image>
            </div>
            <Layout hasSider>
                <Content className="one-row--text cookbook-title--text">
                    正宗北京大烤鸭好吃到爆哈哈哈哈哈哈哈哈哈哈哈哈哈哈
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
    onClickCookBook: () => {}
}

export default CookBook;
