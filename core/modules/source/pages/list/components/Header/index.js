/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/source/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t, isAllowCreateSource, isAllowUpdateSource } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('source:Manage_Stock')}</h2>
            {isAllowCreateSource && (
                <Button className={classes.buttonAdd} onClick={() => router.push('/cataloginventory/managestock/createstock')}>
                    {t('source:Create_Stock')}
                </Button>
            )}
            {isAllowUpdateSource && (
                <Button className={classes.buttonAdd} onClick={() => router.push('/cataloginventory/managestock/updatestock')}>
                    {t('source:Update_Stock')}
                </Button>
            )}

            <Button className={classes.buttonAdd} onClick={() => router.push('/cataloginventory/managestock/export')}>
                {t('source:Export')}
            </Button>
        </div>
    );
};

export default HeaderContent;
