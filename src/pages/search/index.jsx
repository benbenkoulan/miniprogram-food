import React, { useEffect, useCallback, Fragment } from 'react';
import { Layout, Content, Header } from 'micro-design';

import usePagingListApi from '~/hooks/usePagingListApi';
import ScrollView from '~/components/scrollView';
import { SORT_TYPE } from '~/modules/constant/cookBook';

import { convertCookbooks, renderDataList } from './utils';
import SearchForm from './components/searchForm';
import OrderContainer from './components/orderContainer';

import './style.css';

function Search (props) {
    const { categoryName, categoryId } = props.query || {};

    const [{
        data: cookBookList,
        query: searchQuery,
        hasMore,
        isLoading,
    }, setSearchQuery] = usePagingListApi('searchCookbooks', {
        initialQuery: {
            categoryId,
            keyword: categoryName,
            pageNumber: 0,
            pageSize: 10,
            sortKey: SORT_TYPE.DEFAULT,
        },
        convertData: convertCookbooks,
    });

    useEffect(() => {
        console.log(`搜索${categoryName}`);
        if (categoryName) wx.setNavigationBarTitle({ title: `搜索${categoryName}`, success(res) { console.log('res: ', res); }, fail(err) { console.log(err) } });
    }, [categoryName]);

    const memomizedLoadMore = useCallback(() => {
        setSearchQuery({
            ...searchQuery,
            pageNumber: searchQuery.pageNumber + 1,
        });
    }, [searchQuery, setSearchQuery]);

    const handleChangeSortType = (sortKey) => {
        if (searchQuery.sortKey === sortKey) return;
        setSearchQuery({
            ...searchQuery,
            pageNumber: 0,
            sortKey,
        });
    };

    const render = useCallback(() => (
        <Fragment>
            <OrderContainer onCheck={handleChangeSortType} currentSortKey={searchQuery.sortKey} />
            {
                (cookBookList.length === 0 && !hasMore) ? (<div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    flex: 1,
                }}>
                    <wx-image style={{ width: '160px' }} mode="widthFix" src="/assets/images/search/empty.svg"/>
                    <p className="empty-tip--text">抱歉～当前没有相关菜谱哦</p>
                </div>) : renderDataList(cookBookList)
            }
            <div style={{ textAlign: 'center', fontSize: '12px', color: '#666666' }}>
                { hasMore ? '加载更多中' : '这就是全部啦' }
            </div>
        </Fragment>
    ), [hasMore, cookBookList]);

    const handleSearch = (keyword) => {
        setSearchQuery({
            ...searchQuery,
            pageNumber: 0,
            categoryId: '',
            keyword,
        });
    };

    return (
        <Layout className="search--page">
            <Header>
                <SearchForm
                    keyword={searchQuery.keyword}
                    onSearch={handleSearch}
                />
            </Header>
            <Content className="list--box">
                <ScrollView
                    enableFlex={true}
                    hasMore={hasMore}
                    isLoading={isLoading}
                    render={render}
                    loadMore={memomizedLoadMore}
                />
            </Content>
        </Layout>
    )
}

export default Search;
