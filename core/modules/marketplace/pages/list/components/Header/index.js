/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import { useRouter } from 'next/router';
import Button from '@common_button';
import useStyles from '@modules/marketplace/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t, handleSyncMarketplace } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('marketplace:Manage_Marketplace')}</h2>
            <Button
                className={classes.button}
                onClick={handleSyncMarketplace}
            >
                {t('marketplace:Sync_Marketplace')}
            </Button>
        </div>
    );
};

export default HeaderContent;
