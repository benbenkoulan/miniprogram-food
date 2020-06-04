import React, { useEffect, useCallback, useMemo } from 'react';
import { Layout, Content, Header } from 'micro-design';
import 'micro-design/dist/es/components/layout/style';

import usePagingListApi from '~/hooks/usePagingListApi';
import ScrollView from '~/components/scrollView';

import { convertCookbooks, renderLoading, renderEmpty, renderDataList } from './utils';
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

    const content = useMemo(() => (cookBookList.length === 0 && !hasMore)
    ? renderEmpty()
    : renderDataList(cookBookList), [hasMore, cookBookList]);

    const bottom = useMemo(() => hasMore
        ? renderLoading()
        : (<div style={{ textAlign: 'center', fontSize: '12px', color: '#666666' }}>已经到底了</div>),
    [hasMore]);

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
                <ScrollView
                    enableFlex={true}
                    hasMore={hasMore}
                    isLoading={isLoading}
                    loadMore={memomizedLoadMore}
                >
                    {
                        content
                    }
                    {
                        bottom
                    }
                </ScrollView>
            </Content>
        </Layout>
    )
}

export default Search;
