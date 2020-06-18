export const throttle = (func, wait = 0, trailing = false) => {
    let result;
    let timer = null;
    const later = (context, args) => {
        return setTimeout(() => {
            clearTimeout(timer);
            timer = null; // 计时完毕
            if (trailing) { // 尾部执行
                result = func.apply(context, args);
            }
            context = args = null;
        }, wait);
    }
    return function() {
        if (timer === null) { // 未开始计时
            timer = later(this, arguments); // 开始计时
            if (!trailing) { // 头部执行
                result = func.apply(this, arguments);
            }
        }
        return result;
    }
}

export default throttle;
