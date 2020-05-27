import React from 'react';

import Modal from '~/components/modal';

import './style.css';

function CategorySelectionList(props) {
    const { categories = [] } = props;

    return (
        <Modal>
            <div className="category-selection--container">
                {
                    categories.map(category => (<div key={category.id}>{category.name}</div>))
                }
            </div>
        </Modal>
    );
}

export default CategorySelectionList;
