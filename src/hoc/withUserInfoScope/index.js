import React, { Fragment, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { settingSelector } from '~/store/selector';
import { authorize, getSetting } from '~/store/action/user';
import { upsertUserInfo } from '~/api';
import { wxLogin } from '~/modules/login';
import withLoading from '~/modules/hof/withLoading';

const withUserInfoScope = (WrappedComponent, { needCheckLogin = true } = {}) => (props) => {
    const { onClick, ...passThroughProps } = props;
    const dispatch = useDispatch();
    const setting = useSelector(settingSelector);
    const wxButtonRef = useRef();

    useEffect(() => {
        const initSetting = () => {
            dispatch(getSetting());
        };
        if (!setting.userInfo) initSetting();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {
        const wxButtonElement = wxButtonRef && wxButtonRef.current;
        const handleGetUserInfo = withLoading(async (e) => {
            const { encryptedData, iv } = e.detail || {};
            if (!encryptedData || !iv) {
                return;
            }
            try {
                if (needCheckLogin) await wxLogin();
                dispatch(authorize());
                await upsertUserInfo(encryptedData, iv);
                onClick();
            } catch (err) {
                console.log(err);
            }
        }, { titile: '授权中' });
        if (wxButtonElement) {
            wxButtonElement.addEventListener('getuserinfo', handleGetUserInfo);
        }
        return () => {
            if (wxButtonElement) {
                wxButtonElement.removeEventListener('getuserinfo', handleGetUserInfo);
            }
        }
    }, [wxButtonRef, setting.userInfo, onClick, dispatch]);

    return (
        <Fragment>
            {
                setting.userInfo ? (
                    <WrappedComponent onClick={onClick} {...passThroughProps} />
                ) : (
                    <wx-button open-type="getUserInfo" ref={wxButtonRef} >
                        <WrappedComponent {...passThroughProps} />
                    </wx-button>
                )
            }
        </Fragment>
        
    )
}

export default withUserInfoScope;