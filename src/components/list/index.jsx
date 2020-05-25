import React, { useEffect, useRef } from 'react';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';

function List(props) {
    const scrollViewRef = useRef();
    const {
        dataSource,
        renderItem,
        renderEmpty,
        renderLoading,
        loadMore,
        isLoading = true,
        hasMore = true,
    } = props;

    useEffect(() => {
        console.log('----useEffect----');
        const scrollViewElement = scrollViewRef.current;
        const handleScrollToLower = () => {
            if (!isLoading && hasMore) {
                loadMore();
            }
        };

        scrollViewElement.addEventListener('scrolltolower', handleScrollToLower);

        return () => {
            scrollViewElement.removeEventListener('scrolltolower', handleScrollToLower);
        };
    }, [isLoading, hasMore, loadMore]);

    const renderList = () => (isEmpty(dataSource) && !hasMore)
        ? renderEmpty()
        : dataSource.map(data => renderItem(data));

    return (
        <wx-scroll-view
            scroll-y={true}
            ref={scrollViewRef}
            style={{ height: '100%' }}>
            {
                renderList()
            }
            {
                hasMore && renderLoading()
            }
        </wx-scroll-view>
    );
}

List.defaultProps = {
    renderLoading: noop,
    renderEmpty: noop,
    renderItem: noop,
    loadMore: noop,
    dataSource: [],
    isLoading: true,
    hasMore: true,
};

export default List;
