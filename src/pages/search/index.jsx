import React, { useState, useEffect } from 'react';
import { Layout, Content, Header } from 'micro-design';
import 'micro-design/dist/es/components/layout/style.css';

import { send } from '~/modules/request/proxy';

import List from '../../components/list';

import CookBook from './components/cookBook';
import SearchForm from './components/searchForm';

import './style.css';


function Search (props) {
    const { query = {} } = props;
    const { categoryName, categoryId } = query;
    const [searchQuery, setSearchQuery] = useState({
        categoryId,
        keyword: categoryName,
        pageNumber: 1,
        pageSize: 10
    });
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [cookbookList, setCookBookList] = useState(Array(10).fill(''));

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const { content = [] } = await send('searchCookbooks', { data: searchQuery });
            } finally {
                setIsLoading(false);
            }            
            // setCookBookList(content);
        }
        fetchData();
    }, [searchQuery]);

    const loadMore = () => {
        console.log('-------loadMore------')
        setSearchQuery({
            ...searchQuery,
            pageNumber: searchQuery.pageNumber + 1,
        });
    };

    const handleSearch = (keyword) => {
        setSearchQuery({
            ...searchQuery,
            pageNumber: 1,
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
                    hasMore={!isLoading && hasMore}
                    loadMore={loadMore}
                    renderItem={(item) => (<CookBook key={item} />)}
                    renderLoading={() => (<div>loading</div>)}
                />
            </Content>            
        </Layout>
    )
}

export default Search;
