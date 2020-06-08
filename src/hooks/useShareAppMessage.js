import { useEffect } from 'react';

function useShareAppMessage({ title, path, imageUrl } = {}) {
    useEffect(() => {
        window.onShareAppMessage = () => ({ title, path, imageUrl });
    }, [title, path, imageUrl]);
}

export default useShareAppMessage;
