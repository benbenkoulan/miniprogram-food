import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'micro-design'
import 'micro-design/dist/es/components/grid/style'

import { settingSelector } from '~/store/selector'
import router from '~/router'
import ScrollView from '~/components/scrollView'
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
        isLoading
    }, setSearchQuery] = usePagingListApi('searchCookbooks', {
        initialQuery: {
            pageNumber: 0,
            pageSize: 10
        }
    })

    const handleSearchLink = () => {
        console.log(settings)
        router.push('search')
    }

    const memomizedLoadMore = useCallback(() => {
        setSearchQuery({
            ...searchQuery,
            pageNumber: searchQuery.pageNumber + 1
        })
    }, [searchQuery, setSearchQuery])

    const renderHeader = () => (<HomeHeader handleSearchLink={handleSearchLink}/>)
    console.log(cookbookList, '----- cookbook')
    const renderDataList = () => (
        <Row gutter={10} className="item-masonry">
            <Col span={12}>
                {
                    cookbookList.map((cookbook, index) => (
                        <React.Fragment key={cookbook.id}>
                            {
                                index % 2 === 0 ? (<div style={{ marginBottom: '10px' }} className="item"
                                                        onClick={() => router.push('cookbook', { id: cookbook.id })}>
                                    <wx-image className="cookbook--image" src={getImageUrl(cookbook.mainImageId)}
                                              mode='widthFix'/>
                                    <wx-text style={{ fontSize: '14px' }}>{cookbook.title}</wx-text>
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
                                index % 2 === 1 ? (<div style={{ marginBottom: '10px' }} className="item"
                                                        onClick={() => router.push('cookbook', { id: cookbook.id })}>
                                    <wx-image className="cookbook--image" src={getImageUrl(cookbook.mainImageId)}
                                              mode='widthFix'/>
                                    <wx-text style={{ fontSize: '14px' }}>{cookbook.title}</wx-text>
                                </div>) : null
                            }
                        </React.Fragment>
                    ))
                }
            </Col>
        </Row>
    )

    const renderBottom = useCallback(() => (!hasMore && (
        <div style={{
            textAlign: 'center',
            color: '#999999',
            fontSize: '12px',
            marginBottom: '10px'
        }}>已经到底了</div>)), [hasMore])

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
