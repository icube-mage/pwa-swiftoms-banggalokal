import clsx from 'clsx';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import Button from '@common_button';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import InputLabel from '@material-ui/core/InputLabel';

import FormInput from '@sellermodules/promotion/plugins/Input';
import useStyles from '@sellermodules/promotion/pages/coupon/create/components/style';
import { actionRule } from '@sellermodules/promotion/helpers';

const PromotionContent = (props) => {
    const {
        t, formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const handleAction = (event) => {
        if (event?.id === 'cart_fixed') {
            formik.setFieldValue('actionFixed', true);
            formik.setFieldValue('actionBuy', false);
        } else if (event?.id === 'buy_x_get_y') {
            formik.setFieldValue('actionFixed', false);
            formik.setFieldValue('actionBuy', true);
        } else {
            formik.setFieldValue('actionFixed', false);
            formik.setFieldValue('actionBuy', false);
        }
        formik.setFieldValue('simple_action', event);
    };

    return (
        <div className={classes.container}>
            <div className={classes.headerContainer}>
                <div className="left">
                    <IconButton aria-label="back" onClick={() => router.push('/seller/promotion/coupon')}>
                        <ArrowBackOutlinedIcon />
                    </IconButton>
                    <h2 className={classes.title}>{t('sellerpromotion:Promotion_Page')}</h2>
                </div>
                <Button
                    className={classes.btn}
                    startIcon={<img alt="" src="/assets/img/save-white.svg" className="icon" />}
                    onClick={formik.handleSubmit}
                >
                    {t('common:Save')}
                </Button>
            </div>
            <Paper className={classes.paper}>
                <h2 className={clsx(classes.title, 'paper')}>{t('sellerpromotion:Promotion_Detail')}</h2>
                <FormInput
                    name="name"
                    label={t('sellerpromotion:Rule_Name')}
                    placeholder={t('sellerpromotion:Name_of_the_Rule_Exp_Free_Shipping_October')}
                    required
                    {...props}
                />
                <FormInput
                    name="is_active"
                    label={t('sellerpromotion:Status')}
                    {...props}
                    inputType="switch"
                />
                <FormInput
                    name="description"
                    label={t('sellerpromotion:Description')}
                    {...props}
                />
                <FormInput
                    name="from_date"
                    label={t('sellerpromotion:From_Date')}
                    required
                    type="date"
                    inputType="date"
                    {...props}
                />
                <FormInput
                    name="to_date"
                    label={t('sellerpromotion:To_Date')}
                    required
                    type="date"
                    inputType="date"
                    {...props}
                />
                <div className={clsx(classes.formFieldsGrid, 'center')}>
                    <InputLabel htmlFor="simple_action" className={classNames(classes.label, classes.required)}>
                        {t('sellerpromotion:Rule_Action')}
                    </InputLabel>
                    <Autocomplete
                        id="simple_action"
                        name="simple_action"
                        value={formik.values.simple_action}
                        onChange={handleAction}
                        options={actionRule}
                        primaryKey="id"
                        labelKey="name"
                        helperText={(formik.touched.simple_action && formik.errors.simple_action) || ''}
                        renderInput={(params) => (
                            <TextField
                                value={formik.values.simple_action}
                                className={classes.textInput}
                                {...params}
                                placeholder={t('sellerpromotion:Select_Rule_Action_for_Promotion')}
                                error={!!(formik.touched.simple_action && formik.errors.simple_action)}
                                helperText={(formik.touched.simple_action && formik.errors.simple_action) || ''}
                            />
                        )}
                    />
                </div>
                {formik.values.actionFixed
                    ? (
                        <FormInput
                            name="discount_amount"
                            label={t('sellerpromotion:Discount_Amount')}
                            placeholder={t('sellerpromotion:Input_price')}
                            required
                            type="float"
                            {...props}
                        />
                    ) : null}
                {formik.values.actionBuy
                    ? (
                        <>
                            <FormInput
                                name="discount_step"
                                label={t('sellerpromotion:Buy_X')}
                                placeholder={t('sellerpromotion:Value_must_be_greater_than_0')}
                                required
                                type="integer"
                                {...props}
                            />
                            <FormInput
                                name="discount_amount"
                                label={t('sellerpromotion:Get_Y')}
                                placeholder={t('sellerpromotion:Input_value_Get_Y')}
                                required
                                type="integer"
                                {...props}
                            />
                            <FormInput
                                name="max_y"
                                label={t('sellerpromotion:Maximum_Free_Y_Item')}
                                placeholder={t('sellerpromotion:Input_Maximum_value_Free_Y_Item')}
                                required
                                type="integer"
                                {...props}
                            />
                        </>
                    ) : null}
                <FormInput
                    name="coupon_code"
                    label={t('sellerpromotion:Coupon_Code')}
                    required
                    {...props}
                />
                <FormInput
                    name="uses_per_coupon"
                    label={t('sellerpromotion:Uses_Per_Coupon')}
                    placeholder={t('sellerpromotion:Number_of_Coupon')}
                    type="integer"
                    {...props}
                />
                <FormInput
                    name="uses_per_customer"
                    label={t('sellerpromotion:Uses_Per_Customer')}
                    placeholder={t('sellerpromotion:Customer_Usage_per_Customer')}
                    type="integer"
                    {...props}
                />
            </Paper>
        </div>
    );
};
export default PromotionContent;
