import React from 'react';
import { Row, Col } from 'micro-design';
import 'micro-design/dist/es/components/flex/style.css';

import Modal from '../../../../components/modal';
import useFormItem from '../form/formItem';

import './style.css';

function GarnishForm(props) {
    console.log(props);

    const name = useFormItem('name', {
        initialValue: props.name,
    });
    const weight = useFormItem('weight', {
        initialValue: props.weight,
    });

    const handleConfirm = () => {
        props.onSubmitGarnishForm({
            name: name.value,
            weight: weight.value,
        });
        props.onCloseGarnishForm();
    };


    return (<Modal>
        <div className="garnish-form--box">
            <label className="form-item--box">
                <span className="form-item--label">材料</span>
                <input className="form-input--box" {...name} />
            </label>
            <label className="form-item--box">
                <span className="form-item--label">重量</span>
                <input className="form-input--box" {...weight} />
            </label>
            <Row gutter={20}>
                <Col span={12}>
                    <div className="cancel-btn--box garnish-btn--box" onClick={props.onCloseGarnishForm}>取消</div>
                </Col>
                <Col span={12}>
                    <div className="garnish-btn--box" onClick={handleConfirm}>确认</div>
                </Col>
            </Row>
        </div>
    </Modal>);
}

GarnishForm.defaultProps = {
    name: '',
    weight: '',
    onCloseGarnishForm: () => {},
    onSubmitGarnishForm: () => {},
};

export default GarnishForm;
