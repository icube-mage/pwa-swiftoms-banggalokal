import React from 'react';
import BoxCardSimple from '@common_boxcardsimple/index';
import useStyles from '@sellermodules/catalog/pages/product/default/components/style';
import TabMaster from '@sellermodules/catalog/pages/product/default/components/TabMaster/index';
import TabChannel from '@sellermodules/catalog/pages/product/default/components/TabChannel/index';
import TableHeaderTab from '@common_tableheadertab/index';
import { CatalogProductContext } from '@sellermodules/catalog/pages/product/default/core';
import { WHITE } from '@theme_color';

const ProductContent = (props) => {
    const {
        t,
        isEdit,
        isCreate,
        isDuplicate,
        isEmptyListChannelProduct,
        productId,
        pageTab,
        pageAction,
        onPreventHandleClick,
    } = props;
    const ctxCatalogProduct = React.useContext(CatalogProductContext);
    const classes = useStyles();
    const isTabMaster = (pageTab === undefined || pageTab === 'master');
    const isTabChannel = pageTab === 'channel';
    const baseLinkUrl = isEdit ? `/seller/catalog/product/${pageAction}/${productId}` : `/seller/catalog/product/${pageAction}`;
    const tabsMenu = React.useMemo(() => [
        {
            id: 1,
            name: t('common:master_product'),
            query: { status: 'master' },
        },
        {
            id: 2,
            name: t('common:channel_product'),
            query: !isEmptyListChannelProduct ? { status: 'channel' } : { status: 'channel', channel: 'add' },
            disabled: isCreate || isDuplicate,
        },
    ], [isCreate, isDuplicate]);

    const propsExtra = { ctxCatalogProduct, baseLinkUrl };

    return (
        <div id="product-action-container" className={classes.productActionContainer}>
            <BoxCardSimple
                bg={WHITE}
                border={1}
                borderRadius={5}
                marginTop={30}
                marginLeft={20}
                marginRight={20}
                content={(
                    <TableHeaderTab
                        baseLinkUrl={baseLinkUrl}
                        dataTabs={tabsMenu}
                        baseLinkUrlOnClick={onPreventHandleClick}
                        isEdit={isEdit}
                        productId={productId}
                    />
                )}
            />

            { isTabMaster && <TabMaster {...props} {...propsExtra} /> }
            { isTabChannel && <TabChannel {...props} {...propsExtra} /> }
        </div>
    );
};

export default ProductContent;
