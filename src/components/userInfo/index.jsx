import React, { Fragment } from 'react'
import { Row, Col, Layout, Sider, Content } from 'micro-design'
import './style.css'


function UserInfo(props) {

    const { starCount, fansCount, user, isSection, isUserInfoDisplay } = props

    return (
        <Fragment>
            <Layout hasSider={true} className={isSection ? 'section' : 'wrap'}>
                <Content className="nickname--text">
                    {isUserInfoDisplay
                        ? <text>{user && user.username}</text>
                        : <wx-open-data type="userNickName"/>}
                    <div>
                        <text className="join--text">
                            {user && user.createdTime.substring(0, 10)} 加入
                        </text>
                        {
                            isUserInfoDisplay && (
                                <Fragment>
                                    <text className="join--text">
                                        {user && user.gender === '1' ? '男' : '女'}
                                    </text>
                                    <text className="join--text">
                                        {user && user.country}
                                    </text>
                                </Fragment>
                            )
                        }
                    </div>
                </Content>
                {isUserInfoDisplay
                    ?
                    <wx-image src={user && user.avatarUrl} className="avtar--icon"/>
                    :
                    <Sider width className="avtar--icon">
                        <wx-open-data type="userAvatarUrl"/>
                    </Sider>}
            </Layout>
            <Layout hasSider align="center" justify="space-between" className="section">
                <Content>
                    <Row>
                        <Col span={6}>
                            <p>{starCount}</p>
                            <p>关注</p>
                        </Col>
                        <Col span={6}>
                            <p>{fansCount}</p>
                            <p>粉丝</p>
                        </Col>
                    </Row>
                </Content>
                <Sider width="60px">
                    <wx-button className="share--btn" open-type="share">分享</wx-button>
                </Sider>
                {
                    isUserInfoDisplay && <Sider width="80px" class="margin-left">
                        <wx-button className="attention--btn">关注</wx-button>
                    </Sider>
                }

            </Layout>
        </Fragment>
    )
}

export default UserInfo
