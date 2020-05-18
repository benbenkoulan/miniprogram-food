import React from 'react';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';

function List(props) {
    const {
        dataSource,
        renderItem,
        renderEmpty,
        renderLoading,
        hasMore = true,
    } = props;

    const renderList = () => dataSource.map(data => renderItem(data));

    const renderEnd = () => isEmpty(dataSource) && !hasMore ? (renderEmpty) : renderLoading();

    const handleScroll = (e) => {
        console.log('------');
    };

    return (
        <div style={{ height: '100%', overflow: 'auto' }} onScroll={handleScroll}>
            {
                renderList()
            }
            {
                renderEnd()
            }
        </div>
    );
}

List.defaultProps = {
    renderLoading: noop,
    renderEmpty: noop,
    renderItem: noop,
    dataSource: [],
};

export default List;