/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/prioritylocationbyzone/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('prioritylocationbyzone:Priority_Location_by_Zone')}</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/oms/prioritylocationbyzone/create')}
            >
                {t('prioritylocationbyzone:Add_Priority_Location')}
            </Button>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/oms/prioritylocationbyzone/import')}
            >
                {t('prioritylocationbyzone:Upload_Priority_Location')}
            </Button>
        </div>
    );
};

export default HeaderContent;
