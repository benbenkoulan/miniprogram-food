import React, { useState, useEffect } from 'react';

import { send } from '~/modules/request/proxy';
import { getImageUrl } from '~/modules/utils/image';
import useDataApi from '~/hooks/useDataApi';

import CookBook from '../../components/cookBook';

const convertCookBook = (cookBooks) => cookBooks.map(cookBook => ({
    id: cookBook.id,
    title: cookBook.title,
    imagePath: getImageUrl(cookBook.mainImageId),
    count: cookBook.collectionCount,
}));

function MyCookBook() {
    const [cookBooks] = useDataApi('getMyCookbooks', {
        initialQuery: { pageNumber: 0, pageSize: 20, },
        initialData: [],
        convertData: convertCookBook,
    });

    return (
        <div style={ { margin: '20px' } }>
            {cookBooks.map((cookBook) => (<CookBook key={cookBook.id} {...cookBook} />))}
        </div>
    )
}

export default MyCookBook;
