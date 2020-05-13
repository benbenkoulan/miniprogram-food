import React from 'react';

import Modal from '~/components/Modal';
import CookBook from '~/components/CookBook';

import './style.css';

function CookBookWithDel(props) {
    const handleMainMenuClick = (e) => {
        e.stopPropagation();
        props.onDel();
    };

    return (
        <div className="cookbook-del--container">
            <CookBook />
            <button className="cookbook-operate--btn" onClick={props.onOperate}>操作</button>
            {
                props.shouldShowDelMenu && (
                    <Modal onModalClick={props.onCancel}>
                        <div className="menu--box">
                            <button className="menu--bar main-menu--bar" onClick={handleMainMenuClick}>从收藏移除</button>
                            <button className="menu--bar">取消</button>
                        </div>
                    </Modal>
                )
            }
        </div>
    )
}

CookBookWithDel.defaultProps = {
    onClickCookBook: () => {},
    onOperate: () => {},
    onCancel: () => {},
    onDel: () => {},
    shouldShowDelMenu: false,
}

export default CookBookWithDel;
