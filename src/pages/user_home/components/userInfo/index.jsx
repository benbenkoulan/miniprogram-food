import React, { Fragment } from 'react'
import { Row, Col, Layout, Content, Sider } from 'micro-design'
import './style.css'

function UserInformation(props) {

    const { username, createdTime, gender, country, starCount, fansCount, avatarUrl, isAttention } = props
    const handleLookUpFollowEvent = () => {
        props.onClickLookUpAttention()
    }

    const handleClickFollowEvent = () => {
        props.onClickAttention()
    }

    return (
        <Fragment>
            <Layout hasSider={true} className='wrap'>
                <Content className="nickname--text">
                    <text>{username}</text>
                    <div>
                        <text className="join--text">
                            {createdTime && createdTime.substring(0, 10)} 加入
                        </text>
                        <text className="join--text">
                            {gender === '1' ? '男' : '女'}
                        </text>
                        <text className="join--text">
                            {country}
                        </text>
                    </div>
                </Content>
                <wx-image src={avatarUrl} className="avtar--icon"/>
            </Layout>
            <Layout hasSider align="center" justify="space-between" className="section">
                <Content>
                    <Row>
                        <Col span={6} onClick={handleLookUpFollowEvent}>
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
                <Sider width="80px" class="margin-left">
                    {isAttention
                        ? <wx-button className="attention--btn grey" onClick={handleClickFollowEvent}>已关注</wx-button>
                        : <wx-button className="attention--btn" onClick={handleClickFollowEvent}>关注</wx-button>}
                </Sider>
            </Layout>
        </Fragment>
    )
}

export default UserInformation
