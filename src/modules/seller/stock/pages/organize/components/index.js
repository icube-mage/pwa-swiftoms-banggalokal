import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@common_button';
import Autocomplete from '@common_autocomplete';
import AddContent from '@sellermodules/stock/pages/organize/content/add';
import useStyles from '@sellermodules/stock/pages/organize/components/style';
import GetAppIcon from '@material-ui/icons/GetApp';
import warehouseGql from '@sellermodules/warehouse/services/graphql';
import clsx from 'clsx';

const StockOrganizeContent = (props) => {
    const {
        t, downloadTemplate,
    } = props;
    const classes = useStyles();

    const [getSellerStores, getSellerStoresRes] = warehouseGql.getSellerStores();
    const [inputLocation, setInputLocation] = useState(null);
    const isDisabled = !inputLocation;

    return (
        <div id="stock-bulk-add" className={classes.stockBulkContainer}>
            <Grid className={classes.stockBulkContent} container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.box}>
                        <div className={classes.title}>
                            {t('sellerstock:Download__fill_in_CSV_files')}
                        </div>
                        <div className={classes.text}>
                            {t('sellerstock:Download_template_stock_excel')}
                        </div>
                        <div className={clsx(classes.text, 'info')}>
                            {t('sellerstock:Download_template_stock_excel2')}
                        </div>
                        <Autocomplete
                            mode="lazy"
                            className={classes.autocompleteRoot}
                            value={inputLocation}
                            onChange={(e) => setInputLocation(e)}
                            loading={getSellerStoresRes.loading}
                            options={
                                getSellerStoresRes
                                && getSellerStoresRes.data
                                && getSellerStoresRes.data.getSellerStores
                                && getSellerStoresRes.data.getSellerStores.items
                            }
                            getOptions={getSellerStores}
                            primaryKey="id"
                            labelKey="name"
                        />
                        <Button
                            disabled={isDisabled}
                            className={clsx(classes.btn, { 'btn-disabled': isDisabled })}
                            buttonType="outlined"
                            onClick={() => downloadTemplate(inputLocation.id)}
                        >
                            <GetAppIcon style={{ height: 18, marginRight: 10 }} />
                            {t('sellerstock:Download_Template')}
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.box}>
                        <div className={classes.title}>
                            {t('common:Upload_file_CSV')}
                        </div>
                        <AddContent {...props} />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default StockOrganizeContent;
