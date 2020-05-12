import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'micro-design';
import 'micro-design/dist/es/components/flex/style.css';

import Modal from '../modal';
import { authorize } from '../../store/action/user';
import { hideAuthorizeModal } from '../../store/action/app';
import { shouldShowAuthorizeModalSelector } from '../../store/selector';

import './style.css';

function AuthorizeModal(props) {
    const shouldShowAuthorizeModal = useSelector(shouldShowAuthorizeModalSelector);
    const dispatch = useDispatch();

    const getUserInfoButton = useRef();

    const handleGetUserInfo = () => {
        dispatch(authorize());
        dispatch(hideAuthorizeModal());
    };

    useEffect(() => {
        console.log('---shouldShowAuthorizeModal-----')
        if (shouldShowAuthorizeModal) {
            getUserInfoButton.current.addEventListener('getuserinfo', handleGetUserInfo);
        }
    }, [shouldShowAuthorizeModal]);

    return (
        shouldShowAuthorizeModal ? (
            <Modal>
                <div class="authorize--box">
                    <p className="authorize-tip--text">本应用申请获取以下权限:</p>
                    <p className="authorize-tip--text">获取你的公开信息（昵称、头像等）</p>
                    <Row gutter={10}>
                        <Col span={12}>
                            <wx-button className="authorize-cancel--btn authorize--btn">取消</wx-button>
                        </Col>
                        <Col span={12}>
                            <wx-button className="authorize--btn" open-type="getUserInfo" ref={getUserInfoButton}>授权</wx-button>
                        </Col>
                    </Row>
                </div>
            </Modal>
        ) : null
    );
}

export default AuthorizeModal;
