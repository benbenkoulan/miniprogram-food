import { useState } from 'react';

import { checkRules, getChangeEventNameByElementType } from './utils';

function useFormItem(name, {
    change,
    initialValue,
    rules = [],
    type= 'input',
} = {}) {
    const [value, setValue] = useState(initialValue);
    const [dirty, setDirty] = useState(false);
    const valid = checkRules(rules, value);

    const eventName = getChangeEventNameByElementType(type);
    
    const changeHandler = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        if (change) change(newValue);
        setDirty(true);
    };

    return {
        name,
        type,
        value,
        valid,
        dirty,
        [eventName]: changeHandler,
    };
}

export default useFormItem;
