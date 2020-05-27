import React, { Fragment, useMemo, useState } from 'react';

import { Layout, Content, Footer, Flex } from 'micro-design';
import 'micro-design/dist/es/components/layout/style.css';
import 'micro-design/dist/es/components/flex/style';

import { upload } from '~/modules/miniprogram/file';
import { chooseImage } from '~/modules/miniprogram/image';
import { showToast } from '~/modules/miniprogram/ui';
import { send } from '~/modules/request/proxy';
import { getImageUrl } from '~/modules/utils/image';
import router from '~/router';
import { showAuthorizeModal } from '~/store/action/app';
import useToggle from '~/hooks/useToggle';
import useDataApi from '~/hooks/useDataApi';

import useFormItemList from './components/form/formItemList';
import CategoryForm from './components/categoryForm';

import useFormItem from './components/form/useFormItem';
import useNewFormItemList from './components/form/useFormItemList';
import ListForm from './components/listForm';
import IngredientFormItem from './components/ingredientFormItem';
import StepFormItem from './components/stepFormItem';
import CategorySelectionList from './components/categorySelectionList';

import './style.css';

function getCategoryId(allCategories, parentCategoryIndex, categoryIndex) {
    const parentCategory = allCategories[parentCategoryIndex];
    const category = parentCategory.children[categoryIndex];
    return category.id;
}

function IngredientConstructor() {
    this.name = '';
    this.weight = '';
}

function StepConstructor() {
    this.imageId = '';
    this.description = '';
}

function Create() {
    const [shouldShowCategorySelectionList, toggleShowCategorySelectionList] = useToggle(false);
    
    const [allCategories] = useDataApi('getCategories', {
        initialData: [],
        propertyName: 'data',
    });
    
    const title = useFormItem('title', {
        rules: [{
            required: true,
            maxLength: 10, 
        }]
    });
    const description = useFormItem('description');
    const tip = useFormItem('tip');

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

    const [mainImageId, setMainImageId] = useState();
    const mainImagePath = useMemo(() => getImageUrl(mainImageId), [mainImageId]);

    const [ingredientList, {
        addItem: addIngredient,
        deleteItem: deleteIngredient,
        updateItem: updateIngredient,
    }] = useNewFormItemList([new IngredientConstructor], {
        ItemConstructor: IngredientConstructor,
    });

    const [stepList, {
        addItem: addStep,
        deleteItem: deleteStep,
        updateItem: updateStep,
    }] = useNewFormItemList([new StepConstructor], {
        ItemConstructor: StepConstructor,
    });

    const handleUpload = async () => {
        const { tempFilePaths } = await chooseImage({ sizeType: ['original', 'compressed'] });
        const filePath = tempFilePaths[0];
        const { data } = await upload(filePath);
        setMainImageId(data);
    };

    const handleSubmit = async () => {
        const { data: isAuthorized } = await send('getIsAuthorized');
        if (!isAuthorized) {
            dispatch(showAuthorizeModal());
            return;
        }
        const categoryProducts = categories.map((categoryIndexs) => ({ categoryId: getCategoryId(allCategories, ...categoryIndexs) }));
        const ingredients = ingredientList.map((ingredient, index) => ({
            lineNumber: index + 1,
            ...ingredient,
        }));
        const steps = stepList.map((step, index) => ({
            lineNumber: index + 1,
            ...step,
        }));
        const formData = {
            title: title.value,
            mainImageId,
            categoryProducts,
            ingredients,
            steps,
            description: description.value,
            tip: tip.value,
        };
        await send('saveCookbook', { data: formData });
        await showToast({ title: '恭喜，美食已分享' });
        router.switchTab('my');
    };

    return (
        <Layout className="page">
            <Content>
                <Flex
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    className="main-image--box select-image--btn"
                    onClick={handleUpload}
                >
                    {
                        mainImagePath ? <wx-image mode="aspectFit" src={mainImagePath} /> : (<Fragment>
                            <p>+菜谱封面</p>
                            <p>诱人的封面是吸引朋友的关键</p>
                        </Fragment>)
                    }
                </Flex>
                <label class="form-item--box">
                    <input placeholder="好的标题更能吸引人" className="title-input--box" {...title} />
                </label>
                <label class="form-item--box">
                    <input placeholder="输入这道美食背后的故事" className="textarea--box" {...description} />
                </label>
                <ListForm
                    title="用料"
                    itemList={ingredientList}
                    onAdd={addIngredient}
                    onDel={(index) => deleteIngredient(index)}
                    renderItem={(item, index) => (<IngredientFormItem onChange={(newItem) => updateIngredient(newItem, index)} {...item} />)}
                />
                <ListForm
                    title="步骤"
                    itemList={stepList}
                    onAdd={addStep}
                    onDel={(index) => deleteStep(index)}
                    renderItem={(item, index) => (<StepFormItem onUpload={(imageId) => updateStep({ ...item, imageId,}, index)} onChange={(newItem) => updateStep(newItem, index)} {...item} />)}
                />
                <label class="form-item--box">
                    <input placeholder="多给点建议你好我也好" className="textarea--box" {...tip} />
                </label>
                <div className="category-select--btn" onClick={toggleShowCategorySelectionList}>
                    推荐至分类
                </div>
                <label class="category form-item--box">
                    <span className="form-item--label">菜品印象</span>
                    <div className="list--box">
                        {renderCategories()}
                        <div className="add--btn" onClick={addCategory}>添加</div>
                    </div>
                </label>
            </Content>
            <Footer>
                <button className="save--btn" onClick={handleSubmit}>发布这个菜谱</button>
            </Footer>
            {
                shouldShowCategorySelectionList && <CategorySelectionList categories={allCategories} />
            }
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
