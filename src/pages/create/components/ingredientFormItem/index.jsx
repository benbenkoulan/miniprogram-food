import React from 'react';
import { Row, Col } from 'micro-design';

import useFormItem from '~/hooks/form/useFormItem';

function IngredientFormItem(props) {
    const { name: initialNameValue, weight: initialWeightValue, onChange } = props;

    const name = useFormItem('name', {
        initialValue: initialNameValue,
        change: (newNameValue) => {
            onChange({
                name: newNameValue,
                weight: weight.value,
            });
        },
    });

    const weight = useFormItem('weight', {
        initialValue: initialWeightValue,
        change: (newWeightValue) => {
            onChange({
                name: name.value,
                weight: newWeightValue,
            });
        },
    });

    return (
        <Row style={{ padding: '10px 0' }}>
            <Col span={12}>
                <textarea fixed placeholder="食材：如面粉" {...name} style={{ width: '100%', height: '24px', lineHeight: '24px', verticalAlign: 'middle' }} />
            </Col>
            <Col span={12}>
                <textarea fixed placeholder="用量：如100g" {...weight} style={{ width: '100%', height: '24px', lineHeight: '24px', verticalAlign: 'middle' }} />
            </Col>
        </Row>
    );
}

export default IngredientFormItem;
