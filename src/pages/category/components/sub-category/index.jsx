import React from 'react';

import './style.css';

function SubCategory(props) {
    const { imagePath, name, isLoading, onClickSubCategory } = props;

    return (
        <div className={isLoading ? "sub-category--box" : "sub-category--box isLoading"} onClick={onClickSubCategory}>
            <wx-image mode="widthFix" className="sub-category--icon" src={imagePath}/>
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
