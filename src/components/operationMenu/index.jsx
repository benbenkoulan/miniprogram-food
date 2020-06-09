import React from 'react';

import useToggle from '~/hooks/useToggle';
import Modal from '~/components/modal';

import './style.css';

function OperationMenu(props) {
    const [shouldShowMenu, {
        open: showMenu,
        close: hideMenu,
    }] = useToggle(false);
    const { onMainMenuClick, mainMenuText, render, } = props;

    const handleMainMenuClick = (e) => {
        e.stopPropagation();
        onMainMenuClick();
        hideMenu();
    };

    return (
        <div className="operate-menu--container">
            {
                render && render()
            }
            <button className="operate--btn" onClick={showMenu}>操作</button>
            {
                shouldShowMenu && (
                    <Modal onModalClick={hideMenu}>
                        <div className="menu--box">
                            <button className="menu--bar main-menu--bar" onClick={handleMainMenuClick}>{mainMenuText}</button>
                            <button className="menu--bar">取消</button>
                        </div>
                    </Modal>
                )
            }
        </div>
    )
}

export default OperationMenu;
