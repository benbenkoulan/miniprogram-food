import React from 'react';
import { Layout, Sider, Content } from 'micro-design';
import 'micro-design/dist/es/components/layout/style.css';

function Follow(props) {
    return (
        <Layout hasSider>
            <Content></Content>
            <Sider>
                {
                    props.isFollowed ? (<button>已关注</button>) : (<button>关注</button>)
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
