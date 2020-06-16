import React, { useState, useEffect } from 'react';

import { Row, Col } from 'micro-design';

import router from '~/router';
import { send } from '~/modules/request/proxy';
import { getImageUrl } from '~/modules/utils/image'

import SubCategory from './components/sub-category';

import './style.css';

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
        <Col key={subCategory.id} span={4}>
            <SubCategory onClickSubCategory={() => handleClickSubCategory(subCategory.id, subCategory.name)} name={subCategory.name} imagePath={getImageUrl(subCategory.imageId)} />
        </Col>
    )));

    const renderCategories = () => categories.map(category => renderCategory(category));

    const renderCategory = (category) => (
        <div key={category.id} className="category--box">
            <h4 className="category--title">{category.name}</h4>
            <Row wrap gutter={[16, 16]}>
                {
                    renderSubCategories(category.children)
                }
            </Row>
        </div>
    );

    return (
        <div className="page">
            {renderCategories()}
        </div>
    );
}

export default Category;
