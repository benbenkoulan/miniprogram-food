import React, { useEffect, useRef } from 'react';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';
import { renderDataList } from '../../pages/search/utils'

function List(props) {
    const scrollViewRef = useRef();
    const {
        dataSource,
        renderDataList,
        renderEmpty,
        renderLoading,
        renderHeader,
        loadMore,
        isLoading = true,
        hasMore = true,
    } = props;

    useEffect(() => {
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
        // : dataSource.map(data => renderItem(data));
        : renderDataList(dataSource);

    const renderHeaderModule = () => renderHeader ? renderHeader() : null

    return (
        <wx-scroll-view
            scroll-y={true}
            ref={scrollViewRef}
            style={{ height: '100%' }}>
            {
                renderHeaderModule()
            }
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
