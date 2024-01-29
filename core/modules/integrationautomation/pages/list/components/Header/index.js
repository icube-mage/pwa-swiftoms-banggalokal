/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/integrationautomation/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('integrationautomation:Automation')}</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/integration/automation/add')}
            >
                {t('integrationautomation:Add')}
            </Button>
        </div>
    );
};

export default HeaderContent;
