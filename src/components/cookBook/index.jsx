import React from 'react'
import { Layout, Sider, Content } from 'micro-design'

import router from '~/router'

import './style.css'

function CookBook(props) {

    const { imagePath, title, userName, avatarUrl, collectionCount } = props

    const handleClick = (e) => {
        e.stopPropagation();
        props.handleClickEvent();
    }

    return (
        <div style={{ margin: '20px' }} onClick={handleClick}>
            {imagePath
                ? (<div className="cookbook-image--box">
                    <wx-image mode="aspectFill" className="cookbook--image" src={imagePath}/>
                </div>)
                : <div className="no-picture">暂未上传图片</div>}
            <Layout hasSider>
                <Content className="one-row--text cookbook-title--text">
                    {title}
                </Content>
                <Sider width="100px" className="author-info--box">
                    <wx-image className="author--icon" src={avatarUrl}/>
                </Sider>
            </Layout>
            <Layout hasSider style={{ justifyContent: 'center' }} className="cookbook-follow--text">
                <Content>
                    { collectionCount > 0 ? `收藏${collectionCount}人` : '' }
                </Content>
                <Sider width="100px" className="author-info--box">
                    {userName}
                </Sider>
            </Layout>
        </div>
    )
}

CookBook.defaultProps = {
    imagePath: null,
    title: '',
    avatarUrl: null,
    userName: '',
    count: 0
}

export default CookBook
