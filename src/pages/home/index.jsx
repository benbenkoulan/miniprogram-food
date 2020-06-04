import React, { useCallback, useMemo } from 'react'
import { Row, Col } from 'micro-design'

import router from '~/router'
import ScrollView from '~/components/scrollView'
import usePagingListApi from '~/hooks/usePagingListApi'
import systemInfo from '~/modules/miniprogram/system';
import { getImageUrl } from '~/modules/utils/image'

import './style.css'
import HomeHeader from './components/header';

const convertData = (dataList) => dataList.map(data => {
    const extInfo = JSON.parse(data.extInfo || '{}');
    const ratio = extInfo.width / extInfo.height;
    return {
        ...data,
        ratio,
    };
});

const renderCookBook = (cookBook) => {
    console.log('start: ', Date.now());
    const { windowWidth }  = systemInfo;
    console.log('end: ', Date.now());
    const imageWidth = (windowWidth - 30) / 2;
    const imageHeight = imageWidth / cookBook.ratio;

    return (
        <div key={cookBook.id}
            className="item"
            onClick={() => router.push('cookbook', { id: cookBook.id })}>
            <wx-image style={{ height: `${imageHeight}px` }}
                className="cookbook--image"
                src={getImageUrl(cookBook.mainImageId)}
                mode='widthFix'/>
            <wx-text style={{ fontSize: '14px' }}>{cookBook.title}</wx-text>
        </div>
    )
};

function Index() {
    const [{
        data: cookBookList,
        query: searchQuery,
        hasMore,
        isLoading
    }, setSearchQuery] = usePagingListApi('searchCookbooks', {
        initialQuery: {
            pageNumber: 0,
            pageSize: 10
        },
        convertData,
    });

    const memomizedLoadMore = useCallback(() => {
        setSearchQuery({
            ...searchQuery,
            pageNumber: searchQuery.pageNumber + 1
        })
    }, [searchQuery, setSearchQuery]);

    const content = useMemo(() => (
        <Row gutter={10} className="item-masonry">
            <Col span={12}>
                {
                    cookBookList.map((cookBook, index) => index % 2 === 0 ? renderCookBook(cookBook) : null)
                }
            </Col>
            <Col span={12}>
                {
                    cookBookList.map((cookBook, index) => index % 2 === 1 ? renderCookBook(cookBook) : null)
                }
            </Col>
        </Row>
    ), [cookBookList]);

    const bottom = useMemo(() => (!hasMore && (
        <div style={{
            textAlign: 'center',
            color: '#999999',
            fontSize: '12px',
            marginBottom: '10px'
        }}>已经到底了</div>)), [hasMore]);


    return (
        <ScrollView
            hasMore={hasMore}
            isLoading={isLoading}
            loadMore={memomizedLoadMore}
        >
            <HomeHeader handleSearchLink={() => router.push('search')}/>
            {
                content
            }
            {
                bottom
            }
        </ScrollView>
    )
}

export default Index
