import React, { useState, useEffect } from 'react';

import { send } from '~/modules/request/proxy';
import { getImageUrl } from '~/modules/utils/image';

import CookBook from '../../components/cookBook';

function MyCookBook() {
    const [cookBooks, setCookBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { content = [] } = await send('getMyCookbooks', { data: { pageNumber: 0, pageSize: 20, } });
            const cookBookList = content.map(cookBook => ({
                title: cookBook.title,
                imagePath: getImageUrl(cookBook.mainImageId),
            }))
            setCookBooks(cookBookList);
        }
        fetchData();
    }, []);

    const renderCookBooks = () => cookBooks.map((cookBook) => (<CookBook cookBookInfo={cookBook} />));

    return (
        <div style={ { margin: '20px' } }>
            {renderCookBooks()}
        </div>
    )
}

export default MyCookBook;
