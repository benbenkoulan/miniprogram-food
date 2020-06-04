import { useState, useEffect } from 'react';

import { send } from '~/modules/request/proxy';

function useDataApi(serviceName, {
    initialData = null,
    initialQuery = null,
    convertData = null,
    propertyName = 'content',
}) {
    const [data, setData] = useState(initialData);
    const [query, setQuery] = useState(initialQuery);

    useEffect(() => {
        const fetchData = async () => {
            const res = await send(serviceName, { data: query });
            const data = convertData ? convertData(res[propertyName]) : res[propertyName];
            setData(data);
        };

        fetchData();
    }, [query, propertyName, convertData, serviceName]);

    return [data, setData, setQuery];
}

export default useDataApi;
