import { useState, useEffect } from 'react';

import { fetch } from '~/modules/request/proxy';

function usePagingListApi(serviceName, {
    initialData = [],
    initialQuery = {},
    initialIsLoading = true,
    initialIsError = false,
    initialHasMore = true,
    convertData = null,
}) {
    const [data, setData] = useState(initialData);
    const [query, setQuery] = useState(initialQuery);
    const [isLoading, setIsLoading] = useState(initialIsLoading);
    const [isError, setIsError] = useState(initialIsError);
    const [hasMore, setHasMore] = useState(initialHasMore);

    useEffect(() => {
        const doFetch = async () => {
            setIsError(false);
            setHasMore(true);
            setIsLoading(true);
            try {
                const { content = [], pageable, totalPages, } = await fetch(serviceName, { data: query });
                const newData = convertData ? convertData(content) : content;
                if (pageable.pageNumber + 1 >= totalPages) {
                    setHasMore(false);
                }
                if (query.pageNumber === 0) {
                    setData(newData);
                } else {
                    setData(data => ([
                        ...data,
                        ...newData,
                    ]));
                }
            } catch (e) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
        doFetch();
    }, [query, serviceName, convertData]);

    return [{
        data,
        query,
        isLoading,
        isError,
        hasMore,
    }, setQuery];
}

export default usePagingListApi;
