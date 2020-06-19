import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'micro-design';

import Modal from '../modal';
import { authorize } from '~/store/action/user';
import { hideAuthorizeModal, clearActionAfterAuthorized } from '~/store/action/app';
import { shouldShowAuthorizeModalSelector, actionAfterAuthorizedSelector } from '~/store/selector';
import { upsertUserInfo } from '~/api';
import router from '~/router';

import './style.css';

function AuthorizeModal() {
    const shouldShowAuthorizeModal = useSelector(shouldShowAuthorizeModalSelector);
    const actionAfterAuthorized = useSelector(actionAfterAuthorizedSelector);
    const dispatch = useDispatch();

    const getUserInfoButton = useRef();

    const handleAuthorizeCanceling = () => {
        dispatch(hideAuthorizeModal());
    };

    useEffect(() => {
        const addEvent = () => {
            getUserInfoButton.current.addEventListener('getuserinfo', async (res) => {
                const { encryptedData, iv } = res.detail || {};
                dispatch(authorize());
                await upsertUserInfo(encryptedData, iv);
                console.log('actionAfterAuthorized: ', actionAfterAuthorized);
                if (actionAfterAuthorized
                    && actionAfterAuthorized.method
                    && typeof actionAfterAuthorized.method === 'function') {
                    actionAfterAuthorized.method();
                    dispatch(clearActionAfterAuthorized());
                }
                dispatch(hideAuthorizeModal());
            });
        }
        if (shouldShowAuthorizeModal) {
            addEvent();
        }
    }, [dispatch, shouldShowAuthorizeModal, actionAfterAuthorized]);

    return (
        shouldShowAuthorizeModal ? (
            <Modal>
                <div class="authorize--box">
                    <div className="authorize-title--text">为了给你提供如下服务:</div>
                    <Row wrap gutter={[10, 10]}>
                        <Col className="func--text" span={12}>1.更全面展示您的菜谱</Col>
                        <Col className="func--text" span={12}>2.个性化为您推荐菜谱</Col>
                        <Col className="func--text" span={12}>3.方便分享您的菜谱</Col>
                        <Col className="func--text" span={12}>4.方便他人了解您</Col>
                    </Row>
                    <div className="authorize-tip--text">本应用申请获取您的公开信息（昵称、头像等）</div>
                    <Row gutter={10}>
                        <Col span={12}>
                            <wx-button className="authorize-cancel--btn authorize--btn" onClick={handleAuthorizeCanceling}>取消</wx-button>
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
