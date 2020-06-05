import { useState } from 'react';

function useFormItemList(initialItemList = [], {
    ItemConstructor = Object,
}) {
    const [itemList, setItemList] = useState(initialItemList);
    const addItem = () => {
        setItemList([
            ...itemList,
            new ItemConstructor,
        ]);
    };

    const updateItem = (newItem, itemIndex) => {
        const newItemList = itemList.map((item, index) => itemIndex === index ? newItem : item);
        setItemList(newItemList);
    };

    const deleteItem = (deletingIndex) => {
        setItemList((prevItemList) => {
            if (prevItemList.length <= 1) return prevItemList;
            const itemList = prevItemList.filter((item, index) => index !== deletingIndex);
            return itemList;
        });
    };

    return [
        itemList,
        {
            addItem,
            updateItem,
            deleteItem,
            setItemList
        }
    ];
}

export default useFormItemList;
