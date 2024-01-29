/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/shipmentmarketplace/pages/list/components/Header/style';
import clsx from 'clsx';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('shipmentmarketplace:Marketplace_Dashboard')}</h2>
            <Button
                className={clsx(classes.buttonAdd, 'left')}
                onClick={() => router.push('/shipment/shipmentmarketplace/import')}
            >
                {t('shipmentmarketplace:Bulk_Shipment')}
            </Button>
            <Button
                className={clsx(classes.buttonAdd, 'left')}
                onClick={() => router.push('/shipment/shipmentmarketplace/confirmed')}
            >
                {t('shipmentmarketplace:Bulk_Confirmed')}
            </Button>
        </div>
    );
};

export default HeaderContent;
