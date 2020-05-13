import React from 'react';
import { Row, Col, Layout, Sider, Content } from 'micro-design';
import 'micro-design/dist/es/components/flex/style.css';
import 'micro-design/dist/es/components/layout/style.css';

import './style.css';

function Menu(props) {
    return (
        <Layout hasSider>
            <Sider width='80px'>
                <wx-image mode="aspectFill" className="menu--icon" src="/assets/images/meishi.jpg"></wx-image>
            </Sider>
            <Content style={{ textAlign: 'center' }} className={'menu-info--box'}>
                <p className="menu-title--text">炒合菜</p>
                <p className="menu-garnish--text">鸡蛋、韭菜、红薯粉丝、淀粉</p>
                <p className="menu-star--text">7个赞</p>
                <p className="menu-author--text">奔哥扣篮</p>
            </Content>
        </Layout>
    )
}

export default Menu;
