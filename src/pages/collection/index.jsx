import React, { useState, useEffect } from 'react';
import nullSafeGet from 'lodash/get';
import memoize from 'lodash/memoize';

import useDataApi from '~/hooks/useDataApi';
import { getImageUrl } from '~/modules/utils/image';
import { send } from '~/modules/request/proxy';

import CookBookWithDel from './components/cookBook';

const convertCollections = collections => collections.map((collection) => ({
    id: collection.id,
    title: collection.title,
    imagePath: getImageUrl(collection.mainImageId),
    userName: nullSafeGet(collection, 'user.username'),
    avatarUrl: nullSafeGet(collection, 'user.avatarUrl'),
}));

function Collection(props) {
    const [shouldShowDelMenu, setShouldShowDelMenu] = useState(false);
    const [collections, setCollections] = useDataApi('getMyCollections', {
        initialData: [],
        initialQuery: { pageNumber: 0, pageSize: 50 },
        convertData: convertCollections,
    });

    const getUnCollectHandler = memoize((id) => async() => {
        await send('upsertCollection', { data: { productId: id, isCollection: false } });
        const newCollections = collections.filter(collection => collection.id !== id);
        setCollections(newCollections);
        setShouldShowDelMenu(false);
    });

    const handleOperate = () => {
        setShouldShowDelMenu(true);
    };

    const handleCancel = () => {
        setShouldShowDelMenu(false);
    };

    return (
        <div className="page">
            {
                collections.map(collection => (<CookBookWithDel
                    key={collection.id}
                    collection={collection}
                    onOperate={handleOperate}
                    onCancel={handleCancel}
                    onDelete={getUnCollectHandler(collection.id)}
                    shouldShowDelMenu={shouldShowDelMenu}
                />))
            }
        </div>
    )
}

export default Collection;
