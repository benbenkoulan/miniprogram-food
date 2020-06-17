import React from 'react';
import nullSafeGet from 'lodash/get';
import memoize from 'lodash/memoize';

import useDataApi from '~/hooks/useDataApi';
import { getImageUrl } from '~/modules/utils/image';
import { send } from '~/modules/request/proxy';

import OperationMenu from '~/components/operationMenu';
import CookBook from '~/components/cookBook';
import Empty from '~/components/empty'

import router from '~/router'

const convertCollections = collections => collections.map((collection) => ({
    id: collection.id,
    title: collection.title,
    imagePath: getImageUrl(collection.mainImageId),
    userName: nullSafeGet(collection, 'userDto.username'),
    avatarUrl: nullSafeGet(collection, 'userDto.avatarUrl'),
}));

const handleClickCookBook = (id) => router.push('cookbook', { id });

function Collection() {
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

    return (
        <div className="page">
            {
                collections.length ? collections.map(collection => (
                    <OperationMenu
                        key={collection.id}
                        onMainMenuClick={getUnCollectHandler(collection.id)}
                        mainMenuText="从收藏中删除"
                        render={() => (
                            <CookBook onClick={() => handleClickCookBook(collection.id)}
                                {...collection}
                            />)}
                    />
                )) : <Empty/>
            }
        </div>
    )
}

export default Collection;
