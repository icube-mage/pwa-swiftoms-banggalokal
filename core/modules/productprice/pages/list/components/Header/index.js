/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/productprice/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { handleUpdateMarketplace, t, aclSyncToMp } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('productprice:Marketplace_Product_Price')}</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/marketplace/productprice/import')}
            >
                {t('productprice:Import')}
            </Button>
            {aclSyncToMp
                && (
                    <Button
                        className={classes.buttonAdd}
                        onClick={handleUpdateMarketplace}
                        style={{ marginRight: 10 }}
                    >
                        {t('productprice:Sync_All_to_Marketplace')}
                    </Button>
                )}
        </div>
    );
};

export default HeaderContent;
