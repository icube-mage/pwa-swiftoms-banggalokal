/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/homedelivery/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('homedelivery:Home_Delivery_Dashboard')}</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/shipment/homedelivery/import')}
            >
                {t('homedelivery:Bulk_Shipment')}
            </Button>
        </div>
    );
};

export default HeaderContent;
