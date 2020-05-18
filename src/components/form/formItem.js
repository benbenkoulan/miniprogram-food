import { useState } from 'react';

import { checkRules } from './utils';

function useFormItem(name, {
    change,
    initialValue,
    rules = [],
    type= 'input',
} = {}) {
    const [value, setValue] = useState(initialValue);
    const [dirty, setDirty] = useState(false);
    const valid = checkRules(rules, value);
    
    const onInput = (e) => {
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
        onInput,
        setValue,
    };
}

export default useFormItem;
