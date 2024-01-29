/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/stocktransfer/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('stocktransfer:Manage_Stock_Transfer')}</h2>
            <Button className={classes.buttonAdd} onClick={() => router.push('/cataloginventory/stocktransfer/add')}>
                {t('stocktransfer:Add_Stock_Transfer')}
            </Button>
            <Button className={classes.buttonAdd} onClick={() => router.push('/cataloginventory/stocktransfer/import')}>
                {t('stocktransfer:Upload_Stock_Transfer')}
            </Button>
        </div>
    );
};

export default HeaderContent;
