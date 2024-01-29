/* eslint-disable object-curly-newline */
import React from 'react';
import useStyles from '@modules/productlist/plugins/productconfigurable/style';
import ModalVariant from '@modules/productlist/plugins/modalvariant';
import Button from '@common_button';
import Table from '@common_table';

const StepContent = (props) => {
    const {
        formikStep,
        t,
        getConfigurableAttributes,
        loading,
        data,
        refetchConfigAttributes,
        dataAttributes,
        dataAtt,
    } = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const dataTotal = (data && data.getConfigurableAttributes && data.getConfigurableAttributes.total_count) || 0;

    const columns = [
        { field: 'attribute_code', headerName: t('productlist:Attribute_Code'), hideable: true, sortable: true },
        { field: 'frontend_label', headerName: t('productlist:Attribute_Label'), hideable: true, sortable: true },
    ];

    const filters = [
        { field: 'attribute_code', name: 'attribute_code', type: 'like', label: t('productlist:Attribute_Code'), initialValue: '' },
        { field: 'frontend_label', name: 'frontend_label', type: 'like', label: t('productlist:Attribute_Label'), initialValue: '' },
    ];

    const rows = dataAttributes.map((e) => ({
        id: e.attribute_code,
        ...e,
    }));

    const defaultChecked = dataAtt?.length ? dataAtt?.map((e) => ({
        id: e.attribute_code,
        ...e,
    })).filter((list) => formikStep.values.attributes?.includes(list.id)) : [];

    const handleSelect = (e) => {
        formikStep.setFieldValue('attributes', e?.map((att) => att.attribute_code));
        formikStep.setFieldValue('attributes_label', e?.map((att) => att.frontend_label));
        formikStep.setFieldValue('attributes_ids', e?.map((att) => att.attribute_id));

        const tempOpt = e?.map((ev) => [ev?.attribute_code, formikStep.values.attributes_options[ev?.attribute_code] || []]);
        formikStep.setFieldValue('attributes_options', Object.fromEntries(tempOpt));
    };

    return (
        <>
            <div style={{ marginBottom: 20 }}>
                <h2 className={classes.title}>{t('productlist:Step_1_Select_Attributes')}</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        {t('productlist:Selected_Attributes')}
                        {' '}
                        {formikStep.values.attributes_label.map((sel) => sel)?.join(', ') || '-'}
                    </span>
                    <Button onClick={() => setOpen(true)} buttonType="primary-rounded">{t('productlist:Create_New_Attribute')}</Button>
                </div>
            </div>
            <Table
                filters={filters}
                rows={rows}
                getRows={getConfigurableAttributes}
                loading={loading}
                columns={columns}
                count={dataTotal}
                showCheckbox
                hideActions
                hideColumns
                handleChecked={(e) => handleSelect(e)}
                defaultChecked={defaultChecked}
                recordName="product"
            />
            <ModalVariant open={open} setOpen={setOpen} refetch={refetchConfigAttributes} />
        </>
    );
};

export default StepContent;
