/* eslint-disable no-nested-ternary */
import Link from 'next/link';
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';

import Autocomplete from '@common_autocomplete';

import useStyles from '@sellermodules/return/pages/detail/components/style';

const Information = (props) => {
    const {
        t, data, dataReturnType, formik, stepActive,
    } = props;
    const classes = useStyles();
    const { shipping_address } = data;

    const dataRefundType = [
        { value: 'offline', label: t('sellerreturn:Offline') },
        { value: 'storecredit', label: t('sellerreturn:Refund_to_Customer_Store_Credit') },
        { value: 'giftcard', label: t('sellerreturn:Create_Customer_Giftcard') },
    ];
    const dataReplacementType = [
        { value: 'pickup', label: t('sellerreturn:Pickup_in_Store') },
        { value: 'delivery', label: t('sellerreturn:Home_Delivery') },
    ];

    return (
        <div className={clsx(classes.itemsGrid)}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3} container direction="column" spacing={2}>
                    <Grid item>
                        <div className={classes.subtitle}>{t('sellerreturn:Order_Number')}</div>
                        <Link href={`/seller/order/detail/${data.order_id}`} passHref>
                            <a className={classes.link} target="_blank">{data.channel_order_increment_id}</a>
                        </Link>
                    </Grid>
                    {!!data.creditmemo
                        && (
                            <Grid item>
                                <div className={classes.subtitle}>{t('sellerreturn:Credit_Memo')}</div>
                                <Link href={`/seller/return/detail/${data.id}/creditmemo/${data.creditmemo_id}`} passHref>
                                    <a className={classes.link} target="_blank">{data.creditmemo}</a>
                                </Link>
                            </Grid>
                        )}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <div className={classes.subtitle}>{t('sellerreturn:Request_Date')}</div>
                    <div className={classes.subText}>
                        {data.created_at}
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3} container direction="column" spacing={2}>
                    <Grid item>
                        <div className={clsx(classes.subtitle, 'required')}>
                            {t('sellerreturn:Return_Type')}
                        </div>
                        <Autocomplete
                            id="return_type"
                            name="return_type"
                            className={classes.autocompleteRoot}
                            value={dataReturnType?.find((ty) => ty.code === formik.values.return_type)}
                            onChange={(e) => {
                                formik.setFieldValue('return_type', e?.code || '');
                                if (e?.code === 'refund') {
                                    formik.setFieldValue('is_refund', true);
                                    formik.setFieldValue('is_replacement', false);
                                }
                                if (e?.code === 'replacement') {
                                    formik.setFieldValue('is_replacement', true);
                                    formik.setFieldValue('is_refund', false);
                                }
                            }}
                            primaryKey="code"
                            labelKey="title"
                            options={[{ title: t('sellerreturn:Please_Select'), code: '' }, ...dataReturnType] || []}
                            fullWidth
                            disableClearable
                            disabled={stepActive >= 3}
                            error={!!(formik.touched.return_type && formik.errors.return_type)}
                            helperText={(formik.touched.return_type && formik.errors.return_type) || ''}
                            placeholder={t('sellerreturn:Please_Select')}
                        />
                    </Grid>
                    {formik.values?.return_type === 'replacement' && (
                        <Grid item>
                            <div className={clsx(classes.subtitle, 'required')}>
                                {t('sellerreturn:Replacement_Order_Type')}
                            </div>
                            <Autocomplete
                                id="replacement_order_type"
                                name="replacement_order_type"
                                className={classes.autocompleteRoot}
                                value={dataReplacementType?.find((ty) => ty.value === formik.values.replacement_order_type)}
                                onChange={(e) => formik.setFieldValue('replacement_order_type', e?.value || '')}
                                primaryKey="value"
                                labelKey="label"
                                options={[{ label: t('sellerreturn:Please_Select'), value: '' }, ...dataReplacementType] || []}
                                fullWidth
                                disableClearable
                                disabled={stepActive >= 3}
                                error={!!(formik.touched.replacement_order_type && formik.errors.replacement_order_type)}
                                helperText={(formik.touched.replacement_order_type && formik.errors.replacement_order_type) || ''}
                                placeholder={t('sellerreturn:Please_Select')}
                            />
                        </Grid>
                    )}
                    {formik.values?.return_type === 'refund' && (
                        <Grid item>
                            <div className={clsx(classes.subtitle, 'required')}>
                                {t('sellerreturn:Refund_Type')}
                            </div>
                            <Autocomplete
                                id="refund_type"
                                name="refund_type"
                                className={classes.autocompleteRoot}
                                value={dataRefundType?.find((ty) => ty.value === formik.values.refund_type)}
                                onChange={(e) => formik.setFieldValue('refund_type', e?.value || '')}
                                primaryKey="value"
                                labelKey="label"
                                options={[{ label: t('sellerreturn:Please_Select'), value: '' }, ...dataRefundType] || []}
                                fullWidth
                                disableClearable
                                disabled={stepActive >= 3}
                                error={!!(formik.touched.refund_type && formik.errors.refund_type)}
                                helperText={(formik.touched.refund_type && formik.errors.refund_type) || ''}
                                placeholder={t('sellerreturn:Please_Select')}
                            />
                        </Grid>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <div className={classes.subtitle}>{t('sellerreturn:Shipping_Address')}</div>
                    <div className={classes.subText}>
                        {shipping_address.firstname}
                        {' '}
                        {shipping_address.lastname}
                        <br />
                        {shipping_address.street}
                        <br />
                        {shipping_address.city}
                        <br />
                        {`${shipping_address.region} ${shipping_address.postcode}, ${shipping_address.country_name}`}
                        <br />
                        {shipping_address.telephone}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default Information;
