import React from 'react';
import { Row, Col, Layout, Sider, Content } from 'micro-design';
import 'micro-design/dist/es/components/grid/style';
import 'micro-design/dist/es/components/layout/style';

import useDataApi from '~/hooks/useDataApi';
import router from '~/router';

import Menu from './components/menu';

import './style.css';

const getMenus = () => [{
    key: 'COLLECTION',
    text: '我的收藏',
    onClick: () => router.push('collection')
}, {
    key: 'FOLLOW',
    text: '我的关注',
    onClick: () => router.push('my_follow'),
}, {
    key: 'MYCOOKBOOK',
    text: '我的菜谱',
    onClick: () => router.push('my_cookbook')
}];

function My() {
    const [statisticsInfo] = useDataApi('getStatisticsInfo', {
        initialData: {},
        propertyName: 'data',
    });

    const menus = getMenus();

    return (
        <div className="page">
            <Layout hasSider={true} className="section">
                <Content className="nickname--text">
                    <wx-open-data type="userNickName" />
                    <text className="join--text">2020-02 加入</text>
                </Content>
                <Sider width className="avtar--icon">
                    <wx-open-data type="userAvatarUrl" />
                </Sider>
            </Layout>
            <Layout hasSider align="center" justify="space-between" className="section">
                <Content>
                    <Row>
                        <Col span={6}>
                            <p>{statisticsInfo.starCount}</p>
                            <p>关注</p>
                        </Col>
                        <Col span={6}>
                            <p>{statisticsInfo.fansCount}</p>
                            <p>粉丝</p>
                        </Col>
                    </Row>
                </Content>
                <Sider width="80px">
                    <wx-button className="share--btn" open-type="share">分享</wx-button>
                </Sider>
            </Layout>
            {
                menus.map(menu => <Menu {...menu} />)
            }
        </div>
    );
}

export default My;
