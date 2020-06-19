import React, { Fragment, useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { settingSelector } from '~/store/selector';
import { getSetting } from '~/store/action/user';
import { showAuthorizeModal, saveActionAfterAuthorized } from '~/store/action/app';
import useMount from '~/hooks/useMount';

const withUserInfoScope = (WrappedComponent) => (props) => {
    const { onClick, ...passThroughProps } = props;
    const dispatch = useDispatch();
    const setting = useSelector(settingSelector);

    useMount(() => {
        if (!setting.userInfo) {
            dispatch(getSetting());
        }
    });

    const handleClickWithCheckAuthorization = useCallback(() => {
        if (!setting.userInfo) {
            dispatch(saveActionAfterAuthorized({
                method: onClick,
            }));
            dispatch(showAuthorizeModal());
        } else {
            onClick();
        }
    }, [dispatch, setting.userInfo, onClick]);

    return (
        <WrappedComponent onClick={handleClickWithCheckAuthorization} {...passThroughProps} />        
    )
}

export default withUserInfoScope;