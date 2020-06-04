import React from 'react';
import { Layout, Sider, Content } from 'micro-design';
import 'micro-design/dist/es/components/layout/style';

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

export default Menu;
