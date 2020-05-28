import React, { Fragment, useMemo, useState } from 'react';

import { Layout, Content, Footer, Flex, Row, Col } from 'micro-design';
import 'micro-design/dist/es/components/layout/style';
import 'micro-design/dist/es/components/flex/style';
import 'micro-design/dist/es/components/grid/style';

import { upload } from '~/modules/miniprogram/file';
import { chooseImage } from '~/modules/miniprogram/image';
import { showToast } from '~/modules/miniprogram/ui';
import { send } from '~/modules/request/proxy';
import { getImageUrl } from '~/modules/utils/image';
import router from '~/router';
import { showAuthorizeModal } from '~/store/action/app';
import useToggle from '~/hooks/useToggle';
import useDataApi from '~/hooks/useDataApi';

import useFormItem from './components/form/useFormItem';
import useFormItemList from './components/form/useFormItemList';
import ListForm from './components/listForm';
import IngredientFormItem from './components/ingredientFormItem';
import StepFormItem from './components/stepFormItem';
import CategoriesSelect from './components/categoriesSelect';

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

    const [mainImageId, setMainImageId] = useState();
    const mainImagePath = useMemo(() => getImageUrl(mainImageId), [mainImageId]);

    const [categories, setCategories] = useState([]);

    const handleConfirmCategory = (selectedCategories) => {
        setCategories(selectedCategories);
        toggleShowCategorySelectionList();
    };

    const [ingredientList, {
        addItem: addIngredient,
        deleteItem: deleteIngredient,
        updateItem: updateIngredient,
    }] = useFormItemList([new IngredientConstructor], {
        ItemConstructor: IngredientConstructor,
    });

    const [stepList, {
        addItem: addStep,
        deleteItem: deleteStep,
        updateItem: updateStep,
    }] = useFormItemList([new StepConstructor], {
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
        const categoryProducts = categories.map(category => ({ categoryId: category.id }));
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
                    onDel={(item) => deleteIngredient(item)}
                    renderItem={(item, index) => (<IngredientFormItem onChange={(newItem) => updateIngredient(newItem, index)} {...item} />)}
                />
                <ListForm
                    title="步骤"
                    itemList={stepList}
                    onAdd={addStep}
                    onDel={(index) => deleteStep(index)}
                    renderItem={(item, index) => (<StepFormItem onChange={(newItem) => updateStep(newItem, index)} onUpload={(imageId) => updateStep({ ...item, imageId,}, index)} onChange={(newItem) => updateStep(newItem, index)} {...item} />)}
                />
                <label class="form-item--box">
                    <input placeholder="多给点建议你好我也好" className="textarea--box" {...tip} />
                </label>
                <Flex justifyContent="space-between" alignItems="center" className="category-select--btn" onClick={toggleShowCategorySelectionList}>
                    <p>推荐至分类</p>
                    <wx-image mode="widthFix" style={{ width: '20px' }} src="/assets/images/create/arrow.svg"></wx-image>
                </Flex>
                <Row gutter={[10, 10]} style={{ padding: '0 20px 20px 20px', }}>
                    {
                        categories.map(category => <Col key={category.id} className="category-tag--box">{category.name}</Col>)
                    }
                </Row>
            </Content>
            <Footer>
                <button className="save--btn" onClick={handleSubmit}>发布菜谱</button>
            </Footer>
            {
                shouldShowCategorySelectionList && <CategoriesSelect selectedCategories={categories} allCategories={allCategories} onConfirm={handleConfirmCategory} />
            }
        </Layout>
    );
}

export default Create;
