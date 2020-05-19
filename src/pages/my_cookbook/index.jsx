import React from 'react';

import CookBook from '../../components/cookBook';

function MyCookBook(props) {
    console.log('-----MyCookBook------');

    return (
        <div style={ { margin: '20px' } }>
            <CookBook />
        </div>
    )
}

export default MyCookBook;
