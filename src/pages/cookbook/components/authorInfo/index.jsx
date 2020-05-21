import React from 'react'
import {Layout, Sider, Content} from 'micro-design'
import './style.css'
import { BASE_REQUEST_URL } from '../../../../modules/constant/network'

function AuthorInfo(props) {
    return (
        <div>
            <Layout hasSider className="author-info--box">
                <Sider width="60px">
                    <wx-image className="author--icon" src={props.authorUrl}/>
                </Sider>
                <Content className="author--name">
                    {props.name}
                </Content>
                <Sider width="80px" className="attention-btn--box">
                    <wx-button className="attention--btn" >关注</wx-button>
                </Sider>
            </Layout>
            <wx-p className="cookbook--description">{props.description}</wx-p>
        </div>
    )
}

export default AuthorInfo;
