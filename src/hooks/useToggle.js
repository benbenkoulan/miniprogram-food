import { useState } from 'react';

function useToggle(initialStatus = false) {
    const [status, setStatus] = useState(initialStatus);

    const toggle = () => {
        setStatus(!status);
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
