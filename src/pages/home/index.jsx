import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { send } from '~/modules/request/proxy'

import { settingSelector } from '../../store/selector'
import router from '../../router'

import './style.css'
import { BASE_REQUEST_URL } from '../../modules/constant/network'

function Index() {
    const scrollViewRef = useRef()

    const settings = useSelector(settingSelector)
    const [searchQuery, setSearchQuery] = useState({
        pageNumber: 0,
        pageSize: 6
    })
    const [cookbookList, setCookBookList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        // console.log('settings: ', settings);
    }, [settings])

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            try {
                const { content = [] } = await send('searchCookbooks', { data: searchQuery })
                const cookbooks = content
                if (searchQuery.pageNumber === 0) {
                    setCookBookList(cookbooks)
                } else {
                    setCookBookList((cookbookList) => ([
                        ...cookbookList,
                        ...cookbooks
                    ]))
                }
                if (cookbooks.length < searchQuery.pageSize) {
                    setHasMore(false)
                }
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [searchQuery])


    const loadMore = () => {
        setSearchQuery({
            ...searchQuery,
            pageNumber: searchQuery.pageNumber + 1
        })
    }

    useEffect(() => {
        const handleScrollToLower = () => {
            if (!isLoading && hasMore) {
                loadMore()
            }
        }
        scrollViewRef.current.addEventListener('scrolltolower', handleScrollToLower)
        return () => {
            scrollViewRef.current.removeEventListener('scrolltolower', handleScrollToLower)
        }
    }, [isLoading, hasMore, loadMore])

    const handleSearchLink = () => {
        console.log(settings)
        router.push('search')
    }

    return (
        <wx-scroll-view ref={scrollViewRef} lower-threshold="100" scroll-y={true} style={{ height:'100%'}}>
            <div className="home--page">
                <div className="logo-box--wrap">
                    <div className="logo--box">
                        <wx-image src="/assets/images/logo_text.jpg" className="logo--text"/>
                        <wx-image src="/assets/images/logo.jpg" className="logo"/>
                    </div>
                </div>
                <div className="search--link" onClick={handleSearchLink}>今天想吃点什么?</div>
                <p className="description">不一样的美食秘籍</p>
            </div>
            <wx-view className='list-masonry'>
                {cookbookList && cookbookList.map(cook => (
                    <wx-view className='item-masonry'>
                        <wx-image src={`${BASE_REQUEST_URL}/services/file/images/${cook.mainImageId}`} mode='widthFix'/>
                        <wx-text>{cook.title}</wx-text>
                    </wx-view>
                ))}
            </wx-view>
        </wx-scroll-view>
    )
}

export default Index
