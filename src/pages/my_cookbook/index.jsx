import React from 'react';

import router from '~/router';
import { getImageUrl } from '~/modules/utils/image';
import useDataApi from '~/hooks/useDataApi';

import CookBook from '../../components/cookBook';

const convertCookBook = (cookBooks) => cookBooks.map(cookBook => ({
    id: cookBook.id,
    title: cookBook.title,
    imagePath: getImageUrl(cookBook.mainImageId),
    collectionCount: cookBook.collectionCount,
}));

const handleClickCookBook = (id) => router.push('cookbook', { id });

function MyCookBook() {
    const [cookBooks] = useDataApi('getMyCookbooks', {
        initialQuery: { pageNumber: 0, pageSize: 20, },
        initialData: [],
        convertData: convertCookBook,
    });

    return (
        <div className="page">
            {cookBooks.map((cookBook) => (<CookBook onClick={() => handleClickCookBook(cookBook.id)} key={cookBook.id} {...cookBook} />))}
        </div>
    )
}

export default MyCookBook;
