import React from 'react';
import { Row, Col, Layout, Sider, Content } from 'micro-design';
import 'micro-design/dist/es/components/flex/style.css';
import 'micro-design/dist/es/components/layout/style.css';

import './style.css';

function CookBook(props) {
    const { title, imagePath, ingredients, username, onClickCookBook } = props;

    return (
        <div onClick={onClickCookBook}>
            <Layout hasSider>
                <Sider width='80px'>
                    <wx-image mode="aspectFill" className="menu--icon" src={imagePath}></wx-image>
                </Sider>
                <Content style={{ textAlign: 'center' }} className={'menu-info--box'}>
                    <p className="menu-title--text">{title}</p>
                    <p className="menu-garnish--text">{ingredients}</p>
                    <p className="menu-star--text">7个赞</p>
                    <p className="menu-author--text">{username}</p>
                </Content>
            </Layout>
        </div>
    )
}

CookBook.defaultProps = {
    onClickCookBook: () => {}
};

export default CookBook;
