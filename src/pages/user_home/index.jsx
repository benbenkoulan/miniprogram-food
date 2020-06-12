import React, { useCallback, useEffect, useState } from 'react'
import { Row, Col } from 'micro-design'
import './style.css'
import ScrollView from '~/components/scrollView'
import usePagingListApi from '~/hooks/usePagingListApi'
import CookBook from '~/components/cookBook'
import { getImageUrl } from '~/modules/utils/image'
import nullSafeGet from 'lodash/get'
import router from '~/router'
import UserInformation from '~/pages/user_home/components/userInfo'
import useToggle from '~/hooks/useToggle'
import { send } from '~/modules/request/proxy'
import useShareAppMessage from '~/hooks/useShareAppMessage'


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

    const [statisticsInfo, setStatisticsInfo] = useState({})
    const [navActive, setNavActive] = useState('collection')
    const [isAttention, { toggle: toggleIsAttention }] = useToggle(false)

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await send('getOtherUserInfo', { data: { userId } });
            toggleIsAttention(data.isAttention);
            setStatisticsInfo(data)
        };
        fetchData();
    }, []);

    const [{
        data: cookBookCollectionList,
        query: collectionSearchQuery,
        hasMore: collectionHasMore,
        isLoading: collectionIsLoading,
    }, setCollectionSearchQuery] = usePagingListApi('getOtherUserCollection', {
        initialQuery: {
            userId,
            pageNumber: 0,
            pageSize: 6
        },
        convertData: convertUserCollection
    })

    const [{
        data: cookBookProductList,
        query: productSearchQuery,
        hasMore: productHasMore,
        isLoading: productIsLoading,
    }, setProductSearchQuery] = usePagingListApi('getOtherUserProduct', {
        initialQuery: {
            userId,
            pageNumber: 0,
            pageSize: 12
        },
        convertData: convertUserCollection
    })

    const collectionLoadMore = useCallback(() => {
        setCollectionSearchQuery({
            ...collectionSearchQuery,
            pageNumber: collectionSearchQuery.pageNumber + 1
        })
    }, [collectionSearchQuery, setCollectionSearchQuery])

    const productLoadMore = useCallback(() => {
        setProductSearchQuery({
            ...productSearchQuery,
            pageNumber: productSearchQuery.pageNumber + 1
        })
    }, [productSearchQuery, setProductSearchQuery])


    const handleClickCollection = () => {
        if(navActive === 'collection') return;
        setNavActive('collection')
    }

    const handleClickProduct = () => {
        if(navActive === 'product') return;
        setNavActive('product')
    }

    const getCookBookClickHandler = (id) => {
        router.push('cookbook', { id })
    }

    useShareAppMessage({
        title: statisticsInfo.user && statisticsInfo.user.username + '的个人主页' || '个人主页',
        path: `/pages/user_home/index?userId=${userId}`,
    });

    // const renderCollection = useCallback(() =>
    //         (<Fragment>
    //             {cookBookList.map((cookBook) => (
    //                 <CookBook key={cookBook.id} {...cookBook}
    //                           handleClickEvent={() => getCookBookClickHandler(cookBook.id)}/>))}
    //         </Fragment>)
    //     , [hasMore, cookBookList])

    const renderCollection = () =>
        (<div>
            {cookBookCollectionList.map((collection) => (
                <CookBook key={collection.id} {...collection}
                          handleClickEvent={() => getCookBookClickHandler(collection.id)}/>))}
        </div>)


    const renderProduct = () =>
        (<div style={{ marginTop: '10px' }}>
            {cookBookProductList.map(product => (
                <div className="image--wrap" key={product.id} onClick={() => getCookBookClickHandler(product.id)}>
                    <wx-image mode="aspectFill" className="product--image" src={product.imagePath}/>
                </div>
            ))}
        </div>)

    const handleLookUpAttention = (userId) => {
        router.push('my_follow', { userId })
    }

    const handleClickAttention = async () => {
        await send('upsertAttention', { data: { starUserId: statisticsInfo.user.id, isAttention: !isAttention } })
        toggleIsAttention();
    };

    const renderContent = () => (
        <div>
            <UserInformation
                username={statisticsInfo.user && statisticsInfo.user.username}
                createdTime={statisticsInfo.user && statisticsInfo.user.createdTime}
                gender={statisticsInfo.user && statisticsInfo.user.gender}
                country={statisticsInfo.user && statisticsInfo.user.country}
                avatarUrl={statisticsInfo.user && statisticsInfo.user.avatarUrl}
                starCount={statisticsInfo && statisticsInfo.starCount}
                fansCount={statisticsInfo && statisticsInfo.fansCount}
                isAttention={isAttention}
                handleLookUpAttention = {() => handleLookUpAttention(userId)}
                handleClickAttention = {handleClickAttention}/>
            <div>
                <div>
                    <Row className="nav--wrap">
                        <Col className={navActive === 'product' ? 'nav--box active' : 'nav--box'}
                             onClick={handleClickProduct}>菜谱 {statisticsInfo && statisticsInfo.productCount}</Col>
                        <Col className={navActive === 'collection' ? 'nav--box active' : 'nav--box'}
                             onClick={handleClickCollection}>收藏 {statisticsInfo && statisticsInfo.collectionCount}</Col>
                    </Row>
                </div>
                <div>
                    <div className="content--box">
                        {navActive === 'product' ? renderProduct() : renderCollection()}
                    </div>
                </div>
            </div>
        </div>
    )

    return <div className="page">
        <ScrollView
            enableFlex={true}
            hasMore={navActive === 'product' ? productHasMore : collectionHasMore}
            isLoading={navActive === 'product' ? productIsLoading : collectionIsLoading}
            render={renderContent}
            loadMore={navActive === 'product' ? productLoadMore : collectionLoadMore}
        />
    </div>
}

export default UserHome
