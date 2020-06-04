import React, { useState } from 'react';
import { Flex, Layout, Sider, Content } from 'micro-design';

import './style.css';

function ListForm(props) {
    const { itemList, title, renderItem, onAdd, onDel } = props;
    const [isEditMode, setIsEditMode] = useState(false);

    const handleEdit = () => {
        setIsEditMode(!isEditMode);
    };

    const renderRow = (item, index) => (
        <Layout hasSider className="row--box" key={item}>
            {
                isEditMode && (<Sider style={{ fontSize: 0 }}>
                    <button className="delete-item--btn" onClick={() => onDel(index)}/>
                </Sider>)
            }
            <Content>{renderItem(item, index)}</Content>
        </Layout>
    );

    return (
        <div style={{ margin: '20px' }}>
            <header className="list-header--text">{title}</header>
            {
                itemList.map(renderRow)
            }
            <Flex justifyContent="space-between" style={{ margin: '10px 0', color: '#1296db' }}>
                <div onClick={onAdd}>再增加一行</div>
                <div onClick={handleEdit}>{ isEditMode ? '调整完成' : `调整${title}` }</div>
            </Flex>
        </div>
    )
}

export default ListForm;
