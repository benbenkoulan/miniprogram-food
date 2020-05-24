import React, { useState, useEffect } from 'react';

import { Row, Col } from 'micro-design';
import 'micro-design/dist/es/components/flex/style.css';

import router from '~/router';
import { send } from '~/modules/request/proxy';

import SubCategory from './components/sub-category';

import './style.css';

// import MEISHI_IMG from '~/assets/images/meishi.jpg';

const mockData = [{
    id: 1,
    name: '测试',
    children: [{
        id: 11,
        name: '测试1'
    },{
        id: 12,
        name: '测试1'
    },{
        id: 13,
        name: '测试1'
    },{
        id: 14,
        name: '测试1'
    },{
        id: 15,
        name: '测试1'
    }]
}, {
    id: 2,
    name: '测试2',
    children: [{
        id: 11,
        name: '测试1'
    },{
        id: 12,
        name: '测试1'
    },{
        id: 13,
        name: '测试1'
    },{
        id: 14,
        name: '测试1'
    },{
        id: 15,
        name: '测试1'
    }]
}, {
    id: 3,
    name: '测试3',
    children: [{
        id: 11,
        name: '测试1'
    },{
        id: 12,
        name: '测试1'
    },{
        id: 13,
        name: '测试1'
    },{
        id: 14,
        name: '测试1'
    },{
        id: 15,
        name: '测试1'
    }]
}];

function Category() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data: categories } = await send('getCategories');
            setCategories(categories);
        }
        fetchData();
    }, []);

    const handleClickSubCategory = (categoryId, categoryName) => router.push('search', { categoryId, categoryName });

    const renderSubCategories = (subCategories) => (subCategories.map((subCategory) => (
        <Col key={subCategory.id} span={6}>
            <SubCategory onClickSubCategory={() => handleClickSubCategory(subCategory.id, subCategory.name)} name={subCategory.name} imagePath="/assets/images/meishi.jpg" />
        </Col>
    )));

    const renderCategories = () => categories.map(category => renderCategory(category));

    const renderCategory = (category) => (
        <div key={category.id} className="category--box">
            <h3 className="category--title">{category.name}</h3>
            <Row wrap gutter={[16, 16]}>
                {
                    renderSubCategories(category.children)
                }
            </Row>
        </div>
    );

    return (
        <div>
            {/* <List
                itemCount={categories.length}
                itemSize={index => getItemSize(index)}
            /> */}
            {renderCategories()}
        </div>
    );
}

export default Category;
