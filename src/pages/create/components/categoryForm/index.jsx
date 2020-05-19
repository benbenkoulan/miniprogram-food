import React, { useEffect, useRef, useState } from 'react';
import { Row, Col } from 'micro-design';
import 'micro-design/dist/es/components/flex/style.css';

import Modal from '~/components/modal';

import './style.css';

function CategoryForm(props) {
    const { categories: allCategories, onSubmitCategoryForm, currentCategory } = props;
    const [initialParentCategoryIndex = 0, initialCategoryIndex = 0, index] = currentCategory;
    const pickerRef = useRef();

    const [parentCategoryIndex, setParentCategoryIndex] = useState(initialParentCategoryIndex);
    const [categoryIndex, setCategoryIndex] = useState(initialCategoryIndex);
    const [tempParentCategoryIndex, setTempParentCategoryIndex] = useState(initialParentCategoryIndex);
    const [tempCategoryIndex, setTempCategoryIndex] = useState(initialCategoryIndex);

    const [categories, setCategories] = useState([[], []]);

    useEffect(() => {
        const handleColumnChange = (e) => {
            const { column, value: index } = e.detail;
            if (column === 0) {
                setTempParentCategoryIndex(index);
            } else if (column === 1) {
                setTempCategoryIndex(index);
            }
        };

        pickerRef.current.addEventListener('columnChange', handleColumnChange);
    }, []);

    useEffect(() => {
        const firstCategoires = allCategories.map(category => ({
            id: category.id,
            name: category.name,
        }));
        if (firstCategoires.length > 0) {
            const firstCategory = allCategories[tempParentCategoryIndex];
            const secondCategories = [...firstCategory.children];
            setCategories([firstCategoires, secondCategories]);
        }
    }, [allCategories, tempParentCategoryIndex]);

    useEffect(() => {
        const handleChange = () => {
            setParentCategoryIndex(tempParentCategoryIndex);
            setCategoryIndex(tempCategoryIndex);
        };

        pickerRef.current.addEventListener('change', handleChange);
    }, [tempParentCategoryIndex, tempCategoryIndex]);

    useEffect(() => {
        const handleCancel = () => {
            setTempParentCategoryIndex(parentCategoryIndex);
            setTempCategoryIndex(categoryIndex);
        };

        pickerRef.current.addEventListener('cancel', handleCancel);
    }, [parentCategoryIndex, categoryIndex]);

    const handleConfirm = () => {
        onSubmitCategoryForm([parentCategoryIndex, categoryIndex], index);
    };

    return (
        <Modal>
            <div className="category-form--box">
                <label className="form-item--box">
                    <span className="form-item--label">选择分类</span>
                    <wx-picker ref={pickerRef} mode="multiSelector" value={[tempParentCategoryIndex, tempCategoryIndex]} range={JSON.stringify(categories)} range-key="name">
                        <div>
                            {
                                (categories[0].length > 0 && categories[1].length > 0)
                                    ? (`${categories[0][tempParentCategoryIndex].name} - ${categories[1][tempCategoryIndex].name}`)
                                    : '请选择'
                            }
                        </div>
                    </wx-picker>
                </label>
                <Row gutter={20}>
                    <Col span={12}>
                        <div className="cancel-btn--box category-btn--box" onClick={props.onCloseCategoryForm}>取消</div>
                    </Col>
                    <Col span={12}>
                        <div className="category-btn--box" onClick={handleConfirm}>确认</div>
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}

CategoryForm.defaultProps = {
    categories: [[], []],
    currentCategory: [0, 0]
}

export default CategoryForm;
