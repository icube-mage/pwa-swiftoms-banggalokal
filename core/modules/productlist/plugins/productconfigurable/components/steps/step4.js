/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import useStyles from '@modules/productlist/plugins/productconfigurable/style';

const StepContent = (props) => {
    const {
        formikStep,
        t,
        dataState,
        generatedData,
    } = props;
    const classes = useStyles();
    const attributeSelected = dataState.filter((att) => formikStep.values.attributes.includes(att.attribute_code));
    const configColumns = [
        { field: 'id', headerName: 'ID', hide: true },
        {
            field: 'images',
            headerName: t('productlist:Image'),
            minWidth: 100,
            sortable: false,
            renderCell: (params) => (
                <div
                    className={classes.imgThumbContainer}
                    style={{
                        backgroundImage: `url(${params.value || '/assets/img/placeholder_image.jpg'})`,
                    }}
                />
            ),
        },
        { field: 'sku', headerName: t('productlist:SKU'), minWidth: 300 },
        ...attributeSelected.map((att) => (
            { field: att.attribute_code, headerName: att.frontend_label, minWidth: 150 }
        )),
        { field: 'price', headerName: t('productlist:Price'), minWidth: 200 },
    ];

    const row = generatedData.map((d) => ({
        ...d,
        id: d.entity_id || d.id,
        images: d.images?.length ? (d.images[d.images?.length - 1].url || d.images[d.images?.length - 1].binary) : null,
    }));

    return (
        <>
            <div style={{ marginBottom: 20 }}>
                <h2 className={classes.title}>{t('productlist:Step_4_Summary')}</h2>
                <span>
                    {t("productlist:Here_are_the_products_you're_about_to_create")}
                </span>
            </div>
            <div style={{ height: 550, width: '100%' }}>
                <DataGrid
                    rows={row}
                    columns={configColumns}
                    pageSize={20}
                    disableColumnMenu
                    disableSelectionOnClick
                />
            </div>
        </>
    );
};

export default StepContent;
