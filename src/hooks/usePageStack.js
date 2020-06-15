import { useState, useEffect } from 'react';

import { getPageCount } from '~/router';

function usePageStack() {
    const [pageCount, setPageCount] = useState(() => getPageCount());

    useEffect(() => {
        setPageCount(getPageCount());
    }, []);

    return pageCount;
}

export default usePageStack;
