export const isProductFixed = {
    attribute_code: 'is_fixed_bundle',
    attribute_options: [
        {
            label: 'Yes',
            value: '1',
        },
        {
            label: 'No',
            value: '0',
        },
    ],
    attribute_value: '1',
    frontend_input: 'boolean',
    frontend_input_type: 'yes-no',
    frontend_label: 'Fixed Bundle',
    is_readonly: false,
    is_required: false,
    opposite: ['price_type', 'weight_type'],
};

export const priceType = {
    attribute_code: 'price_type',
    attribute_options: [
        {
            label: 'Yes',
            value: '1',
        },
        {
            label: 'No',
            value: '0',
        },
    ],
    attribute_value: '0',
    frontend_input: 'boolean',
    frontend_label: 'Dynamic Price',
    is_readonly: false,
    is_required: false,
    disabled_code: 'is_fixed_bundle',
};

export const weightType = {
    attribute_code: 'weight_type',
    attribute_options: [
        {
            label: 'Yes',
            value: '1',
        },
        {
            label: 'No',
            value: '0',
        },
    ],
    attribute_value: '0',
    frontend_input: 'boolean',
    frontend_label: 'Dynamic Weight',
    is_readonly: false,
    is_required: false,
    disabled_code: 'is_fixed_bundle',
};

export default { isProductFixed, priceType, weightType };
