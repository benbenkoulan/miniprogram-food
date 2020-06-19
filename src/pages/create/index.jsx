import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import flatMap from 'lodash/flatMap';
import { Layout, Content, Footer, Flex, Row, Col } from 'micro-design';

import { uploadFile } from '~/modules/miniprogram/file';
import { chooseImage, getImageInfo } from '~/modules/miniprogram/image';
import { showToast } from '~/modules/miniprogram/ui';
import { send } from '~/modules/request/proxy';
import { getImageUrl } from '~/modules/utils/image';
import withLoading from '~/modules/hof/withLoading';
import router from '~/router';
import useToggle from '~/hooks/useToggle';
import useDataApi from '~/hooks/useDataApi';
import useFormItem from '~/hooks/form/useFormItem';
import useFormItemList from '~/hooks/form/useFormItemList';
import useMount from '~/hooks/useMount';
import { saveDraft } from '~/store/action/user';

import ListForm from './components/listForm';
import IngredientFormItem from './components/ingredientFormItem';
import StepFormItem from './components/stepFormItem';
import CategoriesSelect from './components/categoriesSelect';

import './style.css';

function IngredientConstructor() {
    this.name = '';
    this.weight = '';
}

function StepConstructor() {
    this.imageId = '';
    this.description = '';
}

const convertCategories = (data) => flatMap(data, (category) => [
    category,
    ...category.children,
]);

