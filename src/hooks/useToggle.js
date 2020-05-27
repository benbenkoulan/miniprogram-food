import { useState, useCallback } from 'react';

function useToggle(initialStatus = false) {
    const [status, setStatus] = useState(initialStatus);

    // const toggle = useCallback(() => {
    //     console.log('status: ', status);
    //     setStatus(!status);
    // }, [status]);

    const toggle = () => {
        setStatus(!status);
    };

    return [status, toggle];
}

export default useToggle;
