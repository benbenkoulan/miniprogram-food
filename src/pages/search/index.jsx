import React, { useState, useEffect } from 'react';
import { Layout, Content, Header } from 'micro-design';
import 'micro-design/dist/es/components/layout/style.css';

import List from '../../components/list';

import CookBook from './components/cookBook';
import SearchForm from './components/searchForm';

import './style.css';


function Search (props) {
    const { categoryId, categoryName } = props;
    const [searchKey, setSearchKey] = useState('');
    const [cookbookList, setCookBookList] = useState(Array(10).fill(''));

    console.log(categoryId, categoryName);

    useEffect(() => {
        setSearchKey('test');
    }, []);

    return (
        <Layout className="search--page">
            <Header>
                <SearchForm
                    searchKey={searchKey}
                />
            </Header>
            <Content className="list--box">
                <List
                    dataSource={cookbookList}
                    renderItem={(item) => (<CookBook />)}
                    renderLoading={() => (<div>loading</div>)}
                />
            </Content>            
        </Layout>
    )
}

export default Search;
