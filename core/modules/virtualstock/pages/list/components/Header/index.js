/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/virtualstock/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('virtualstock:Manage_Virtual_Stock')}</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/cataloginventory/virtualstock/create')}
            >
                {t('virtualstock:Add_Virtual_Stock')}
            </Button>
        </div>
    );
};

export default HeaderContent;
