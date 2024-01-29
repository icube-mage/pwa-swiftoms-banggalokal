/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/managepromotion/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('managepromotion:Manage_Promotion')}</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/vendorportal/managepromotion/create')}
            >
                {t('managepromotion:Create_Promotion')}
            </Button>
        </div>
    );
};

export default HeaderContent;
