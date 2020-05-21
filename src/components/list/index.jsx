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
        hasMore = true,
    } = props;

    useEffect(() => {
        scrollViewRef.current.addEventListener('scrolltolower', () => {
            console.log('----bindscrolltolower--1--', hasMore);
            if (hasMore) {
                loadMore();
            }
        });
    }, [hasMore, loadMore]);

    const renderList = () => dataSource.map(data => renderItem(data));

    const renderBottom = () => isEmpty(dataSource) && !hasMore ? (renderEmpty) : renderLoading();

    return (
        <wx-scroll-view
            scroll-y={true}
            ref={scrollViewRef}
            lower-threshold="100"
            style={{ height: '100%' }}>
            {
                renderList()
            }
            <div className="bottom--box">
                {
                    renderBottom()
                }
            </div>
        </wx-scroll-view>
    );
}

List.defaultProps = {
    renderLoading: noop,
    renderEmpty: noop,
    renderItem: noop,
    loadMore: noop,
    dataSource: [],
};

export default List;