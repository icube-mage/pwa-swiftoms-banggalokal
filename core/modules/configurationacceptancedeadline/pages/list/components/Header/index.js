/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/configurationacceptancedeadline/pages/list/components/Header/style';

const HeaderContent = ({ t }) => {
    const classes = useStyles();
    const router = useRouter();

    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('acceptancedeadlineconfiguration:Acceptance_Deadline')}</h2>
            <Button className={classes.buttonAdd} onClick={() => router.push('/configurations/acceptancedeadline/create')}>
                {t('acceptancedeadlineconfiguration:Add_Acceptance_Deadline')}
            </Button>
            <Button
                style={{ marginRight: 10 }}
                className={classes.buttonAdd}
                onClick={() => router.push('/configurations/acceptancedeadline/import')}
            >
                {t('acceptancedeadlineconfiguration:Import_Acceptance_Deadline')}
            </Button>
        </div>
    );
};

export default HeaderContent;
