import { useRef, useCallback, useEffect } from 'react';

function useMount(effect) {
    const ref = useRef();
    ref.current = effect;

    const effectFn = useCallback((...args) => ref.current(...args), [ref]);

    useEffect(() => {
        effectFn();
    }, [effectFn]); // eslint-disable
}

export default useMount;
