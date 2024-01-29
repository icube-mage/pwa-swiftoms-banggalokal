import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import useStyles from '@sellermodules/creditmemo/pages/detail/components/style';

const Information = (props) => {
    const {
        t, data,
    } = props;
    const classes = useStyles();
    const { billing_address, shipping_address } = data;

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
                <div className={classes.subtitle}>{t('sellerreturn:Order_Number')}</div>
                <div className={classes.subText}>
                    {data.channel_order_increment_id}
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <div className={classes.subtitle}>{t('sellerreturn:Order_Date')}</div>
                <div className={classes.subText}>
                    {data.channel_order_date}
                </div>
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
            <Grid item xs={12} sm={6} md={3}>
                <div className={classes.subtitle}>{t('sellerreturn:Billing_Address')}</div>
                <div className={classes.subText}>
                    {billing_address.firstname}
                    {' '}
                    {billing_address.lastname}
                    <br />
                    {billing_address.street}
                    <br />
                    {billing_address.city}
                    <br />
                    {`${billing_address.region} ${billing_address.postcode}, ${billing_address.country_name}`}
                    <br />
                    {billing_address.telephone}
                </div>
            </Grid>
            <Hidden smDown>
                <Grid item xs={12} sm={6} />
            </Hidden>
            <Grid item xs={12} sm={6} md={3}>
                <div className={classes.subtitle}>{t('sellerreturn:Shipping_Method')}</div>
                <div className={classes.subText}>
                    {data.channel_shipping_method || '-'}
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <div className={classes.subtitle}>{t('sellerreturn:Payment_Method')}</div>
                <div className={classes.subText}>
                    {data.channel_payment_method || '-'}
                </div>
            </Grid>
        </Grid>
    );
};

export default Information;
