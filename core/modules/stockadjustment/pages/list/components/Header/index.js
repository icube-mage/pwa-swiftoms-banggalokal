/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/stockadjustment/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('stockadjustment:Manage_Stock_Adjustment')}</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/cataloginventory/stockadjustment/add')}
            >
                {t('stockadjustment:Add_Stock_Adjustment')}
            </Button>
        </div>
    );
};

export default HeaderContent;
