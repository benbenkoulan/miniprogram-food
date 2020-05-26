import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { settingSelector } from '../../store/selector'
import router from '../../router'

import './style.css'
import { getImageUrl } from '../../modules/utils/image'
import HomeHeader from './components/header'
import List from '../../components/list'
import usePagingListApi from '../../hooks/usePagingListApi'

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

    useEffect(() => {
        // console.log('settings: ', settings);
    }, [settings])

    const loadMore = () => {
        setSearchQuery({
            ...searchQuery,
            pageNumber: searchQuery.pageNumber + 1
        })
    }

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

    const renderHeader = () => <HomeHeader handleSearchLink={handleSearchLink}/>

    const renderDataList = (cookbookList) => (
        <wx-view className='list-masonry'>
            {cookbookList && cookbookList.map(cook => (
                <wx-view className='item-masonry'>
                    <wx-image src={getImageUrl(cook.mainImageId)} mode='widthFix'/>
                    <wx-text>{cook.title}</wx-text>
                </wx-view>
            ))}
        </wx-view>
    )

    return (
        <List
            dataSource={cookbookList}
            hasMore={hasMore}
            isLoading={isLoading}
            loadMore={memomizedLoadMore}
            renderHeader={renderHeader}
            renderDataList={renderDataList}
        />
    )
}

export default Index
