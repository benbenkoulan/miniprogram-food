import React from 'react';
import { Row, Col, Layout, Sider, Content } from 'micro-design';
import 'micro-design/dist/es/components/flex/style.css';
import 'micro-design/dist/es/components/layout/style.css';

import './style.css';

function Food(props) {
    return (
        <Layout>
            <Sider width='80px'>
                <wx-image mode="aspectFill" className="food--icon" src="../../common/images/meishi.jpg"></wx-image>
            </Sider>
            <Content style={{ textAlign: 'center' }} className={'food-info--box'}>
                <p className="food-title--text">炒合菜</p>
                <p className="food-garnish--text">鸡蛋、韭菜、红薯粉丝、淀粉</p>
                <p className="food-star--text">7个赞</p>
                <p className="food-author--text">奔哥扣篮</p>
            </Content>
        </Layout>
    )
}

export default Food;
