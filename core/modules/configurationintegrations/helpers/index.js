/* eslint-disable import/prefer-default-export */
export const optionsStatus = [
    { id: '0', name: 'Inactive' },
    { id: '1', name: 'Active' },
];

export const allIdTree = (tree) => {
    const res = [];
    function recursiveIdTree(e) {
        res.push(e.id);
        if (e.children?.length) {
            e.children.forEach(recursiveIdTree);
        }
    }
    tree.forEach(recursiveIdTree);
    return res;
};

export const conditionsOptions = [
    { value: 'company_id', label: 'Company' },
    { value: 'channel_id', label: 'Channel' },
    { value: 'loc_id', label: 'Location' },
];
