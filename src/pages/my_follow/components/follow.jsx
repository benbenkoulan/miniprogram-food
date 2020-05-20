import React from 'react';
import { Layout, Sider, Content } from 'micro-design';
import 'micro-design/dist/es/components/layout/style.css';

import './style.css';

function Follow(props) {
    return (
        <Layout hasSider className="follow--box">
            <Content>
                <wx-image className="avatar--icon" src="https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eroNkExCxm1HAtujBMe2c7Ne5KOFBnic22hSiaPV28TDmvql1HW8w5mp9wMjrjVzia2t2qksgGoQX0yA/132"></wx-image>
                <span className="one-row--text follow-name--text">小甜心小可爱</span>
            </Content>
            <Sider className="inline-middle--box">
                {
                    props.isFollowed ? (<wx-button className="follow--btn">已关注</wx-button>) : (<wx-button className="unfollowed follow--btn">关注</wx-button>)
                }
            </Sider>
        </Layout>
    );
}

Follow.defaultProps = {
    avatarUrl: '',
    nickName: '',
    isFollowed: false,
    onFollow: () => {}
};

export default Follow;
