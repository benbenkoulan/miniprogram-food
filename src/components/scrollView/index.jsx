import React, { useEffect, useRef } from 'react';
import noop from 'lodash/noop';

function ScrollView(props) {
    const scrollViewRef = useRef();
    const {
        renderHeader,
        renderContent,
        renderBottom,
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

    return (
        <wx-scroll-view
            scroll-y={true}
            ref={scrollViewRef}
            style={{ height: '100%' }}>
            {
                renderHeader()
            }
            {
                renderContent()
            }
            {
                renderBottom()
            }
        </wx-scroll-view>
    );
}

ScrollView.defaultProps = {
    renderHeader: noop,
    renderContent: noop,
    renderBottom: noop,
    loadMore: noop,
    isLoading: true,
    hasMore: true,
};

export default ScrollView;
