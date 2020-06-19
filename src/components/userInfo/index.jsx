import React, { Fragment } from 'react'
import { Row, Col, Layout, Sider, Content } from 'micro-design'

import router from '~/router';

import './style.css'

const handleClickFollow = () => router.push('my_follow');

function UserInfo(props) {

    const { starCount, fansCount, user } = props

    return (
        <Fragment>
            <Layout hasSider={true} className='section'>
                <Content className="nickname--text">
                    <wx-open-data type="userNickName"/>
                    <div>
                        <text className="join--text">
                            {user && user.createdTime.substring(0, 10)} 加入
                        </text>
                    </div>
                </Content>
                <Sider width className="avtar--icon">
                    <wx-open-data type="userAvatarUrl"/>
                </Sider>
            </Layout>
            <Layout hasSider align="center" justify="space-between" className="section">
                <Content>
                    <Row>
                        <Col span={6} onClick={handleClickFollow}>
                            <p style={{ textIndent: '2px' }}>{starCount}</p>
                            <p>关注</p>
                        </Col>
                        <Col span={6}>
                            <p style={{ textIndent: '2px' }}>{fansCount}</p>
                            <p>粉丝</p>
                        </Col>
                    </Row>
                </Content>
                <Sider width="60px">
                    <wx-button className="share--btn" open-type="share">分享</wx-button>
                </Sider>
            </Layout>
        </Fragment>
    )
}

export default UserInfo
