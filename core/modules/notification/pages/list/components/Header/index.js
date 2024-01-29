/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/notification/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const classes = useStyles();
    const router = useRouter();
    const { handleAllRead, t } = props;

    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('notification:Manage_Notification')}</h2>
            <Button className={classes.buttonAdd} onClick={handleAllRead}>
                {t('notification:Mark_All_As_Read')}
            </Button>
        </div>
    );
};

export default HeaderContent;
