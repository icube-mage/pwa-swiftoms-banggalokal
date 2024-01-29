/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/configurationlogistixprovider/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('logistixproviderconfiguration:Logistix_Provider_Configuration')}</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/configurations/logistixprovider/addnew')}
            >
                {t('logistixproviderconfiguration:Add_Logistix_Provider')}
            </Button>
        </div>
    );
};

export default HeaderContent;
