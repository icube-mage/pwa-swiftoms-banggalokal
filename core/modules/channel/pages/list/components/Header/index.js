/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/channel/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('channel:Manage_Sales_Channel')}</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/oms/channel/create')}
            >
                {t('channel:Create_Sales_Channel')}
            </Button>
        </div>
    );
};

export default HeaderContent;
