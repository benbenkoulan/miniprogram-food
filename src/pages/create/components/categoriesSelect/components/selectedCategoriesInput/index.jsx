import React from 'react';
import { Row, Col } from 'micro-design';

import './style.css';

function SelectedCategoriesInput(props) {
    const { categories = [], onUncheck, } = props;

    return (
        <Row wrap style={{ width: '100%', padding: '10px 20px', boxSizing: 'border-box', minHeight: '60px', borderBottom: '1px solid #f0f0f0' }} gutter={[10, 10]}>
            {
                categories.map(category => (
                    <Col key={category.id}>
                        <div className="category--box" onClick={() => onUncheck(category.id)}>
                            <span style={{ fontSize: '12px', verticalAlign: 'middle' }}>{category.name}</span>
                            <wx-image style={{ marginLeft: '5px', width: '16px', height: '16px', verticalAlign: 'middle' }} src="/assets/images/create/close.svg"></wx-image>
                        </div>
                    </Col>
                ))
            }
        </Row>
    )
}

export default SelectedCategoriesInput;
