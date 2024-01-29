export const transformArray = (arr = []) => {
    if (arr?.length) {
        const res = arr.filter((item) => !item.parent_item_id).map((item) => ({ ...item, bundle_children: [] }));
        arr.filter((item) => !!item.parent_item_id).forEach((item) => {
            const pIdx = res.findIndex((p) => p.entity_id === item.parent_item_id);
            // eslint-disable-next-line no-prototype-builtins
            if (pIdx >= 0 && res[pIdx] && res[pIdx].hasOwnProperty('bundle_children')) {
                res[pIdx] = {
                    ...res[pIdx],
                    bundle_children: [...res[pIdx].bundle_children, { ...item }],
                };
            }
        });
        return res;
    }
    return arr;
};

export default transformArray;
