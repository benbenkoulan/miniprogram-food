import React, { useState, useMemo } from 'react';
import { Layout, Content, Footer } from 'micro-design';

import Modal from '~/components/modal';

import CategoryOption from './components/categoryOption';
import SelectedCategoriesInput from './components/selectedCategoriesInput';
import './style.css';

function CategoriesSelect(props) {
    const {
        allCategories: initialAllCategories = [],
        selectedCategoryIds: initialSelectedCategoryIds = [],
        onConfirm
    } = props;
    const [categories, setCategories] = useState(() => initialAllCategories.map(category => category.parentId ? {
        ...category,
        isSelected: !!initialSelectedCategoryIds.find(initialSelectedCategoryId => initialSelectedCategoryId === category.id),
    } : category));
    
    const selectedCategories = useMemo(() => categories.filter(category => category.isSelected), [categories]);

    const toggleCategory = (categoryId) => {
        const currentCategory = categories.find(category => category.id === categoryId);
        if (currentCategory.isSelected || selectedCategories.length < 5) {
            setCategories(categories.map(category => category.id === categoryId ? ({ ...category, isSelected: !category.isSelected, }) : category));
        }
    };

    const handleUncheck = (categoryId) => {
        setCategories(categories.map(category => category.id === categoryId ? ({ ...category, isSelected: false, }) : category));
    };

    const handleConfirm = () => {
        onConfirm(selectedCategories.map(selectedCategory => selectedCategory.id));
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
                    <div className="confirm--btn" onClick={handleConfirm}>选好了</div>
                </Footer>
            </Layout>
        </Modal>
    );
}

export default CategoriesSelect;
