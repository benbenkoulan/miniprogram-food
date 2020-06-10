import React from 'react';
import { Layout, Sider, Content } from 'micro-design';

import withUserInfoScope from '~/hoc/withUserInfoScope';

import './style.css';

function Menu(props) {
    console.log('props: ', props);

    return (
        <Layout className="menu--box">
            <Content onClick={props.onClick}>
                {props.text}
            </Content>
            { props.tip ? (<Sider>{ props.tip }</Sider>) : null }
        </Layout>
    )
}

Menu.defaultProps = {
    onClick: () => {},
}

export default withUserInfoScope(Menu, { needCheckLogin: false });
