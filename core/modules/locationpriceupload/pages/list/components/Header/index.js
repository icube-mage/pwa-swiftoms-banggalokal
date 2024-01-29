/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/locationpriceupload/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('locationpriceupload:Manage_Price')}</h2>
            <a>
                <Button className={classes.buttonAdd} onClick={() => router.push('/cataloginventory/locationpriceupload/import')}>
                    {t('locationpriceupload:Upload_Price')}
                </Button>
            </a>
        </div>
    );
};

export default HeaderContent;
