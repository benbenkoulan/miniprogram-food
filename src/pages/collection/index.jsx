import React from 'react';
import nullSafeGet from 'lodash/get';
import memoize from 'lodash/memoize';

import useDataApi from '~/hooks/useDataApi';
import { getImageUrl } from '~/modules/utils/image';
import { send } from '~/modules/request/proxy';

import OperationMenu from '~/components/operationMenu';
import CookBook from '~/components/cookBook';

import router from '~/router'

const convertCollections = collections => collections.map((collection) => ({
    id: collection.id,
    title: collection.title,
    imagePath: getImageUrl(collection.mainImageId),
    userName: nullSafeGet(collection, 'user.username'),
    avatarUrl: nullSafeGet(collection, 'user.avatarUrl'),
}));

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

    const getCookBookClickHandler = memoize((id) => () => {
        router.push('cookbook', { id });
    });

    return (
        <div className="page">
            {
                collections.map(collection => (
                    <OperationMenu
                        key={collection.id}
                        onMainMenuClick={getUnCollectHandler(collection.id)}
                        mainMenuText="从收藏中删除"
                        render={() => (
                            <CookBook handleClickEvent={getCookBookClickHandler(collection.id)}
                                {...collection}
                            />)}
                    />
                ))
            }
        </div>
    )
}

export default Collection;
