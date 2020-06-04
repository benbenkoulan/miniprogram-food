import React from 'react'
import { Layout, Sider, Content } from 'micro-design'
import 'micro-design/dist/es/components/layout/style.css'

import router from '~/router'

import './style.css'

function CookBook(props) {
    const { imagePath, title, id, userName, avatarUrl, count, isDraft } = props
    const handleCookBookClick = () => {
        console.log('---handleCookBookClick--')
        router.push('cookbook', { id })
    }

    const handleCreateCookBook = () => {
        router.push('create', { id })
    }

    return (
        <div style={{ margin: '20px' }} onClick={isDraft ? handleCreateCookBook : handleCookBookClick}>
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
            <Layout hasSider className="cookbook-follow--text">
                <Content>
                    收藏{count}人
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
