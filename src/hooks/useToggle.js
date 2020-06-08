import { useState } from 'react';
import isNil from 'lodash/isNil';

function useToggle(initialStatus = false) {
    const [status, setStatus] = useState(initialStatus);

    const toggle = (forceStatus) => {
        const newStatus = isNil(forceStatus) ? !status : forceStatus;
        setStatus(newStatus);
    };

    const open = () => setStatus(true);

    const close = () => setStatus(false);

    return [status, {
        toggle,
        open,
        close,
    }];
}

export default useToggle;
