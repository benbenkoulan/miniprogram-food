import React from 'react';
import { Layout, Sider, Content } from 'micro-design';
import 'micro-design/dist/es/components/grid/style';
import 'micro-design/dist/es/components/layout/style';

import './style.css';

function CookBook(props) {
    const { title, imagePath, ingredients, username, onClickCookBook, collectionCount } = props;

    return (
        <div onClick={onClickCookBook}>
            <Layout hasSider>
                <Sider width='80px'>
                    <wx-image mode="aspectFill" className="menu--icon" src={imagePath}/>
                </Sider>
                <Content style={{ textAlign: 'center' }} className={'menu-info--box'}>
                    <p className="menu-title--text">{title}</p>
                    <p className="menu-garnish--text">{ingredients}</p>
                    <p className="menu-star--text">{collectionCount}个收藏</p>
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
