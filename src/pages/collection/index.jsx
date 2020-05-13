import React, { useState } from 'react';

import CookBookWithDel from './components/cookBook';

function Collection(props) {
    const [shouldShowDelMenu, setShouldShowDelMenu] = useState(false);

    const handleDel = () => {
        setShouldShowDelMenu(true);
    };

    const handleCancel = () => {
        setShouldShowDelMenu(false);
    };

    return (
        <div style={ { margin: '20px' } }>
            这是我的收藏页面
            <CookBookWithDel
                onOperate={handleDel}
                onCancel={handleCancel}
                shouldShowDelMenu={shouldShowDelMenu}
            />
        </div>
    )
}

export default Collection;
