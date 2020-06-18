import React from 'react';
import { Layout, Sider, Content } from 'micro-design';

import './style.css';

function CookBook(props) {
    const { title, imagePath, ingredients, username, onClickCookBook, collectionCount, avatarUrl } = props;
    return (
        <div onClick={onClickCookBook} style={{margin: "5px 0"}}>
            <Layout hasSider>
                <Sider width='80px'>
                    <wx-image mode="aspectFill" className="menu--icon" src={imagePath}/>
                </Sider>
                <Content style={{ textAlign: 'center' }} className={'menu-info--box'}>
                    <p className="menu-title--text">{title}</p>
                    <p className="menu-garnish--text">{ingredients}</p>
                    <p className="menu-author--text">
                        <wx-image src={avatarUrl} className="menu-author--avatar"/>{username}
                        <p className="menu-collection--box">
                            <wx-image className="menu-collection--avatar" src="/assets/images/collection_search.png"/>
                            {collectionCount}个收藏
                        </p>
                    </p>
                </Content>
            </Layout>
        </div>
    )
}

CookBook.defaultProps = {
    onClickCookBook: () => {}
};

export default CookBook;
