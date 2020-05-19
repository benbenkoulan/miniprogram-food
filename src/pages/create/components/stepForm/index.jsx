import React, { useState } from 'react';
import { Row, Col } from 'micro-design';
import 'micro-design/dist/es/components/flex/style.css';

import { upload } from '~/modules/miniprogram/file';
import { chooseImage } from '~/modules/miniprogram/image';
import Modal from '~/components/modal';
import useFormItem from '~/components/form/formItem';

import './style.css';

function StepForm(props) {
    const description = useFormItem('description', {
        initialValue: props.description
    });
    const [filePath, setFilePath] = useState();

    const handleConfirm = async () => {
        const { data: imageId } = await upload(filePath);
        props.onSubmitStepForm({
            description: description.value,
            imageId,
        }, props.index);
        props.onCloseStepForm();
    };

    const handleChooseImage = async () => {
        const res = await chooseImage({ sizeType: ['original', 'compressed'], });
        const tempFilePaths = res.tempFilePaths;
        const filePath = tempFilePaths[0];
        setFilePath(filePath);
    };

    return (
        <Modal>
            <div className="step--form">
                <label className="form-item--box">
                    <span className="form-item--label">图片</span>
                    <div class="add-image--btn" onClick={handleChooseImage}>{ filePath ? '已选择图片' : '添加图片' }</div>
                </label>
                <label className="form-item--box">
                    <span className="form-item--label">描述</span>
                    <textarea className="form-input--box textarea--box" {...description} placeholder="步骤描述"></textarea>
                </label>
                <Row gutter={20}>
                    <Col span={12}>
                        <div className="cancel--btn step--btn" onClick={props.onCloseStepForm}>取消</div>
                    </Col>
                    <Col span={12}>
                        <div className="step--btn" onClick={handleConfirm}>确认</div>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
}

StepForm.defaultProps = {
    imageId: '',
    description: '',
    onCloseStepForm: () => {},
    onSubmitStepForm: () => {},
}

export default StepForm;
