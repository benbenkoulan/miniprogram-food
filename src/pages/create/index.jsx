import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/es/form/style/index.css';

import { Layout, Content, Footer } from 'micro-design';
import 'micro-design/dist/es/components/layout/style.css';

import useFormItem from './components/form/formItem';
import GarnishForm from './components/garnishForm';
import StepForm from './components/stepForm';

import './style.css';

const { TextArea } = Input;
const { Item: FormItem } = Form;

const FORM_LAYOUT = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    }
};

function Create(props) {
    const name = useFormItem('name', {
        rules: [{
            required: true,
            maxLength: 10, 
        }]
    });
    const description = useFormItem('description');
    const tip = useFormItem('tip');

    const [garnishes, setGarnishes] = useState([]);
    const [currentGarnish, setCurrentGarnish] = useState({});

    const [showGarnishForm, setShowGarnishForm] = useState(false);

    const [showStepForm, setShowStepForm] = useState(true);

    const handleAddGarnish = () => {
        setCurrentGarnish({});
        setShowGarnishForm(true);
    };

    const handleCloseGarnishForm = () => {
        setShowGarnishForm(false);
    };

    const handleSubmitGarnishForm = (garnish) => {
        setGarnishes([
            ...garnishes,
            garnish,
        ]);
    };

    const handleEditGarnish = (garnish) => {
        setCurrentGarnish(garnish);
        setShowGarnishForm(true);
    };

    const handleDeleteGarnish = (toDeleteGarnishIndex) => {
        const newGarnishes = garnishes.filter((garnish, index) => index !== toDeleteGarnishIndex);
        setGarnishes([
            ...newGarnishes,
        ]);
    };

    const renderGarnishes = (garnishes) => (
        garnishes.map((garnish, index) => (
            <div key={garnish.name} className="garnish--box">
                <p className="garnish-text--box" onClick={() => handleEditGarnish(garnish)}>{garnish.name} {garnish.weight}</p>
                <wx-image className="garnish-close--icon" src="/assets/images/create/close.svg" onClick={() => handleDeleteGarnish(index)}></wx-image>
            </div>
        ))
    );

    return (
        <Layout className="page">
            <Content>
                <label class="form-item--box">
                    <span className="form-item--label">菜叫啥名</span>
                    <input className="form-input--box input--box" {...name} />
                </label>
                { name.dirty && !name.valid && (<p>错误</p>) }
                <label class="form-item--box">
                    <span className="form-item--label">材料清单</span>
                    <div className="garnish-list--box">
                        {renderGarnishes(garnishes)}
                        <wx-image className="add--icon" src="/assets/images/create/add.svg" onClick={handleAddGarnish}></wx-image>
                    </div>
                </label>
                <label class="form-item--box">
                    <span className="form-item--label">一步一步</span>
                    <wx-image className="add--icon" src="/assets/images/create/add.svg"></wx-image>
                </label>
                <label class="form-item--box">
                    <span className="form-item--label">有故事吗</span>
                    <textarea className="form-input--box textarea--box" {...description} placeholder="请说出你的故事"></textarea>
                </label>
                <label class="form-item--box">
                    <span className="form-item--label">给点建议</span>
                    <textarea className="form-input--box textarea--box" {...tip} placeholder="多给点建议你好我也好"></textarea>
                </label>
            </Content>
            <Footer>
                <button className="save--btn">保存</button>
            </Footer>
            { showGarnishForm && (
                <GarnishForm
                    {...currentGarnish}
                    onCloseGarnishForm={handleCloseGarnishForm}
                    onSubmitGarnishForm={handleSubmitGarnishForm}
                /> 
            )}
            {
                showStepForm && (
                    <StepForm />
                )
            }
        </Layout>
        // <form className="form--box">
        // </form>
        // <Form
        //     form={form}
        //     initialValues={{
        //         name: '',
        //         description: '',
        //     }}
        //     {...FORM_LAYOUT}
        // >
        //     <FormItem
        //         label="菜叫啥名"
        //         name="name"
        //     >
        //         <Input />
        //     </FormItem>
        //     <FormItem
        //         label="你有故事吗"
        //         name="description"
        //     >
        //         <TextArea
        //             rows="5"
        //             placeholder="请说出你的故事" />
        //     </FormItem>
        // </Form>
    );
}

export default Create;
