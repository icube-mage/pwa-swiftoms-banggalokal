/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react';
import ImageUpload from '@sellermodules/catalog/plugins/VariantsChannel/ImageUpload';
import Table from '@sellermodules/catalog/plugins/VariantsChannel/Table';
import useStyles from '@sellermodules/catalog/plugins/VariantsChannel/style';
import clsx from 'clsx';

const VariantsContentChannel = (props) => {
    const {
        formik,
        isEdit = false,
    } = props;
    const classes = useStyles();
    const showTable = formik.values.is_variant
        && formik.values.variants.every((variant) => typeof variant === 'object'
        && variant.attribute_choosen?.length);

    const array1 = formik.values.variants[0]?.attribute_choosen?.map((type) => type) || [];
    const array2 = formik.values.variants[1]?.attribute_choosen?.map((type) => type) || [];
    const combinedType = array2.length
        ? array1?.flatMap((d) => array2?.map((v) => [d.inputValue || d.label, v.inputValue || v.label]))
        : array1.map((d) => [d.inputValue || d.label]);

    const arrayImg = formik.values.variants[0]?.attribute_choosen?.map((type) => type.image || '');

    const dataTable = () => combinedType.map((combined) => {
        const combined_key = [...combined].sort().join('-');
        let existing = {};
        if (isEdit) {
            existing = formik.values.existing_variants?.find((values) => values?.combined_key === combined_key);
        }
        const tableValues = formik.values.variant_table?.find((values) => values?.combined_key === combined_key);
        const useValues = isEdit ? existing || tableValues : tableValues;
        let objReturn = {
            id: useValues?.id,
            price: tableValues?.price || '',
            sku: useValues?.sku || `${isEdit ? formik.values.vendor_sku : formik.values.sku}-${combined.join('-').toLowerCase()}`,
            weight: tableValues?.weight || '',
            status: typeof tableValues?.status === 'boolean' ? tableValues?.status : true,
            combined_key,
            is_exist: isEdit && existing,
        };

        const mappedType = [];
        formik.values.variants.map((vr, i) => {
            if (i === 0) {
                const imgIndex = array1.findIndex((arr) => arr.inputValue === combined[i] || arr.label === combined[i]);
                if (imgIndex >= 0) {
                    objReturn.image = arrayImg[imgIndex];
                }
            }
            return mappedType.push([vr.attribute_code, combined[i]]);
        });
        objReturn = {
            ...objReturn,
            ...Object.fromEntries(mappedType),
        };
        return objReturn;
    });

    React.useEffect(() => {
        formik.setFieldValue('variant_table', dataTable());
    }, [formik.values.variants, formik.values.variants.length]);

    return (
        <div>
            {
                formik.values.variants.map((variant, idx) => (
                    <Fragment key={idx}>
                        {idx === 0
                                && (
                                    <>
                                        {!!variant.attribute_choosen?.length
                                            && (
                                                <div className={clsx(classes.formFieldsGrid, classes.formFieldsGridImageUpload)}>
                                                    <ImageUpload {...props} />
                                                </div>
                                            )}
                                    </>
                                )}
                    </Fragment>
                ))
            }
            <div name="variant_table">
                {showTable
                    && (
                        <>
                            <div className={classes.formFieldsGrid}>
                                <div />
                                <div className={classes.divider} />
                            </div>
                            <Table {...props} />
                        </>
                    )}
            </div>
        </div>
    );
};

export default VariantsContentChannel;
