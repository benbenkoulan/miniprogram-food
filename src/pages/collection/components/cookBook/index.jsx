import React from 'react';

import Modal from '~/components/modal';
import CookBook from '~/components/cookBook';

import './style.css';

function CookBookWithDel(props) {
    const { collection, onOperate, onDelete, onCancel } = props;

    const handleMainMenuClick = (e) => {
        e.stopPropagation();
        onDelete();
    };

    return (
        <div className="cookbook-del--container">
            <CookBook {...collection} />
            <button className="cookbook-operate--btn" onClick={onOperate}>操作</button>
            {
                props.shouldShowDelMenu && (
                    <Modal onModalClick={onCancel}>
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
