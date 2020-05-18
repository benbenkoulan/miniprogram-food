import { useState } from 'react';

function useFormItemList(initialFormItemList = [], initialCurrentFormItem = {}, initialIsShowForm = false) {
    const [formItemList, setFormItemList] = useState(initialFormItemList);
    const [currentFormItem, setCurrentFormItem] = useState(initialCurrentFormItem);
    const [isShowForm, setIsShowForm] = useState(initialIsShowForm);

    const hideForm = () => setIsShowForm(false);
    const showForm = () => setIsShowForm(true);

    const addFormItem = () => {
        setCurrentFormItem(initialCurrentFormItem);
        showForm();
    };

    const editFormItem = (formItem) => {
        setCurrentFormItem(formItem);
        showForm();
    }

    const saveFormItem = (upsertingFormItem) => {
        if (upsertingFormItem.index >= 0) {
            formItemList[upsertingFormItem.index] = upsertingFormItem;
            setFormItemList([
                ...formItemList,
            ]);
        } else {
            setFormItemList([
                ...formItemList,
                upsertingFormItem,
            ])
        }
        hideForm();
    };

    const deleteFormItem = (deletingIndex) => {
        const newFormItemList = formItemList.filter((formItem, index) => index !== deletingIndex);
        setFormItemList([
            ...newFormItemList,
        ]);
    };

    return [
        [formItemList, setFormItemList],
        [isShowForm, hideForm, showForm],
        [currentFormItem, setCurrentFormItem],
        [addFormItem, deleteFormItem, editFormItem, saveFormItem],
    ];
}

export default useFormItemList;
