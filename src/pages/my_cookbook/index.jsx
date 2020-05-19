import React, { useState, useEffect } from 'react';

import { send } from '~/modules/request/proxy';
import { BASE_REQUEST_URL } from '~/modules/constant/network';

import CookBook from '../../components/cookBook';

function MyCookBook() {
    console.log('-----MyCookBook------');
    const [cookBooks, setCookBooks] = useState([]);

    useEffect(async () => {
        const { content = [] } = await send('getMyCookbooks', { data: { pageNumber: 0, pageSize: 20, } });
        const cookBookList = content.map(cookBook => ({
            title: cookBook.title,
            imagePath: `${BASE_REQUEST_URL}/services/file/images/${cookBook.mainImageId}`,
        }))
        setCookBooks(cookBookList);
    }, []);

    const renderCookBooks = () => cookBooks.map((cookBook) => (<CookBook cookBookInfo={cookBook} />));

    return (
        <div style={ { margin: '20px' } }>
            {renderCookBooks()}
        </div>
    )
}

export default MyCookBook;
