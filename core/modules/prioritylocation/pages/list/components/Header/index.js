/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/prioritylocation/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('prioritylocation:Priority_Location_by_City')}</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/oms/prioritylocationbycity/import')}
            >
                {t('prioritylocation:Upload_Priority_Location')}
            </Button>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/oms/prioritylocationbycity/create')}
            >
                {t('prioritylocation:Create_Priority_Location')}
            </Button>
        </div>
    );
};

export default HeaderContent;
