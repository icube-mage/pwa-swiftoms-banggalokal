import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Card from '@sellermodules/promotion/pages/default/components/Card';
import useStyles from '@sellermodules/promotion/pages/default/components/style';

const PromotionFeaturesContent = (props) => {
    const {
        t, promotionList,
    } = props;

    const classes = useStyles();

    return (
        <Paper className={classes.container}>
            <h2 className={classes.title} name="shipping">{t('storesetting:Promotion_Features')}</h2>
            <Grid container spacing={3}>
                {promotionList?.map((promotion) => (
                    <Grid key={promotion.value} item xs={12} md={6} lg={4}>
                        <Card {...promotion} {...props} />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default PromotionFeaturesContent;
