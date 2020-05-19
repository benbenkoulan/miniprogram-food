import React from 'react';
import {Layout, Content} from 'micro-design'
import './style.css'

function Footer(props) {
    return (
        <Layout hasSider className="cookbook-follow--text">
            <Content>
                {props.pageView}浏览 {props.collection}收藏 菜谱创建于{props.createdDate}
            </Content>
        </Layout>
    )
}

export default Footer;
