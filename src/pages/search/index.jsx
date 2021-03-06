import React, { useEffect, useCallback, Fragment } from 'react';
import { Layout, Content, Header } from 'micro-design';

import usePagingListApi from '~/hooks/usePagingListApi';
import ScrollView from '~/components/scrollView';
import Empty from '~/components/empty'
import { SORT_TYPE } from '~/modules/constant/cookBook';


import { convertCookbooks, renderDataList } from './utils';
import SearchForm from './components/searchForm';
import SortContainer from './components/sortContainer';

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

    const handleChangeSortType = useCallback((sortKey) => {
        if (searchQuery.sortKey === sortKey) return;
        setSearchQuery({
            ...searchQuery,
            pageNumber: 0,
            sortKey,
        });
    }, [searchQuery, setSearchQuery]);

    const renderSort = useCallback(() => (<SortContainer onCheck={handleChangeSortType} currentSortKey={searchQuery.sortKey} />), [handleChangeSortType, searchQuery]);

    const render = useCallback(() => (
        <Fragment>
            {
                renderSort()
            }
            {
                (cookBookList.length === 0 && !hasMore) ? <Empty/> : renderDataList(cookBookList)
            }
            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: '#666666' }}>
                { hasMore ? '加载中' : '这就是全部啦' }
            </div>
        </Fragment>
    ), [hasMore, cookBookList, renderSort]);

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
