import React, { Fragment, useCallback, useState } from 'react'
import UserInfo from '~/components/userInfo'
import useDataApi from '~/hooks/useDataApi'
import { Row, Col } from 'micro-design'
import './style.css'
import ScrollView from '~/components/scrollView'
import usePagingListApi from '~/hooks/usePagingListApi'
import CookBook from '~/components/cookBook'
import { getImageUrl } from '~/modules/utils/image'
import nullSafeGet from 'lodash/get'
import router from '~/router'


const convertUserCollection = (collections = []) => collections.map(collection => ({
    id: collection.id,
    title: collection.title,
    collectionCount: collection.collectionCount,
    userName: nullSafeGet(collection, 'userDto.username', ''),
    avatarUrl: nullSafeGet(collection, 'userDto.avatarUrl', ''),
    imagePath: getImageUrl(collection.mainImageId)
}))

function UserHome(props) {

    const { userId } = props.query || {}

    const [statisticsInfo] = useDataApi('getOtherUserInfo', {
        initialData: {},
        initialQuery: { userId },
        propertyName: 'data'
    })

    const [navActive, setNavActive] = useState('collection')
    const [serviceName, setServiceName] = useState('getOtherUserCollection')
    const [isNeedLoad, setIsNeedLoad] = useState(true)

    const [{
        data: cookBookList,
        query: searchQuery,
        hasMore,
        isLoading
    }, setSearchQuery] = usePagingListApi(serviceName, {
        initialQuery: {
            userId,
            pageNumber: 0,
            pageSize: 9
        },
        convertData: convertUserCollection,
        isNeedLoad
    })

    const memomizedLoadMore = useCallback(() => {
        setIsNeedLoad(true)
        setSearchQuery({
                ...searchQuery,
                pageNumber: searchQuery.pageNumber + 1
            })
    }, [searchQuery, setSearchQuery])


    const handleClickCollection = () => {
        setNavActive('collection')
        setServiceName('getOtherUserCollection')
        setIsNeedLoad(false)
    }

    const handleClickProduct = () => {
        setNavActive('product')
        setServiceName('getOtherUserProduct')
        setIsNeedLoad(false)
    }

    const getCookBookClickHandler = (id) => {
        router.push('cookbook', { id })
    }

    // const renderCollection = useCallback(() =>
    //         (<Fragment>
    //             {cookBookList.map((cookBook) => (
    //                 <CookBook key={cookBook.id} {...cookBook}
    //                           handleClickEvent={() => getCookBookClickHandler(cookBook.id)}/>))}
    //         </Fragment>)
    //     , [hasMore, cookBookList])

    const renderCollection = () =>
            (<Fragment>
                {cookBookList.map((cookBook) => (
                    <CookBook key={cookBook.id} {...cookBook}
                              handleClickEvent={() => getCookBookClickHandler(cookBook.id)}/>))}
            </Fragment>)


    const renderProduct = () => {
        return (
            <div style={{marginTop:"10px"}}>
                {cookBookList.map(product => (
                    <div className="image--wrap" onClick={() => getCookBookClickHandler(product.id)}>
                        <wx-image mode="aspectFill" className="product--image" src={product.imagePath}/>
                    </div>
                ))}
            </div>
        )
    }

    const renderContent = () => (
        <div>
            <UserInfo {...statisticsInfo} isUserInfoDisplay/>
            <div>
                <Row className="nav--wrap">
                    <Col className={navActive === 'product' ? 'nav--box active' : 'nav--box'}
                         onClick={handleClickProduct}>菜谱 {statisticsInfo && statisticsInfo.productCount}</Col>
                    <Col className={navActive === 'collection' ? 'nav--box active' : 'nav--box'}
                         onClick={handleClickCollection}>收藏 {statisticsInfo && statisticsInfo.collectionCount}</Col>
                </Row>
                <div>
                    <div className="content--box" style={{ display: navActive === 'product' ? 'block' : 'none' }}>
                        {renderProduct()}
                    </div>
                    <div className="content--box" style={{ display: navActive === 'collection' ? 'block' : 'none' }}>
                        {renderCollection()}
                    </div>
                </div>
            </div>
        </div>
    )

    return <div className="page">
        <ScrollView
            enableFlex={true}
            hasMore={hasMore}
            isLoading={isLoading}
            render={renderContent}
            loadMore={memomizedLoadMore}
        />
    </div>
}

export default UserHome
