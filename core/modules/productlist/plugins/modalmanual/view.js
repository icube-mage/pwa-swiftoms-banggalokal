/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
import React from 'react';
import useStyles from '@modules/productlist/plugins/modalmanual/style';

import Table from '@common_table';
import Button from '@common_button';

const ModalManualContent = (props) => {
    const {
        t, data, loading, formik, handleClose, id, variant_id, getConfigurableProductAssociated,
    } = props;
    const classes = useStyles();

    const productList = (data && data.getConfigurableProductAssociated && data.getConfigurableProductAssociated.items) || [];
    const productTotal = (data && data.getConfigurableProductAssociated && data.getConfigurableProductAssociated.total_count) || 0;

    const [selected, setSelected] = React.useState([]);

    const importOptions = () => {
        const { product_configurable, associated_product_ids } = formik.values.configurable;
        const result = selected.map((d) => {
            const attributesMaps = [];
            const attributesLabels = [];
            d.attributes.forEach((at) => {
                attributesMaps.push([at.attribute_code, at.attribute_value]);
                attributesLabels.push(`${at.frontend_label}: ${at.attribute_value}`);
            });
            return ({
                id: d.entity_id,
                entity_id: d.entity_id,
                attributes: d.attributes,
                name: d.name,
                price: d.price,
                type_id: d.type_id,
                sku: d.sku,
                weight: d.weight || '0',
                status: d.status === 'Enabled' ? 1 : 0,
                images: d.images.map((image) => ({
                    name: image.file,
                    types: [],
                    ...image,
                })),
                isAssociated: true,
                ...Object.fromEntries(attributesMaps),
                attributesCombined: Object.values(Object.fromEntries(attributesMaps)),
                attributes_frontend: attributesLabels.join(', '),
            });
        });
        const idSelected = selected.map((s) => s.id);
        let newConf = [];
        let newAsc = [];
        if (variant_id) {
            const confIdx = product_configurable.findIndex((p) => (p.id || p.entity_id) === variant_id);
            newConf = [...product_configurable];
            newConf.splice(confIdx, 1, ...result);
            newAsc = [...associated_product_ids.filter((d) => d !== variant_id), ...idSelected];
        } else {
            newConf = [...product_configurable, ...result];
            newAsc = [...associated_product_ids, ...idSelected];
        }
        formik.setFieldValue('configurable.product_configurable', newConf);
        formik.setFieldValue('configurable.associated_product_ids', newAsc);
        handleClose();
    };

    const columns = [
        { field: 'entity_id', headerName: 'ID', hideable: true, sortable: true, initialSort: 'ASC' },
        { field: 'thumbnail', headerName: t('productlist:Thumbnail'), hideable: true },
        { field: 'name', headerName: t('productlist:Name'), hideable: true, sortable: true },
        { field: 'sku', headerName: t('productlist:SKU'), hideable: true, sortable: true },
        { field: 'price', headerName: t('productlist:Price'), hideable: true },
        { field: 'weight', headerName: t('productlist:Weight'), hideable: true, sortable: true },
        { field: 'attributes_label', headerName: t('productlist:Attributes'), hideable: true },
        { field: 'status', headerName: t('productlist:Status'), hideable: true },
    ];

    const filters = [
        { field: 'entity_id', name: 'entity_id_from', type: 'from', label: t('productlist:ID_From'), initialValue: '' },
        { field: 'entity_id', name: 'entity_id_to', type: 'to', label: t('productlist:ID_To'), initialValue: '' },
        { field: 'name', name: 'name', type: 'like', label: t('productlist:Name'), initialValue: '' },
        { field: 'sku', name: 'sku', type: 'like', label: t('productlist:SKU'), initialValue: '' },
    ];

    const existingAttributes = () => {
        const temp = [];
        if (!variant_id) {
            formik.values.configurable.product_configurable.forEach((p) => !temp.includes(p.attributesCombined.sort()
                .join(' ')) && temp.push(p.attributesCombined.sort().join(' ')));
            selected.forEach((p) => {
                const combined = [];
                p.attributes.forEach((att) => combined.push(att.attribute_value));
                if (!temp.includes(combined.sort().join(' '))) {
                    temp.push(combined.sort().join(' '));
                }
            });
        }
        return temp;
    };

    const rows = productList.map((e) => {
        const attributeCombined = e.attributes?.map((el) => el.attribute_value)?.sort().join(' ');
        return ({
            ...e,
            id: e.entity_id,
            thumbnail: <div
                className={classes.imgThumbContainer}
                style={{
                    backgroundImage: `url(${e?.images?.[e.images?.length - 1]?.url || '/assets/img/placeholder_image.jpg'})`,
                }}
                onError={(event) => event.target.style.backgroundImage = 'url("/assets/img/placeholder_image.jpg}")'}
            />,
            attributes_label: () => {
                const temp = [];
                e.attributes?.forEach((el) => {
                    temp.push(`${el.frontend_label}: ${el.attribute_value}`);
                });
                return temp.sort().join(', ');
            },
            status: e.status ? t('productlist:Enabled') : t('productlist:Disabled'),
            disableCheck: !variant_id && existingAttributes().includes(attributeCombined),
        });
    });

    return (
        <div>
            <div className={classes.btnContainer}>
                <Button
                    buttonType="outlined-rounded"
                    onClick={handleClose}
                >
                    {t('productlist:Cancel')}
                </Button>
                <div style={{ margin: '0 10px' }} />
                <Button
                    buttonType="primary-rounded"
                    onClick={importOptions}
                >
                    {t('productlist:Done')}
                </Button>
            </div>
            <div className={classes.formField} style={{ height: 700, width: '100%' }}>
                <Table
                    filters={filters}
                    rows={rows}
                    getRows={(e) => getConfigurableProductAssociated({
                        variables: {
                            ...e.variables,
                            id,
                            variant_id,
                        },
                    })}
                    loading={loading}
                    columns={columns}
                    count={productTotal}
                    showCheckbox
                    hideActions
                    hideColumns
                    handleChecked={(e) => setSelected([...e])}
                    recordName="product"
                    singleSelection={variant_id}
                />
            </div>
        </div>
    );
};

export default ModalManualContent;
