/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

import Tabs from '@common_tabsseller';
import Button from '@common_button';

import AddContent from '@sellermodules/catalog/pages/organize/content/add';
import useStyles from '@sellermodules/catalog/pages/organize/add/components/style';

const CatalogOrganizeContent = (props) => {
    const {
        t, downloadTemplate, dataShipping,
    } = props;
    const router = useRouter();
    const classes = useStyles();

    const dataTab = [
        { label: t('sellercatalog:Add_at_Once'), value: 0 },
        { label: t('sellercatalog:Change_at_Once'), value: 1 },
    ];

    const onChangeTab = (e, v) => {
        router.replace(`/seller/catalog/organize/${v ? 'change' : 'add'}`, undefined, { shallow: true });
    };

    return (
        <div style={{ paddingBottom: 10 }}>
            <div className={classes.headerContainer}>
                <IconButton aria-label="back" onClick={() => router.push('/seller/catalog')}>
                    <ArrowBackOutlinedIcon />
                </IconButton>
                <h2 className="title">{t('sellercatalog:Catalog_Page')}</h2>
            </div>
            <Paper className={classes.container}>
                <div className={classes.title}>
                    {t('sellercatalog:Organize_Products_at_Once')}
                </div>
                <Tabs data={dataTab} onChange={onChangeTab} value={0} allItems={false} />
                <div className={classes.text}>
                    {t('sellercatalog:An_easy_way_to_add_multiple_products_at_once_See')}
                    {' '}
                    <span className={clsx(classes.text, 'primary')}>
                        <Link href="/seller/catalog/organize/add_guide" passHref>
                            <a target="_blank">{t('sellercatalog:User’s_Guide')}</a>
                        </Link>
                    </span>
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.box}>
                            <div className={classes.title}>
                                {t('sellercatalog:Download__fill_in_CSV_files')}
                            </div>
                            <div className={classes.text}>
                                {t('sellercatalog:Add_products_without_variants_in_various_categories_Templates_can_only_be_filled_with_MS_Excel_2007_and_above_or_Libre_Office')}
                            </div>
                            <div style={{ height: 10 }} />
                            <Button className={classes.btn} buttonType="outlined" onClick={() => downloadTemplate('create_product')}>
                                {t('sellercatalog:Download_Template')}
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.box}>
                            <div className={classes.title}>
                                {t('sellercatalog:Upload_file_CSV')}
                            </div>
                            <AddContent {...props} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.box}>
                            {dataShipping
                                ? (
                                    <>
                                        <div className={classes.title}>
                                            {t('sellercatalog:Download_list_of_category')}
                                            {', '}
                                            {t('sellercatalog:list_of_display_window')}
                                            {', '}
                                            {t('sellercatalog:_list_of_shipping_method')}
                                        </div>
                                        <div className={classes.text}>
                                            {t('sellercatalog:Download_list_of_category')}
                                            {', '}
                                            {t('sellercatalog:list_of_display_window')}
                                            {', '}
                                            {t('sellercatalog:_list_of_shipping_method')}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className={classes.title}>
                                            {t('sellercatalog:Download_list_of_category')}
                                            {' & '}
                                            {t('sellercatalog:list_of_display_window')}
                                        </div>
                                        <div className={classes.text}>
                                            {t('sellercatalog:Download_list_of_category')}
                                            {' & '}
                                            {t('sellercatalog:list_of_display_window')}
                                        </div>
                                    </>
                                )}
                            <Grid container spacing={3}>
                                <Grid item xs={12} md="auto">
                                    <Button className={classes.btn} buttonType="outlined" onClick={() => downloadTemplate('product_category')}>
                                        {t('sellercatalog:Category')}
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md="auto">
                                    <Button className={classes.btn} buttonType="outlined" onClick={() => downloadTemplate('etalase')}>
                                        {t('sellercatalog:Display_Window')}
                                    </Button>
                                </Grid>
                                {dataShipping
                                    ? (
                                        <Grid item xs={12} md="auto">
                                            <Button className={classes.btn} buttonType="outlined" onClick={() => downloadTemplate('shipping_method')}>
                                                {t('sellercatalog:Shipping_Method')}
                                            </Button>
                                        </Grid>
                                    ) : null}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default CatalogOrganizeContent;
