import React from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Button from '@common_button/index';
import configGqlService from '@modules/theme/services/graphql';

const FormMasterProductStock = ({
    t,
    classes,
    dataProduct,
    productId,
}) => {
    const filter_parent_sku = dataProduct?.getSellerChannelProduct?.sku;

    const { data: dataDocs } = configGqlService.getStoreConfig({
        path: 'swiftoms_vendorportal/seller_docs/stock_product_catalog',
    });

    return (
        <div className={classNames('master-product-form-stock', classes.formStockContainer)}>
            <Grid className="stock-content-container" container>
                <Grid className="content-left" item sm={8} xs={12}>
                    <div className="content-left-container">
                        <span className="content-left-info">{`${t('common:set_the_product')} `}</span>
                        &nbsp;
                        <a
                            className="content-left-info_help"
                            href={dataDocs?.getStoreConfig}
                            rel="noreferrer"
                            target="_blank"
                        >
                            <strong>{t('common:learn_how_to_mange_stock')}</strong>
                        </a>
                    </div>
                </Grid>
                <Grid className="content-right" item sm={4} xs={12}>
                    <Button
                        nextLink="/seller/stock"
                        nextLinkQuery={{ filter_parent_sku, product_id: productId }}
                        classic
                        classicButtonLabel={t('common:Manage_Stock')}
                    />
                </Grid>
            </Grid>
        </div>
    );
};
export default FormMasterProductStock;