function Create(props) {
    const query = props.query || {}

    const [draft, setDraft] = useState({});
    const [id, setId] = useState(query.id);

    const dispatch = useDispatch();

    useMount(async () => {
        if (id) {
            const { data = {} } = await send('getCookbookDetail', { data:{ id } })
            setDraft(data);
            setMainImageId(data.mainImageId);
            setIngredientList(data.ingredients);
            setStepList(data.steps);
            setCategoryIds(data.categoryProducts.map(categoryProduct => categoryProduct.categoryId));
        }
    });

    const [shouldShowCategorySelectionList, {
        toggle: toggleShouldShowCategorySelectionList
    }] = useToggle(false);

    const title = useFormItem('title', {
        initialValue: draft.title,
        rules: [{
            required: true,
            maxLength: 20
        }]
    });
    const description = useFormItem('description', {
        initialValue: draft.description,
    });

    const tip = useFormItem('tip', {
        initialValue: draft.tip,
    });

    const [mainImageId, setMainImageId] = useState();
    const mainImagePath = useMemo(() => getImageUrl(mainImageId), [mainImageId]);
    const [extInfo, setExtInfo] = useState({});

    const [allCategories] = useDataApi('getCategories', {
        initialData: [],
        propertyName: 'data',
        convertData: convertCategories,
    });
    const [categoryIds, setCategoryIds] = useState([]);
    const categories = useMemo(() => {
        if (!allCategories.length) return [];
        return categoryIds.map(categoryId => allCategories.find(category => category.id === categoryId));
    }, [categoryIds, allCategories]);

    const handleConfirmCategory = (selectedCategoryIds) => {
        setCategoryIds(selectedCategoryIds);
        toggleShouldShowCategorySelectionList();
    };

    const [ingredientList, {
        addItem: addIngredient,
        deleteItem: deleteIngredient,
        updateItem: updateIngredient,
        setItemList: setIngredientList
    }] = useFormItemList([new IngredientConstructor], {
        ItemConstructor: IngredientConstructor,
    });

    const [stepList, {
        addItem: addStep,
        deleteItem: deleteStep,
        updateItem: updateStep,
        setItemList: setStepList
    }] = useFormItemList([new StepConstructor], {
        ItemConstructor: StepConstructor
    });

    const handleUpload = async () => {
        const { tempFilePaths } = await chooseImage({ sizeType: ['original', 'compressed'] });
        const filePath = tempFilePaths[0];
        const [{ data }, { width, height }] = await withLoading(() => Promise.all([
            uploadFile(filePath),
            getImageInfo(filePath),
        ]))();
        setMainImageId(data);
        setExtInfo({
            ...extInfo,
            width,
            height,
        });
    };

    const getErrorMessage = (isPublish) => {
        if (!title.valid) {
            return '菜谱必须要有标题的哦';
        } else if (isPublish) {
            if (!mainImageId) {
                return '菜谱必须要有主图的哦';
            }
            if (ingredientList.some(ingredient => !ingredient.name || !ingredient.weight)) {
                return '配料必须要注明食材和用量哦';
            }
            if (stepList.some(step => !step.description)) {
                return '步骤必须要有描述的哦';
            }
            if (categories.length === 0) {
                return '要选择合适的分类哦';
            }
        }
        return null;
    }

    const handleSubmit = async (isPublish) => {
        const errorMessage = getErrorMessage(isPublish);
        if (errorMessage) {
            showToast({ title: errorMessage, icon: 'none', mask: true });
            return;
        }
        const categoryProducts = categories.map(category => ({ categoryId: category.id }))
        const ingredients = ingredientList.map((ingredient, index) => ({
            lineNumber: index + 1,
            ...ingredient
        }))
        const steps = stepList.map((step, index) => ({
            lineNumber: index + 1,
            ...step
        }))
        const formData = {
            id,
            title: title.value,
            mainImageId,
            categoryProducts,
            ingredients,
            steps,
            description: description.value,
            tip: tip.value,
            isPublish: isPublish ? 1 : 0,
            extInfo: JSON.stringify(extInfo),
        };

        if (isPublish) {
            await send('saveCookbook', { data: formData });
            await showToast({ title: '恭喜，美食已分享' })
            router.switchTab('my');
        } else {
            const data = await dispatch(saveDraft(formData));
            setId(data.id);
            showToast({ title: '已保存至草稿箱', duration: 2000 });
        }
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
                        mainImagePath ? <wx-image style={{ width: '100%' }} mode="aspectFit" src={mainImagePath}/> : (<Fragment>
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
                    renderItem={(item, index) => (
                        <IngredientFormItem onChange={(newItem) => updateIngredient(newItem, index)} {...item} />)}
                />
                <ListForm
                    title="步骤"
                    itemList={stepList}
                    onAdd={addStep}
                    onDel={(index) => deleteStep(index)}
                    renderItem={(item, index) => (<StepFormItem onChange={(newItem) => updateStep(newItem, index)}
                                                                onUpload={(imageId) => updateStep({
                                                                    ...item,
                                                                    imageId
                                                                }, index)}
                                                                onChange={(newItem) => updateStep(newItem, index)} {...item} />)}
                />
                <label class="form-item--box">
                    <input placeholder="多给点建议你好我也好" className="textarea--box" {...tip} />
                </label>
                <Flex justifyContent="space-between" alignItems="center" className="category-select--btn"
                      onClick={toggleShouldShowCategorySelectionList}>
                    <p>推荐至分类</p>
                    <wx-image mode="widthFix" style={{ width: '20px' }} src="/assets/images/create/arrow.svg"/>
                </Flex>
                <Row gutter={[10, 10]} style={{ padding: '0 20px 20px 20px', width: '100%', boxSizing: 'border-box' }}>
                    {
                        categories.map(category => <Col key={category.id}
                                                        className="category-tag--box">{category.name}</Col>)
                    }
                </Row>
            </Content>
            <Footer>
                <button className="drafts--btn" onClick={() => handleSubmit(false)}>保存至草稿箱</button>
                <button className="save--btn" onClick={() => handleSubmit(true)}>发布菜谱</button>
            </Footer>
            {
                shouldShowCategorySelectionList &&
                <CategoriesSelect selectedCategoryIds={categoryIds} allCategories={allCategories}
                                  onConfirm={handleConfirmCategory}/>
            }
        </Layout>
    )
}

export default Create
