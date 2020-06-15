import { useEffect } from 'react';
import { stringifyUrl } from 'query-string';

import scene from '~/modules/constant/scene';

function useShareAppMessage({ title, url, query, imageUrl } = {}) {
    useEffect(() => {
        const path = stringifyUrl({ url, query: {
            ...query,
            scene: scene.SHARE
        } });
        window.onShareAppMessage = () => ({
            title,
            path,
            imageUrl,
        });
    }, [title, url, query, imageUrl]);
}

export default useShareAppMessage;
