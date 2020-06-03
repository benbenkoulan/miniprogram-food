import React from 'react';
import {Layout, Content} from 'micro-design'
import './style.css'

function Footer(props) {
    return (
        <Layout hasSider className="cookbook-follow--text">
            <Content>
                {props.browseCount ? props.browseCount : 0}浏览 {props.collection}收藏 菜谱创建于{props.createdTime}
            </Content>
        </Layout>
    )
}

export default Footer;
