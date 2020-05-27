import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, } from 'micro-design';
import 'micro-design/dist/es/components/flex/style.css';

import { settingSelector } from '~/store/selector'
import router from '~/router'
import ScrollView from '~/components/scrollView';
import usePagingListApi from '~/hooks/usePagingListApi'

import './style.css'
import { getImageUrl } from '../../modules/utils/image'
import HomeHeader from './components/header'

function Index() {

    const settings = useSelector(settingSelector)

    const [{
        data: cookbookList,
        query: searchQuery,
        hasMore,
        isLoading,
    }, setSearchQuery] = usePagingListApi('searchCookbooks', {
        initialQuery: {
            pageNumber: 0,
            pageSize: 6,
        }
    });

    const handleSearchLink = () => {
        console.log(settings)
        router.push('search')
    }

    const memomizedLoadMore = useCallback(() => {
        setSearchQuery({
            ...searchQuery,
            pageNumber: searchQuery.pageNumber + 1,
        });
    }, [searchQuery, setSearchQuery]);

    const renderHeader = () => (<HomeHeader handleSearchLink={handleSearchLink}/>);

    const renderDataList = () => (
        <Row gutter={10}>
            <Col span={12}>
                {
                    cookbookList.map((cookbook, index) => (
                        <React.Fragment key={cookbook.id}>
                            {
                                index % 2 === 0 ? (<div style={{ marginBottom: '10px' }}>
                                    <wx-image className="cookbook--image" src={getImageUrl(cookbook.mainImageId)} mode='widthFix'/>
                                    <wx-text>{cookbook.title}</wx-text>
                                </div>) : null
                            }
                        </React.Fragment>
                    ))
                }
            </Col>
            <Col span={12}>
                {
                    cookbookList.map((cookbook, index) => (
                        <React.Fragment key={cookbook.id}>
                            {
                                index % 2 === 1 ? (<div style={{ marginBottom: '10px' }}>
                                    <wx-image className="cookbook--image" src={getImageUrl(cookbook.mainImageId)} mode='widthFix'/>
                                    <wx-text>{cookbook.title}</wx-text>
                                </div>) : null
                            }
                        </React.Fragment>
                    ))
                }
            </Col>
        </Row>
    );

    const renderBottom = useCallback(() => (!hasMore && (<div style={{ textAlign: 'center' }}>已经到底了</div>)) , [hasMore]);

    return (
        <ScrollView
            hasMore={hasMore}
            isLoading={isLoading}
            loadMore={memomizedLoadMore}
            renderHeader={renderHeader}
            renderContent={renderDataList}
            renderBottom={renderBottom}
        />
    )
}

export default Index
