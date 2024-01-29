import React from 'react';
import clsx from 'clsx';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import InputAdornment from '@material-ui/core/InputAdornment';

import Switch from '@common_switch';
import TextField from '@common_textfield';

import useStyles from '@sellermodules/warehouse/pages/form/components/CardFlatRate/style';

const floatReg = /[^.\d]/g;

const ShippingCard = (props) => {
    const {
        formik, provider, shipping_method_logo_url, error, currency, t,
    } = props;
    const classes = useStyles();

    const handleChangeParent = (e) => {
        const value = e.target.checked;
        const tempShip = [...formik.values.shipping];
        formik.setFieldValue('is_flatrate', value);
        if (value) {
            tempShip.push(provider);
            formik.setFieldValue('shipping', tempShip);
        } else {
            formik.setFieldValue('shipping', tempShip.filter((ship) => ship !== provider));
        }
    };

    return (
        <Card className={clsx(classes.root, error && 'errors')}>
            <CardContent className={classes.content}>
                <div
                    className={classes.imgBack}
                    style={{
                        backgroundImage: `url(${shipping_method_logo_url || '/assets/img/placeholder_image.jpg'})`,
                    }}
                />
                <Switch
                    id={provider}
                    name="is_flatrate"
                    trueLabel=""
                    falseLabel=""
                    value={formik.values.is_flatrate}
                    onChange={handleChangeParent}
                />
            </CardContent>
            <CardActions disableSpacing classes={{ root: classes.contentAction }}>
                <div className={classes.name}>
                    {t('sellerwarehouse:Fee')}
                </div>
                <TextField
                    id={provider}
                    name="flatrate_price"
                    value={formik.values.flatrate_price}
                    onChange={(e) => formik.setFieldValue('flatrate_price', e.target.value.replace(floatReg, ''))}
                    className={clsx(classes.textInput, 'adorn')}
                    error={!!(formik.touched.flatrate_price && formik.errors.flatrate_price)}
                    helperText={(formik.touched.flatrate_price && formik.errors.flatrate_price) || ''}
                    disabled={!formik.values.is_flatrate}
                    placeholder="0"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment className={classes.adornment} position="start">
                                {currency}
                            </InputAdornment>
                        ),
                    }}
                />
            </CardActions>
        </Card>
    );
};

export default ShippingCard;
