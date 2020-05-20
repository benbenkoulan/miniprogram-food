import React from 'react';

import './style.css';

function SubCategory(props) {
    const { imagePath, name, onClickSubCategory } = props;

    return (
        <div className="sub-category--box" onClick={onClickSubCategory}>
            <wx-image mode="widthFix" className="sub-category--icon" src={imagePath}></wx-image>
            <p className="sub-category--text">{name}</p>
        </div>
    );
}

SubCategory.defaultProps = {
    imagePath: '',
    name: '',
    onClickSubCategory: () => {}
};

export default SubCategory;
