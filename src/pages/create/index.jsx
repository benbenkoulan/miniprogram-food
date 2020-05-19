import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Layout, Content, Footer } from 'micro-design';
import 'micro-design/dist/es/components/layout/style.css';

import { fetchCategories } from '~/store/action/cookbook';
import { categoriesSelector } from '~/store/selector';
import { upload } from '~/modules/miniprogram/file';
import { chooseImage } from '~/modules/miniprogram/image';
import { showToast } from '~/modules/miniprogram/ui';
import { send } from '~/modules/request/proxy';
import router from '~/router';

import useFormItem from './components/form/formItem';
import useFormItemList from './components/form/formItemList';
import GarnishForm from './components/garnishForm';
import StepForm from './components/stepForm';
import CategoryForm from './components/categoryForm';

import './style.css';

function getCategoryId(allCategories, parentCategoryIndex, categoryIndex) {
    const parentCategory = allCategories[parentCategoryIndex];
    const category = parentCategory.children[categoryIndex];
    return category.id;
}

function Create() {
    const dispatch = useDispatch();
    const allCategories = useSelector(categoriesSelector);

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    const title = useFormItem('title', {
        rules: [{
            required: true,
            maxLength: 10, 
        }]
    });

    const description = useFormItem('description');
    const tip = useFormItem('tip');

    const [
        [garnishes],
        [isShowGarnishForm, hideGarnishForm],
        [currentGarnish],
        [addGarnish, deleteGarnish, editGarnish, saveGarnish],
    ] = useFormItemList();

    const [
        [steps],
        [isShowStepForm, hideStepForm],
        [currentStep],
        [addStep, deleteStep, editStep, saveStep],
    ] = useFormItemList();

    const [
        [categories],
        [isShowCategoryForm, hideCategoryForm],
        [currentCategory],
        [addCategory, deleteCategory, editCategory, saveCategory],
    ] = useFormItemList([], []);

    const renderCategories = () => (
        categories.map((categoryIndexs, index) => {
            const [parentCategoryIndex, categoryIndex] = categoryIndexs;
            const parentCategory = allCategories[parentCategoryIndex];
            const category = parentCategory.children[categoryIndex];
            return (
                <div key={`${parentCategoryIndex}-${categoryIndex}`} className="selected--box">
                <p className="text--box" onClick={() => editCategory(categoryIndexs, index)}>{parentCategory.name}-{category.name}</p>
                <wx-image className="close--icon" src="/assets/images/create/close.svg" onClick={() => deleteCategory(index)}></wx-image>
            </div>
            );
        })
    );

    const renderGarnishes = () => (
        garnishes.map((garnish, index) => (
            <div key={garnish.name} className="selected--box">
                <p className="text--box" onClick={() => editGarnish(garnish, index)}>{garnish.name} {garnish.weight}</p>
                <wx-image className="close--icon" src="/assets/images/create/close.svg" onClick={() => deleteGarnish(index)}></wx-image>
            </div>
        ))
    );    

    const renderSteps = () => (
        steps.map((step, index) => (
            <div key={index} className="selected--box">
                <p className="text--box" onClick={() => editStep(step, index)}>步骤 {index + 1}</p>
                <wx-image className="close--icon" src="/assets/images/create/close.svg" onClick={() => deleteStep(index)}></wx-image>
            </div>
        ))
    );

    const [mainImageId, setMainImageId] = useState();

    const handleUpload = async () => {
        const { tempFilePaths } = await chooseImage({ sizeType: ['original', 'compressed'] });
        const filePath = tempFilePaths[0];
        const { data } = await upload(filePath);
        setMainImageId(data);
    };

    const handleSubmit = async () => {
        const categoryProducts = categories.map((categoryIndexs) => ({ categoryId: getCategoryId(allCategories, ...categoryIndexs) }));
        const ingredients = garnishes.map((garnish, index) => ({
            lineNumber: index + 1,
            ...garnish,
        }));
        const stepsData = steps.map((step, index) => ({
            lineNumber: index + 1,
            ...step,
        }));
        const formData = {
            title: title.value,
            mainImageId,
            categoryProducts,
            ingredients,
            steps: stepsData,
            description: description.value,
            tip: tip.value,
        };
        const result = await send('saveCookbook', { data: formData });
        console.log(result);
        await showToast({ title: '恭喜，美食已分享' });
        router.switchTab('my');
    };

    return (
        <Layout className="page">
            <Content>
                <label className="form-item--box">
                    <span className="form-item--label">菜长啥样</span>
                    <div className="add--btn" onClick={handleUpload}>{ mainImageId ? '已选择图片' : '点击上传' }</div>
                </label>
                <label class="form-item--box">
                    <span className="form-item--label">菜叫啥名</span>
                    <input className="form-input--box input--box" {...title} />
                </label>
                <label class="category form-item--box">
                    <span className="form-item--label">菜品印象</span>
                    <div className="list--box">
                        {renderCategories()}
                        <div className="add--btn" onClick={addCategory}>添加</div>
                    </div>
                </label>
                <label class="garnish form-item--box">
                    <span className="form-item--label">材料清单</span>
                    <div className="list--box">
                        {renderGarnishes()}
                        <div className="add--btn" onClick={addGarnish}>添加</div>
                    </div>
                </label>
                <label class="step form-item--box">
                    <span className="form-item--label">一步一步</span>
                    <div className="list--box">
                        {renderSteps()}
                        <div className="add--btn" onClick={addStep}>添加</div>
                    </div>
                </label>
                <label class="form-item--box">
                    <span className="form-item--label">有故事吗</span>
                    {
                        !isShowStepForm && !isShowGarnishForm && (
                            <textarea className="form-input--box textarea--box" {...description} placeholder="请说出你的故事"></textarea>
                        )
                    }                    
                </label>
                <label class="form-item--box">
                    <span className="form-item--label">给点建议</span>
                    {
                        !isShowStepForm && !isShowGarnishForm && (
                            <textarea className="form-input--box textarea--box" {...tip} placeholder="多给点建议你好我也好"></textarea>
                        )
                    }
                </label>
            </Content>
            <Footer>
                <button className="save--btn" onClick={handleSubmit}>保存</button>
            </Footer>
            { isShowGarnishForm && (
                <GarnishForm
                    {...currentGarnish}
                    onCloseGarnishForm={hideGarnishForm}
                    onSubmitGarnishForm={saveGarnish}
                /> 
            )}
            { isShowStepForm && (
                <StepForm
                    {...currentStep}
                    onCloseStepForm={hideStepForm}
                    onSubmitStepForm={saveStep}
                />
            )}
            {
                isShowCategoryForm && (
                    <CategoryForm
                        currentCategory={currentCategory}
                        onCloseCategoryForm={hideCategoryForm}
                        onSubmitCategoryForm={saveCategory}
                        categories={allCategories}
                    />
                )
            }
        </Layout>
    );
}

export default Create;
