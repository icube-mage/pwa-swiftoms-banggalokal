import React from 'react';
import { useRouter } from 'next/router';

import Button from '@common_button';

import useStyles from '@modules/managebank/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('managebank:Manage_Bank')}</h2>
            <div className={classes.buttonContainer}>
                <Button
                    className={classes.buttonAdd}
                    onClick={() => router.push('/vendorportal/managebank/importwithdrawalfee')}
                    style={{ marginRight: 10 }}
                >
                    {t('managebank:Import_Withdrawal_Fee')}
                </Button>
            </div>
        </div>
    );
};

export default HeaderContent;
