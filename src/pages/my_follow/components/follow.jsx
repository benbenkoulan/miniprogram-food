import React from 'react';
import { Layout, Sider, Content } from 'micro-design';

import './style.css';

function Follow(props) {
    const { avatarUrl, userName, isFollowed, onFollow, onClickUser } = props;

    return (
        <Layout hasSider className="follow--box">
            <Content onClick={onClickUser}>
                <wx-image className="avatar--icon" src={avatarUrl}/>
                <span className="one-row--text follow-name--text">{userName}</span>
            </Content>
            <Sider className="inline-middle--box">
                {
                    isFollowed
                        ? (<wx-button className="follow--btn" onClick={onFollow}>已关注</wx-button>)
                        : (<wx-button className="unfollowed follow--btn" onClick={onFollow}>关注</wx-button>)
                }
            </Sider>
        </Layout>
    );
}

Follow.defaultProps = {
    avatarUrl: '',
    nickName: '',
    isFollowed: true,
    onFollow: () => {}
};

export default Follow;
