import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Content, Header } from 'micro-design';
import 'micro-design/dist/es/components/layout/style.css';
import nullSafeGet from 'lodash/get';

import { send } from '~/modules/request/proxy';
import { getImageUrl } from '~/modules/utils/image';
import router from '~/router';

import List from '../../components/list';

import CookBook from './components/cookBook';
import SearchForm from './components/searchForm';

import './style.css';

const convertCookbooks = (cookbooks = []) => cookbooks.map(cookbook => ({
    id: cookbook.id,
    title: cookbook.title,
    username: nullSafeGet(cookbook, 'user.username', ''),
    ingredients: cookbook.ingredients.map(ingredient => ingredient.name).join(),
    imagePath: getImageUrl(cookbook.mainImageId),
}));

const renderEmpty = () => (<div>
    <wx-image src="/assets/images/search/empty.svg"></wx-image>
    <p className="empty-tip--text">抱歉～当前没有相关菜谱哦</p>
</div>);

const renderLoading = () => (<div style={{ textAlign: 'center' }}>loading...</div>);

const renderItem = (item) => (<CookBook
    key={item.id}
    {...item}
    onClickCookBook={() => router.push('cookbook', { id: item.id })}
/>);

function Search (props) {
    const { categoryName, categoryId } = props.query || {};
    const [searchQuery, setSearchQuery] = useState({
        categoryId,
        keyword: categoryName,
        pageNumber: 0,
        pageSize: 10
    });
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [cookbookList, setCookBookList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const { content = [] } = await send('searchCookbooks', { data: searchQuery });
                const cookbooks = convertCookbooks(content);
                if (searchQuery.pageNumber === 0) {
                    setCookBookList(cookbooks);
                } else {
                    setCookBookList((cookbookList) => ([
                        ...cookbookList,
                        ...cookbooks,
                    ]));
                }
                if (content.length < searchQuery.pageSize) {
                    setHasMore(false);
                }
            } finally {
                setIsLoading(false);
            }            
        };
        fetchData();
    }, [searchQuery]);

    const memomizedLoadMore = useCallback(() => {
        setSearchQuery({
            ...searchQuery,
            pageNumber: searchQuery.pageNumber + 1,
        });
    }, [searchQuery]);

    const handleSearch = (keyword) => {
        setHasMore(true);
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
                    dataSource={cookbookList}
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
