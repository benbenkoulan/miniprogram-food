import isNill from 'lodash/isNil';

function checkFixedRule(fixedRule, value) {
    const isRequiredValid = !fixedRule.required || (!isNill(value) && value !== '');
    const isLengthInvalid = (fixedRule.minLength > 0 && (isNill(value) || value.length < fixedRule.minLength))
    || (fixedRule.maxLength > 0 && (isNill(value) || value.length > fixedRule.maxLength));
    const isRegValid = !(fixedRule.reg instanceof RegExp) || fixedRule.reg.test(value);
    return isRequiredValid && !isLengthInvalid && isRegValid;
}

function checkRule(rule, value) {
    if (!rule) return true;
    if (typeof rule === 'function') {
        return rule(value);
    }
    if (rule instanceof RegExp) {
        return rule.test(value);
    }
    if (typeof rule === 'object') {
        return checkFixedRule(rule, value);
    }
    return true;
}

export function checkRules(rules, value) {
    return rules.every(rule => checkRule(rule, value));
}
