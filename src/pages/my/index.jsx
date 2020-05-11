import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Menu } from 'antd';
// import 'antd/es/menu/style/css';

import { Row, Col, Layout, Sider, Content, useList } from 'micro-design';
import 'micro-design/dist/es/components/flex/style.css';
import 'micro-design/dist/es/components/layout/style.css';

import { settingSelector } from '../../store/selector';

import { getStatisticsInfo, upsertUserInfo } from '../../api';

import Menu from './components/menu';

import './style.css';

// const { SubMenu } = Menu;

const getMenus = () => [{
    key: 'COLLECTION',
    text: '我的收藏',
    handleClick: () => {

    }
}, {
    key: 'FOLLOW',
    text: '我的关注',
}, {
    key: 'MENU',
    text: '我的菜谱',
}]

function My() {
    const getUserInfoButton = useRef();
    const setting = useSelector(settingSelector);
    const dispatch = useDispatch();

    const handleGetUserInfo = (res) => {
        dispatch({ type: 'Authorized', });
        upsertUserInfo(res.encryptedData, res.iv);
    };

    useEffect(async () => {
        // getUserInfoButton.current.addEventListener('getuserinfo', handleGetUserInfo);
        // const res = await getStatisticsInfo();
        // console.log(res);
        // wx.getUserInfo({
        //     success(res) {
        //         upsertUserInfo(res.encryptedData, res.iv);
        //         console.log(res);
        //     }
        // });
        // wx.getSetting({
        //     success(res) {
        //         console.log('setting: ', res);
        //     }
        // });
        return () => {
            // getUserInfoButton.current.removeEventListener('getuserinfo', handleGetUserInfo);
        }
    }, []);

    const renderMenu = (menuData) => (
        <Menu
            {...menuData}
        />
    );

    const [setMenuList, renderMenuList] = useList(getMenus());

    return (
        <div>
            <Layout hasSider={true} className="section">
                <Content className="nickname--text">
                    <wx-open-data type="userNickName" />
                    <text className="join--text">2020-02 加入</text>
                </Content>
                <Sider width className="avtar--icon">
                    <wx-open-data type="userAvatarUrl" />
                </Sider>
            </Layout>
            <Layout hasSider={true} justify="space-between" className="section">
                <Content>
                    <Row>
                        <Col span={6}>
                            <p>2</p>
                            <p>关注</p>
                        </Col>
                        <Col span={6}>
                            <p>10</p>
                            <p>粉丝</p>
                        </Col>
                    </Row>
                </Content>
                <Sider width="80px">
                    <wx-button className="share--btn" open-type="share">分享</wx-button>
                </Sider>
            </Layout>
            {
                renderMenuList(renderMenu)
            }
            {/* <wx-button open-type="getUserInfo" ref={getUserInfoButton}>保存</wx-button> */}
        </div>
    );
}

export default My;
