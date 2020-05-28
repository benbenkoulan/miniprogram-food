import React, { useState, useMemo } from 'react';
import { Layout, Content, Footer } from 'micro-design';
import flatMap from 'lodash/flatMap'

import Modal from '~/components/modal';

import CategoryOption from './components/categoryOption';
import SelectedCategoriesInput from './components/selectedCategoriesInput';
import './style.css';

function CategoriesSelect(props) {
    const {
        allCategories: initialAllCategories = [],
        selectedCategories: initialSelectedCategories = [],
        onConfirm
    } = props;
    const [categories, setCategories] = useState(
        () => flatMap(initialAllCategories, (category) => {
            const childCategories = category.children.map(childCategory => ({
                ...childCategory,
                isSelected: !!initialSelectedCategories.find(initialSelectedCategory => initialSelectedCategory.id === childCategory.id),
            }));
            return [
                category,
                ...childCategories,
            ];
        })
    );

    console.log(initialAllCategories, initialSelectedCategories, categories);

    const selectedCategories = useMemo(() => categories.filter(category => category.isSelected), [categories]);

    const toggleCategory = (categoryId) => {
        if (selectedCategories.length >= 5) return;
        setCategories(categories.map(category => category.id === categoryId ? ({ ...category, isSelected: !category.isSelected, }) : category));
    };

    const handleUncheck = (categoryId) => {
        setCategories(categories.map(category => category.id === categoryId ? ({ ...category, isSelected: false, }) : category));
    };

    return (
        <Modal>
            <Layout className="categories-select--container">
                <Content>
                    <SelectedCategoriesInput
                        categories={selectedCategories}
                        onUncheck={handleUncheck}
                    />
                    {
                        categories.map(category => (
                            <CategoryOption
                                name={category.name}
                                isChecked={!!category.isSelected}
                                isDisabled={!category.parentId}
                                onCheck={() => toggleCategory(category.id)}
                            />
                        ))
                    }
                </Content>
                <Footer>
                    <div className="confirm--btn" onClick={() => onConfirm(selectedCategories)}>选好了</div>
                </Footer>
            </Layout>
        </Modal>
    );
}

export default CategoriesSelect;
