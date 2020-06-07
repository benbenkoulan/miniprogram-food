import React, { useEffect, useCallback, Fragment } from 'react';
import { Layout, Content, Header } from 'micro-design';

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

    const render = useCallback(() => (
        <Fragment>
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
                { hasMore ? '加载中' : '已经到底了' }
            </div>
        </Fragment>
    ), [hasMore, cookBookList]);

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
                    render={render}
                    loadMore={memomizedLoadMore}
                />
            </Content>
        </Layout>
    )
}

export default Search;
