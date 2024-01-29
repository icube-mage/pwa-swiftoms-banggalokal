/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@common_button';
import ChangeContent from '@sellermodules/catalog/pages/organize/content/change';
import useStyles from '@sellermodules/catalog/pages/organize/change/components/style';
import GetAppIcon from '@material-ui/icons/GetApp';
import Alert from '@common_alert';

const CatalogOrganizeContent = (props) => {
    const {
        t, downloadTemplate,
    } = props;
    const classes = useStyles();

    return (
        <div id="catalog-bulk-edit" className={classes.catalogBulkContainer}>
            <Alert
                info={t('sellercatalog:upload_product_info')}
                severity="warning"
            />
            <Grid className={classes.catalogBulkContent} container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.box}>
                        <div className={classes.title}>
                            {t('sellercatalog:Download__fill_in_CSV_files')}
                        </div>
                        <div className={classes.text}>
                            {t('sellercatalog:Templates_can_only_be_filled_with_MS_Excel_2007_and_above_or_Libre_Office_Do_not_add_any_columns_or_rows_in_the_CSV_file')}
                        </div>
                        <Button className={classes.btn} buttonType="outlined" onClick={() => downloadTemplate('edit_product')}>
                            <GetAppIcon style={{ height: 18, marginRight: 10 }} />
                            {t('sellercatalog:Download_Template')}
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.box}>
                        <div className={classes.title}>
                            {t('sellercatalog:Upload_file_CSV')}
                        </div>
                        <ChangeContent {...props} />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default CatalogOrganizeContent;
