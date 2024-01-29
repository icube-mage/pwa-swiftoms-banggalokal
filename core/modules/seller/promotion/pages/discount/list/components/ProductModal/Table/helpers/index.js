/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
export const getComponentOrString = (param) => {
    if (typeof param === 'function') {
        return param();
    }
    if (typeof param === 'string' || typeof param === 'number') {
        if (String(param) !== 'undefined') {
            return String(param);
        }
    }
    return param;
};
export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
        const handleTimeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handleTimeout);
        };
    }, [value]);

    return debouncedValue;
};

export const isEmpty = (value) => {
    if ([undefined, null, '', false].includes(value)) return true;
    if (value && value.length <= 0) return true;
    return false;
};

export default {
    getComponentOrString, useDebounce, isEmpty,
};
