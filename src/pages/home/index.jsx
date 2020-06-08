import React, { useCallback, Fragment } from 'react'
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
    const { windowWidth }  = systemInfo;
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
            pageSize: 6
        },
        convertData,
    });

    const memomizedLoadMore = useCallback(() => {
        setSearchQuery({
            ...searchQuery,
            pageNumber: searchQuery.pageNumber + 1
        })
    }, [searchQuery, setSearchQuery]);

    const render = useCallback(() => (
        <Fragment>
            <HomeHeader onClickSearch={() => { router.push('search'); }} />
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
            {
                !hasMore && (
                    <div style={{
                        textAlign: 'center',
                        color: '#999999',
                        fontSize: '12px',
                        marginBottom: '10px'
                    }}>这就是全部啦</div>)
            }
        </Fragment>
    ), [cookBookList, hasMore]);


    return (
        <ScrollView
            render={render}
            hasMore={hasMore}
            isLoading={isLoading}
            loadMore={memomizedLoadMore}
        />
    )
}

export default Index
