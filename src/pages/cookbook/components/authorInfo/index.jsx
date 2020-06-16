import React from 'react'
import { Layout, Sider, Content } from 'micro-design'

import FollowButton from './followButton';
import './style.css'

function AuthorInfo(props) {

    const handleClickAttention = () => {
        props.handleClickAttention()
    }

    const handleClickUserHome = () => {
        props.handleClickUserHome()
    }

    return (
        <div>
            <Layout hasSider className="author-info--box">
                <Content className="author-info" onClick={handleClickUserHome}>
                    <wx-image className="author--icon" src={props.authorUrl}/>
                    <Content className="author--name">
                        {props.name}
                    </Content>
                </Content>
                <Sider width="80px" className="attention-btn--box">
                    <FollowButton onClick={handleClickAttention} isAttention={props.isAttention} />
                </Sider>
            </Layout>
            <wx-p className="cookbook--description">{props.description}</wx-p>
        </div>
    )
}

export default AuthorInfo
