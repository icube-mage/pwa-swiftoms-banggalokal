import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useStyles from '@modules/productlist/plugins/modaloptions/style';

import Table from '@common_table';
import Button from '@common_button';

const ModalOptionsContent = (props) => {
    const {
        t, data, loading, getAllProductHasOptions, formik, handleClose, refetch = () => {},
    } = props;
    const classes = useStyles();
    const { events } = useRouter();

    const productList = (data && data.getAllProductHasOptions && data.getAllProductHasOptions.items) || [];
    const productTotal = (data && data.getAllProductHasOptions && data.getAllProductHasOptions.total_count) || 0;

    const switchType = (type) => {
        switch (type) {
        case 'simple':
            return t('productlist:Simple_Product');
        case 'configurable':
            return t('productlist:Configurable_Product');
        case 'bundle':
            return t('productlist:Bundle_Product');
        default:
            return t('productlist:Simple_Product');
        }
    };

    const [selected, setSelected] = React.useState([]);

    const router = useRouter();
    const getId = router && router.query && Number(router.query.id);

    const importOptions = () => {
        const dataOptMap = selected.map((option) => option.options?.map((opt) => ({
            option_id: opt.option_id,
            required: opt.required,
            sort_order: opt.sort_order,
            title: opt.title,
            values: opt.value,
        })));
        const spreadRes = [].concat(...dataOptMap);
        formik.setFieldValue('options', [...formik.values.options, ...spreadRes]);
        handleClose();
    };

    const columns = [
        {
            field: 'entity_id', headerName: 'ID', hideable: true, sortable: true, initialSort: 'ASC',
        },
        {
            field: 'name', headerName: t('productlist:Name'), hideable: true, sortable: true,
        },
        {
            field: 'type_id', headerName: t('productlist:Type'), hideable: true, sortable: true,
        },
        {
            field: 'sku', headerName: t('productlist:SKU'), hideable: true, sortable: true,
        },
        {
            field: 'price', headerName: t('productlist:Price'), hideable: true,
        },
        {
            field: 'vendor_sku', headerName: t('productlist:Vendor_SKU'), hideable: true,
        },
        { field: 'action', headerName: t('productlist:Action') },
    ];

    const filters = [
        {
            field: 'entity_id', name: 'entity_id_from', type: 'from', label: t('productlist:ID_From'), initialValue: '',
        },
        {
            field: 'entity_id', name: 'entity_id_to', type: 'to', label: t('productlist:ID_To'), initialValue: '',
        },
        {
            field: 'name', name: 'name', type: 'like', label: t('productlist:Product_Name'), initialValue: '',
        },
        {
            field: 'sku', name: 'sku', type: 'like', label: t('productlist:SKU'), initialValue: '',
        },
        {
            field: 'price', name: 'price_from', type: 'from', label: t('productlist:Price_From'), initialValue: '',
        },
        {
            field: 'price', name: 'price_to', type: 'to', label: t('productlist:Price_To'), initialValue: '',
        },
    ];

    const rows = productList.map((e) => ({
        ...e,
        id: e.entity_id,
        type_id: switchType(e.type_id),
        action: () => (
            <Link href={`/product/productlist/edit${e.type_id === 'simple' ? '' : e.type_id}/${e.entity_id}`}>
                <a className="link-button">{t('productlist:Edit')}</a>
            </Link>
        ),
    }));

    const onChangeRoute = () => {
        refetch();
        handleClose();
    };

    useEffect(() => {
        events.on('routeChangeStart', onChangeRoute);
        return () => {
            events.off('routeChangeStart', onChangeRoute);
        };
    }, [onChangeRoute, events]);

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
                    {t('productlist:Import_Option')}
                </Button>
            </div>
            <div className={classes.formField} style={{ height: 700, width: '100%' }}>
                <Table
                    filters={filters}
                    rows={rows}
                    getRows={(e) => getAllProductHasOptions({
                        variables: {
                            ...e.variables,
                            excluded_ids: getId ? [getId] : [],
                        },
                    })}
                    loading={loading}
                    columns={columns}
                    count={productTotal}
                    showCheckbox
                    hideActions
                    hideColumns
                    handleChecked={(e) => setSelected(e)}
                    recordName="product"
                />
            </div>
        </div>
    );
};

export default ModalOptionsContent;
