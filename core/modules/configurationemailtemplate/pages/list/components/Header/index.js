/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/configurationemailtemplate/pages/list/components/Header/style';

const HeaderContent = ({ t }) => {
    const classes = useStyles();
    const router = useRouter();

    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('emailtemplatesconfiguration:Email_Templates')}</h2>
            <Button className={classes.buttonAdd} onClick={() => router.push('/configurations/emailtemplates/create')}>
                {t('emailtemplatesconfiguration:Add_New_Template')}
            </Button>
        </div>
    );
};

export default HeaderContent;
