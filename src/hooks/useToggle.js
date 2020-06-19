import { useState, useCallback } from 'react';
import isNil from 'lodash/isNil';

function useToggle(initialStatus = false) {
    const [status, setStatus] = useState(initialStatus);

    const toggle = useCallback((forceStatus) => {
        setStatus((preStatus) => {
            if (isNil(forceStatus)) {
                return !preStatus;
            }
            return forceStatus;
        });
    }, [setStatus]);

    const open =  useCallback(() => toggle(true), [toggle]);
    const close =  useCallback(() => toggle(false), [toggle]);

    return [status, {
        toggle,
        open,
        close,
    }];
}

export default useToggle;
