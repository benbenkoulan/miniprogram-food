import React from 'react';
import nullSafeGet from 'lodash/get';
import memoize from 'lodash/memoize';

import useDataApi from '~/hooks/useDataApi';
import useToggle from '~/hooks/useToggle';
import { getImageUrl } from '~/modules/utils/image';
import { send } from '~/modules/request/proxy';

import CookBookWithDel from './components/cookBook';
import router from '~/router'

const convertCollections = collections => collections.map((collection) => ({
    id: collection.id,
    title: collection.title,
    imagePath: getImageUrl(collection.mainImageId),
    userName: nullSafeGet(collection, 'user.username'),
    avatarUrl: nullSafeGet(collection, 'user.avatarUrl'),
}));

function Collection() {
    const [shouldShowDelMenu, {
        open: showDelMenu,
        close: hideDelMenu,
    }] = useToggle(false);
    const [collections, setCollections] = useDataApi('getMyCollections', {
        initialData: [],
        initialQuery: { pageNumber: 0, pageSize: 50 },
        convertData: convertCollections,
    });

    const getUnCollectHandler = memoize((id) => async() => {
        await send('upsertCollection', { data: { productId: id, isCollection: false } });
        const newCollections = collections.filter(collection => collection.id !== id);
        setCollections(newCollections);
        hideDelMenu();
    });
    
    const handleCookBookClick = (id) => {
        router.push('cookbook', { id })
    };

    return (
        <div className="page">
            {
                collections.map(collection => (<CookBookWithDel
                    key={collection.id}
                    collection={collection}
                    onOperate={showDelMenu}
                    onCancel={hideDelMenu}
                    onDelete={getUnCollectHandler(collection.id)}
                    shouldShowDelMenu={shouldShowDelMenu}
                    handleClickCookBook={() => handleCookBookClick(collection.id)}
                />))
            }
        </div>
    )
}

export default Collection;
