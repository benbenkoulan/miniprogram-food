import React, { useEffect, useCallback } from 'react';
import { Layout, Content, Header } from 'micro-design';
import 'micro-design/dist/es/components/layout/style.css';

import usePagingListApi from '~/hooks/usePagingListApi';
import List from '~/components/list';

import { convertCookbooks, renderLoading, renderEmpty, renderItem, } from './utils';
import SearchForm from './components/searchForm';

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
            keyword: '',
            pageNumber: 0,
            pageSize: 10,
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

    const handleSearch = (keyword) => {
        setSearchQuery({
            ...searchQuery,
            pageNumber: 0,
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
                <List
                    dataSource={cookBookList}
                    hasMore={hasMore}
                    isLoading={isLoading}
                    loadMore={memomizedLoadMore}
                    renderItem={renderItem}
                    renderEmpty={renderEmpty}
                    renderLoading={renderLoading}
                />
            </Content>            
        </Layout>
    )
}

export default Search;
