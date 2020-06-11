import React, { useEffect, useRef } from 'react';
import noop from 'lodash/noop';

import './style.css';
import { throttle } from '~/components/utils'

function ScrollView(props) {
    const scrollViewRef = useRef();
    const {
        loadMore,
        enableFlex = false,
        isLoading = true,
        hasMore = true,
        render,
    } = props;

    useEffect(() => {
        const scrollViewElement = scrollViewRef.current;
        const handleScrollToLower = throttle(() => {
            if (!isLoading && hasMore) {
                loadMore();
            }
        }, 300)

        scrollViewElement.addEventListener('scrolltolower', handleScrollToLower);

        return () => {
            scrollViewElement.removeEventListener('scrolltolower', handleScrollToLower);
        };
    }, [isLoading, hasMore, loadMore]);

    return (
        <wx-scroll-view
            scroll-y={true}
            ref={scrollViewRef}
            enable-flex={enableFlex}
            className="scroll-view--container"
            style={{ height: '100%', ...(enableFlex ? { display: 'flex', flexDirection: 'column' } : {})}}>
            {
                render && render()
            }
        </wx-scroll-view>
    );
}

ScrollView.defaultProps = {
    loadMore: noop,
    render: noop,
    isLoading: true,
    hasMore: true,
    enableFlex: false,
};

export default ScrollView;
